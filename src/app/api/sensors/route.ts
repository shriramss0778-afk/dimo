import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function GET() {
  if (!env.isConfigured()) {
    return NextResponse.json({
      success: true,
      data: [
        { id: 'sen-01', code: 'TC-PLAS-01', name: 'Plasma Core Temp', type: 'TEMPERATURE', unit: '°C', status: 'ONLINE', lastReading: 942.5 },
        { id: 'sen-02', code: 'PR-CHAM-01', name: 'Chamber Pressure', type: 'PRESSURE', unit: 'Torr', status: 'ONLINE', lastReading: 120.4 },
        { id: 'sen-03', code: 'MW-GEN-01', name: 'Microwave Forward Power', type: 'MICROWAVE_POWER', unit: 'kW', status: 'ONLINE', lastReading: 5.2 },
      ]
    });
  }

  try {
    const sensors = await prisma.sensor.findMany({
      include: { reactor: true },
      orderBy: { code: 'asc' },
    });
    return NextResponse.json({ success: true, data: sensors });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
