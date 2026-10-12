import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      appName: 'DIMO',
      version: '1.0.0',
      deploymentTarget: 'Vercel / Neon PostgreSQL',
      databaseConfigured: env.isConfigured(),
      telemetryRetentionDays: 90,
      samplingRateHz: 1.0,
      protocolDefault: 'MQTT / Modbus-TCP',
      timeZone: 'Asia/Kolkata (IST)',
    },
  });
}
