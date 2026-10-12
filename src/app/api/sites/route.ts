import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function GET() {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: true, data: [] });
  }

  try {
    const sites = await prisma.site.findMany({
      include: {
        reactors: true,
        gateways: true,
      },
      orderBy: { code: 'asc' },
    });

    const data = sites.map((s) => {
      const total = s.reactors.length;
      const online = s.reactors.filter((r) => r.status === 'RUNNING').length;
      const avgHealth =
        total > 0
          ? Number((s.reactors.reduce((acc, r) => acc + r.healthScore, 0) / total).toFixed(1))
          : 100.0;
      const totalPower = s.reactors.reduce((acc, r) => acc + (r.status === 'RUNNING' ? r.maxPowerKw * 0.8 : 0), 0);

      return {
        id: s.id,
        code: s.code,
        name: s.name,
        city: s.city,
        state: s.state,
        reactorsTotal: total,
        reactorsOnline: online,
        avgHealth,
        powerDrawKw: Number(totalPower.toFixed(1)),
        gateways: s.gateways.length,
        status: avgHealth < 70 ? 'WARNING' : 'OPTIMAL',
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
