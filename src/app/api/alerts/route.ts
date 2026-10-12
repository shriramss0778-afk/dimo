import { NextResponse } from 'next/server';
import { AnomalyService } from '@/services/anomaly.service';

export async function GET() {
  const alarms = await AnomalyService.getAlarms();
  return NextResponse.json({ success: true, data: alarms });
}
