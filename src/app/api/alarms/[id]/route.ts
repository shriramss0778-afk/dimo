import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }
  try {
    const { id } = await params;
    const { status } = await req.json();
    const data: Record<string, unknown> = { status };
    if (status === 'ACKNOWLEDGED') {
      data.acknowledgedAt = new Date();
      data.acknowledgedBy = 'Operator';
    }
    if (status === 'RESOLVED') {
      data.resolvedAt = new Date();
      data.resolvedBy  = 'Operator';
    }
    const alarm = await prisma.faultEvent.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, data: alarm });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update alarm' }, { status: 500 });
  }
}
