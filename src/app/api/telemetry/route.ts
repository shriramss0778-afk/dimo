import { NextRequest, NextResponse } from 'next/server';
import { validateTelemetryPayload } from '@/validations/telemetry.schema';
import { TelemetryService } from '@/services/telemetry.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateTelemetryPayload(body);

    if (!validation.valid || !validation.data) {
      return NextResponse.json({ success: false, errors: validation.errors }, { status: 400 });
    }

    const result = await TelemetryService.ingest(validation.data);
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reactorId = searchParams.get('reactorId');

  if (!reactorId) {
    return NextResponse.json({ success: false, error: 'reactorId parameter is required' }, { status: 400 });
  }

  const logs = await TelemetryService.getHistory(reactorId);
  return NextResponse.json({ success: true, data: logs });
}
