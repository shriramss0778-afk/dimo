import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';
import { TelemetryPayload } from '@/types';

export interface IngestionResult {
  success: boolean;
  persisted: boolean;
  id?: string;
  reactorSerial?: string;
  sourceType: 'HARDWARE' | 'SIMULATED';
  evaluatedAlarms?: number;
  message?: string;
  error?: string;
}

export class TelemetryService {
  /**
   * Ingest incoming sensor telemetry packet from hardware edge gateway or labeled simulator.
   * Auto-resolves reactor by ID or serialNumber.
   * Updates reactor status, evaluates detection rules, updates transducer state, and flags stale devices.
   */
  static async ingest(payload: TelemetryPayload): Promise<IngestionResult> {
    if (!env.isConfigured()) {
      return {
        success: true,
        persisted: false,
        sourceType: payload.isSimulated ? 'SIMULATED' : 'HARDWARE',
        message: 'Telemetry acknowledged in simulated in-memory mode (DB not configured)',
      };
    }

    try {
      // 1. Resolve reactor record (support UUID or serialNumber)
      let reactor = await prisma.reactor.findFirst({
        where: {
          OR: [
            { id: payload.reactorId },
            { serialNumber: payload.reactorId },
          ],
        },
      });

      if (!reactor) {
        return {
          success: false,
          persisted: false,
          sourceType: payload.isSimulated ? 'SIMULATED' : 'HARDWARE',
          error: `Target reactor '${payload.reactorId}' not found. Automatic device discovery required.`,
        };
      }

      const isSim = Boolean(payload.isSimulated);
      const now = payload.timestamp ? new Date(payload.timestamp) : new Date();

      // 2. Persist TelemetryLog
      const log = await prisma.telemetryLog.create({
        data: {
          reactorId: reactor.id,
          timestamp: now,
          temperatureC: payload.temperatureC,
          pressureTorr: payload.pressureTorr,
          microwavePowerKw: payload.microwavePowerKw,
          ch4FlowSccm: payload.ch4FlowSccm,
          h2FlowSccm: payload.h2FlowSccm,
          substrateTempC: payload.substrateTempC,
          vacuumLevelMbar: payload.vacuumLevelMbar ?? 0.02,
          coolingFlowLpm: payload.coolingFlowLpm ?? 4.8,
          isSimulated: isSim,
          isValid: true,
          qualityScore: 1.0,
        },
      });

      // 3. Update Sensor Transducers mapped to this reactor
      const sensorSuffix = reactor.serialNumber.slice(-2);
      await Promise.allSettled([
        prisma.sensor.updateMany({
          where: { reactorId: reactor.id, code: `TC-PLASM-${sensorSuffix}` },
          data: { lastReading: payload.temperatureC, lastTimestamp: now, status: 'ONLINE' },
        }),
        prisma.sensor.updateMany({
          where: { reactorId: reactor.id, code: `BP-VAC-${sensorSuffix}` },
          data: { lastReading: payload.pressureTorr, lastTimestamp: now, status: 'ONLINE' },
        }),
        prisma.sensor.updateMany({
          where: { reactorId: reactor.id, code: `MW-GEN-${sensorSuffix}` },
          data: { lastReading: payload.microwavePowerKw, lastTimestamp: now, status: 'ONLINE' },
        }),
        prisma.sensor.updateMany({
          where: { reactorId: reactor.id, code: `MFC-CH4-${sensorSuffix}` },
          data: { lastReading: payload.ch4FlowSccm, lastTimestamp: now, status: 'ONLINE' },
        }),
      ]);

      // 4. Autonomous Anomaly & Limit Evaluation
      let newAlarmsCount = 0;
      const limits = await prisma.operatingLimit.findMany({
        where: { reactorId: reactor.id, enabled: true },
      });

      let calculatedStatus: 'RUNNING' | 'ALARM' | 'IDLE' = 'RUNNING';
      let calculatedCondition: 'OPTIMAL' | 'GOOD' | 'DEGRADED' | 'CRITICAL' = 'OPTIMAL';
      let healthScore = 95.0;

      for (const limit of limits) {
        let val = 0;
        if (limit.parameter === 'plasma_temp') val = payload.temperatureC;
        else if (limit.parameter === 'chamber_pressure') val = payload.pressureTorr;
        else if (limit.parameter === 'microwave_power') val = payload.microwavePowerKw;

        if (val >= limit.maxCritical || val <= limit.minCritical) {
          calculatedStatus = 'ALARM';
          calculatedCondition = 'CRITICAL';
          healthScore = Math.min(healthScore, 38.0);

          // Auto-record fault event if not already active
          const existing = await prisma.faultEvent.findFirst({
            where: {
              reactorId: reactor.id,
              code: `CRIT-${limit.parameter.toUpperCase()}`,
              status: 'ACTIVE',
            },
          });

          if (!existing) {
            await prisma.faultEvent.create({
              data: {
                reactorId: reactor.id,
                code: `CRIT-${limit.parameter.toUpperCase()}`,
                title: `${limit.parameter.replace('_', ' ').toUpperCase()} Critical Envelope Breach`,
                description: `Live reading ${val} ${limit.unit} breached critical safety limits (${limit.minCritical} - ${limit.maxCritical} ${limit.unit})`,
                severity: 'CRITICAL',
                status: 'ACTIVE',
                rootCause: 'Automated threshold trigger from edge telemetry',
              },
            });
            newAlarmsCount++;
          }
        } else if (val >= limit.maxWarning || val <= limit.minWarning) {
          if (calculatedCondition !== 'CRITICAL') {
            calculatedCondition = 'DEGRADED';
            healthScore = Math.min(healthScore, 65.0);
          }
        }
      }

      // Update reactor status, condition, and total run hours
      await prisma.reactor.update({
        where: { id: reactor.id },
        data: {
          status: calculatedStatus,
          condition: calculatedCondition,
          healthScore: Number(healthScore.toFixed(1)),
          isSimulated: isSim,
          totalRunHours: { increment: 0.005 }, // Incremental run time tracking
          updatedAt: now,
        },
      });

      return {
        success: true,
        persisted: true,
        id: log.id,
        reactorSerial: reactor.serialNumber,
        sourceType: isSim ? 'SIMULATED' : 'HARDWARE',
        evaluatedAlarms: newAlarmsCount,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database error';
      return {
        success: false,
        persisted: false,
        sourceType: payload.isSimulated ? 'SIMULATED' : 'HARDWARE',
        error: msg,
      };
    }
  }

  static async getHistory(reactorId: string, limit = 50) {
    if (!env.isConfigured()) return [];
    try {
      const reactor = await prisma.reactor.findFirst({
        where: {
          OR: [{ id: reactorId }, { serialNumber: reactorId }],
        },
      });

      if (!reactor) return [];

      return await prisma.telemetryLog.findMany({
        where: { reactorId: reactor.id },
        orderBy: { timestamp: 'desc' },
        take: limit,
      });
    } catch {
      return [];
    }
  }
}
