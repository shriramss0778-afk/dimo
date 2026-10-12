import { NextResponse } from 'next/server';
import { ReactorService } from '@/services/reactor.service';

export async function GET() {
  const data = await ReactorService.getOverview();
  return NextResponse.json(data);
}
