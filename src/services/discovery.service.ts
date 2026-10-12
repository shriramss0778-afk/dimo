import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export interface DeviceDiscoveryPayload {
  gatewayMac: string;
  protocol: 'MQTT' | 'Modbus-TCP' | 'OPC-UA' | 'SECS-GEM';
  devices: Array<{
    serialNumber: string;
    model: string;
    chamberVolumeL?: number;
    maxPowerKw?: number;
    sensors?: Array<{
      code: string;
      name: string;
      type: 'TEMPERATURE' | 'PRESSURE' | 'MICROWAVE_POWER' | 'GAS_FLOW_CH4' | 'GAS_FLOW_H2';
      unit: string;
    }>;
  }>;
}

export class DiscoveryService {
  /**
   * Automatically discovers and registers hardware devices ONLY when reported
   * by an authenticated and verified physical edge gateway.
   */
  static async discoverAndRegister(payload: DeviceDiscoveryPayload) {
    if (!env.isConfigured()) {
      return { success: false, error: 'Database not configured' };
    }

    // 1. Verify Gateway by MAC address
    const gateway = await prisma.gateway.findUnique({
      where: { macAddress: payload.gatewayMac },
      include: { site: true },
    });

    if (!gateway) {
      return {
        success: false,
        error: `Edge gateway with MAC '${payload.gatewayMac}' is not recognized or not provisioned in platform topology.`,
      };
    }

    const registeredReactors = [];
    const registeredSensors = [];

    for (const dev of payload.devices) {
      // Find or create reactor under the gateway's site
      let reactor = await prisma.reactor.findUnique({
        where: { serialNumber: dev.serialNumber },
      });

      if (!reactor) {
        reactor = await prisma.reactor.create({
          data: {
            siteId: gateway.siteId,
            serialNumber: dev.serialNumber,
            name: `Unit-${dev.serialNumber.slice(-4)}`,
            model: dev.model || 'MPCVD-915-PRO',
            chamberVolumeL: dev.chamberVolumeL ?? 45.0,
            maxPowerKw: dev.maxPowerKw ?? 6.0,
            status: 'IDLE',
            condition: 'OPTIMAL',
            healthScore: 100.0,
            isSimulated: false, // Discovered from genuine gateway
          },
        });
        registeredReactors.push(reactor.serialNumber);
      }

      // Register newly discovered sensors
      if (dev.sensors && dev.sensors.length > 0) {
        for (const sen of dev.sensors) {
          const existingSensor = await prisma.sensor.findUnique({
            where: {
              reactorId_code: {
                reactorId: reactor.id,
                code: sen.code,
              },
            },
          });

          if (!existingSensor) {
            await prisma.sensor.create({
              data: {
                reactorId: reactor.id,
                gatewayId: gateway.id,
                code: sen.code,
                name: sen.name,
                type: sen.type,
                unit: sen.unit,
                status: 'ONLINE',
                lastTimestamp: new Date(),
              },
            });
            registeredSensors.push(`${reactor.serialNumber}:${sen.code}`);
          }
        }
      }
    }

    // Update gateway heartbeat & timestamp
    await prisma.gateway.update({
      where: { id: gateway.id },
      data: {
        lastSeenAt: new Date(),
        status: 'CONNECTED',
      },
    });

    return {
      success: true,
      gatewayTag: gateway.name,
      newReactorsRegistered: registeredReactors.length,
      reactors: registeredReactors,
      newSensorsRegistered: registeredSensors.length,
      sensors: registeredSensors,
    };
  }
}
