import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const allowed = ['status', 'assignedTo', 'hoursSpent', 'completedDate'] as const;
    const data: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) data[key] = body[key];
    }
    if (body.status === 'RESOLVED' || body.status === 'CLOSED') {
      data.completedDate = new Date();
    }
    const order = await prisma.workOrder.update({
      where: { id },
      data,
      include: { reactor: true },
    });
    return NextResponse.json({ success: true, data: order });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to update work order' }, { status: 500 });
  }
}
