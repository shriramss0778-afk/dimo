import { NextResponse } from 'next/server';
import { AnomalyService } from '@/services/anomaly.service';

export async function GET() {
  const anomalies = await AnomalyService.getAlarms();
  return NextResponse.json({ success: true, data: anomalies });
}
