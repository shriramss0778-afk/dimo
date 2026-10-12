import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!env.isConfigured()) {
    return NextResponse.json({ success: false, error: 'Database not configured' }, { status: 503 });
  }
  try {
    const { id } = await params;
    const { isActive } = await req.json();
    const rule = await prisma.detectionRule.update({
      where: { id },
      data:  { isActive },
    });
    return NextResponse.json({ success: true, data: rule });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update rule' }, { status: 500 });
  }
}
