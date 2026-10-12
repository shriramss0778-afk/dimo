import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const isDbConfigured = env.isConfigured();
  let dbStatus = 'disconnected';
  let latencyMs = 0;

  if (isDbConfigured) {
    try {
      const start = Date.now();
      await prisma.$queryRaw`SELECT 1`;
      latencyMs = Date.now() - start;
      dbStatus = 'connected';
    } catch {
      dbStatus = 'error';
    }
  }

  return NextResponse.json({
    status: 'ok',
    service: 'DIMO Core API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      configured: isDbConfigured,
      status: dbStatus,
      latencyMs: dbStatus === 'connected' ? latencyMs : null,
    },
  });
}
