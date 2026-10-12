import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export class ReactorService {
  static async getOverview() {
    if (!env.isConfigured()) {
      return {
        isConfigured: false,
        totalReactors: 14,
        running: 11,
        idle: 2,
        maintenance: 1,
        offline: 0,
        averageHealth: 96.4,
        activeAlarms: 3,
        reactors: [],
      };
    }

    try {
      const [total, running, idle, offline, maintenance, alarms, reactors] = await Promise.all([
        prisma.reactor.count(),
        prisma.reactor.count({ where: { status: 'RUNNING' } }),
        prisma.reactor.count({ where: { status: 'IDLE' } }),
        prisma.reactor.count({ where: { status: 'OFFLINE' } }),
        prisma.reactor.count({ where: { status: 'MAINTENANCE' } }),
        prisma.faultEvent.count({ where: { status: 'ACTIVE' } }),
        prisma.reactor.findMany({
          take: 10,
          include: { site: true, sensors: true },
          orderBy: { updatedAt: 'desc' },
        }),
      ]);

      const avgHealth =
        reactors.length > 0
          ? reactors.reduce((acc, r) => acc + r.healthScore, 0) / reactors.length
          : 100.0;

      return {
        isConfigured: true,
        totalReactors: total,
        running,
        idle,
        offline,
        maintenance,
        averageHealth: Number(avgHealth.toFixed(1)),
        activeAlarms: alarms,
        reactors,
      };
    } catch {
      return {
        isConfigured: false,
        totalReactors: 0,
        running: 0,
        idle: 0,
        maintenance: 0,
        offline: 0,
        averageHealth: 0,
        activeAlarms: 0,
        reactors: [],
      };
    }
  }

  static async listAll() {
    if (!env.isConfigured()) return [];
    try {
      return await prisma.reactor.findMany({
        include: { site: true, sensors: true, operatingLimits: true },
        orderBy: { serialNumber: 'asc' },
      });
    } catch {
      return [];
    }
  }

  static async getById(id: string) {
    if (!env.isConfigured()) return null;
    try {
      return await prisma.reactor.findUnique({
        where: { id },
        include: {
          site: true,
          sensors: true,
          operatingLimits: true,
          faultEvents: { take: 5, orderBy: { detectedAt: 'desc' } },
          workOrders: { take: 5, orderBy: { createdAt: 'desc' } },
        },
      });
    } catch {
      return null;
    }
  }
}
