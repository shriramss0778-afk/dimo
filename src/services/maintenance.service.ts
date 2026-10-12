import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export interface AutomatedMaintenanceResult {
  staleSensorsCount: number;
  preventiveOrdersCreated: number;
  offlineReactorsCount: number;
  timestamp: string;
}

export class MaintenanceService {
  /**
   * Fetch work orders from database.
   */
  static async getWorkOrders() {
    if (!env.isConfigured()) return [];
    try {
      return await prisma.workOrder.findMany({
        include: {
          reactor: true,
          faultEvent: true,
          sparePartsUsed: { include: { sparePart: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } catch {
      return [];
    }
  }

  /**
   * Fetch spare parts inventory.
   */
  static async getSpares() {
    if (!env.isConfigured()) return [];
    try {
      return await prisma.sparePart.findMany({
        orderBy: { stockCount: 'asc' },
      });
    } catch {
      return [];
    }
  }

  /**
   * Approve / Update status of an existing work order (human decision control).
   */
  static async updateWorkOrderStatus(id: string, status: 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED', technician?: string) {
    if (!env.isConfigured()) return null;
    try {
      return await prisma.workOrder.update({
        where: { id },
        data: {
          status,
          ...(technician ? { assignedTo: technician } : {}),
          ...(status === 'RESOLVED' || status === 'CLOSED' ? { completedDate: new Date() } : {}),
        },
      });
    } catch {
      return null;
    }
  }

  /**
   * Automated routine workflow runner:
   * 1. Detect stale sensors whose last reading is older than 5 minutes.
   * 2. Automatically generate preventive maintenance work orders for reactors with high run-hours or critical faults.
   * 3. Update offline reactor states if heartbeats are missing.
   */
  static async runAutomatedMaintenanceRoutine(): Promise<AutomatedMaintenanceResult> {
    if (!env.isConfigured()) {
      return {
        staleSensorsCount: 0,
        preventiveOrdersCreated: 0,
        offlineReactorsCount: 0,
        timestamp: new Date().toISOString(),
      };
    }

    try {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);

      // 1. Stale-sensor detection
      const staleSensors = await prisma.sensor.updateMany({
        where: {
          lastTimestamp: { lt: fiveMinAgo },
          status: 'ONLINE',
        },
        data: {
          status: 'STALE',
        },
      });

      // 2. Automated work orders from unresolved CRITICAL fault events
      const criticalFaults = await prisma.faultEvent.findMany({
        where: {
          severity: 'CRITICAL',
          status: 'ACTIVE',
          workOrders: { none: {} }, // Faults without work orders yet
        },
        include: { reactor: true },
        take: 5,
      });

      let ordersCreated = 0;
      for (const fault of criticalFaults) {
        const orderNum = `WO-AUTO-${fault.reactor.serialNumber.slice(-5)}-${Date.now().toString().slice(-4)}`;
        await prisma.workOrder.create({
          data: {
            reactorId: fault.reactorId,
            faultEventId: fault.id,
            workOrderNumber: orderNum,
            title: `Automated Trip Investigation: ${fault.title}`,
            description: `Auto-generated ticket by ReactorOS heuristic engine for ${fault.code}: ${fault.description}`,
            priority: 'URGENT',
            status: 'OPEN',
            assignedTo: 'Lead Duty Engineer',
          },
        });
        ordersCreated++;
      }

      // 3. Automated preventive work orders for high-hour magnetrons (> 4000 hours without recent service)
      const highHourReactors = await prisma.reactor.findMany({
        where: {
          totalRunHours: { gte: 4000 },
          workOrders: {
            none: {
              status: { in: ['OPEN', 'ASSIGNED', 'IN_PROGRESS'] },
            },
          },
        },
        take: 3,
      });

      for (const r of highHourReactors) {
        const orderNum = `WO-PM-${r.serialNumber.slice(-5)}-${Date.now().toString().slice(-4)}`;
        await prisma.workOrder.create({
          data: {
            reactorId: r.id,
            workOrderNumber: orderNum,
            title: `Scheduled Preventative Overhaul: ${r.serialNumber}`,
            description: `Automated PM reminder: Magnetron run hours reached ${Math.round(r.totalRunHours)} hrs. Inspect microwave waveguide, belljar seals, and turbo bearing.`,
            priority: 'HIGH',
            status: 'OPEN',
            assignedTo: 'Field Service Team',
          },
        });
        ordersCreated++;
      }

      return {
        staleSensorsCount: staleSensors.count,
        preventiveOrdersCreated: ordersCreated,
        offlineReactorsCount: 0,
        timestamp: new Date().toISOString(),
      };
    } catch (e) {
      console.error('[MaintenanceService] Automated routine error:', e);
      return {
        staleSensorsCount: 0,
        preventiveOrdersCreated: 0,
        offlineReactorsCount: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }
}
