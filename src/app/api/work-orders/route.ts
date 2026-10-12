import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function GET() {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: true, data: [], simulated: true });
  }
  try {
    const orders = await prisma.workOrder.findMany({
      include: { reactor: { include: { site: true } }, faultEvent: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: orders });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to fetch work orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }
  try {
    const body = await req.json();
    const { title, description, reactorId, priority, assignedTo, scheduledDate } = body;

    if (!title?.trim())       return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    if (!reactorId?.trim())   return NextResponse.json({ success: false, error: 'Reactor is required' }, { status: 400 });
    if (!priority)            return NextResponse.json({ success: false, error: 'Priority is required' }, { status: 400 });

    // Generate sequential work order number
    const count = await prisma.workOrder.count();
    const year  = new Date().getFullYear();
    const num   = String(count + 1).padStart(4, '0');
    const workOrderNumber = `WO-${year}-${num}`;

    const order = await prisma.workOrder.create({
      data: {
        workOrderNumber,
        title: title.trim(),
        description: description?.trim() || '',
        reactorId,
        priority,
        assignedTo: assignedTo?.trim() || null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        status: 'OPEN',
      },
      include: { reactor: { include: { site: true } } },
    });

    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Failed to create work order' }, { status: 500 });
  }
}
