import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function GET() {
  if (!env.isConfigured()) {
    return NextResponse.json({
      success: true,
      data: [
        { id: 'gw-01', name: 'Surat-Bay-A-Edge-01', macAddress: '00:1B:44:11:3A:B7', status: 'CONNECTED', protocol: 'MQTT / Modbus-TCP', firmwareVersion: 'v2.4.1' },
        { id: 'gw-02', name: 'Navsari-Lab-Edge-02', macAddress: '00:1B:44:11:3A:C8', status: 'CONNECTED', protocol: 'MQTT / OPC-UA', firmwareVersion: 'v2.4.1' },
      ]
    });
  }

  try {
    const gateways = await prisma.gateway.findMany({
      include: { site: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ success: true, data: gateways });
  } catch {
    return NextResponse.json({ success: false, data: [] });
  }
}
