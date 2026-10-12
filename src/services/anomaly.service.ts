import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export class AnomalyService {
  static async getAlarms() {
    if (!env.isConfigured()) return [];
    try {
      return await prisma.faultEvent.findMany({
        include: { reactor: true },
        orderBy: { detectedAt: 'desc' },
        take: 50,
      });
    } catch {
      return [];
    }
  }

  static async acknowledgeAlarm(id: string, user = 'Operator') {
    if (!env.isConfigured()) return null;
    try {
      return await prisma.faultEvent.update({
        where: { id },
        data: {
          status: 'ACKNOWLEDGED',
          acknowledgedAt: new Date(),
          acknowledgedBy: user,
        },
      });
    } catch {
      return null;
    }
  }
}
