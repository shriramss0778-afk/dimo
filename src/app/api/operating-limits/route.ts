import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function PUT(req: NextRequest) {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }
  try {
    const { reactorId, limits } = await req.json();
    if (!reactorId || !Array.isArray(limits)) {
      return NextResponse.json({ success: false, error: 'reactorId and limits[] required' }, { status: 400 });
    }
    const ops = limits.map((lim: {
      parameter: string; minNormal: number; maxNormal: number;
      minWarning: number; maxWarning: number;
      minCritical: number; maxCritical: number; unit: string;
    }) =>
      prisma.operatingLimit.upsert({
        where: { reactorId_parameter: { reactorId, parameter: lim.parameter } },
        update: {
          minNormal: lim.minNormal, maxNormal: lim.maxNormal,
          minWarning: lim.minWarning, maxWarning: lim.maxWarning,
          minCritical: lim.minCritical, maxCritical: lim.maxCritical,
        },
        create: {
          reactorId,
          parameter: lim.parameter,
          unit: lim.unit,
          minNormal: lim.minNormal, maxNormal: lim.maxNormal,
          minWarning: lim.minWarning, maxWarning: lim.maxWarning,
          minCritical: lim.minCritical, maxCritical: lim.maxCritical,
        },
      })
    );
    await prisma.$transaction(ops);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to save limits' }, { status: 500 });
  }
}
