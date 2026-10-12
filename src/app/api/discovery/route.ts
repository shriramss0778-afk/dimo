import { NextRequest, NextResponse } from 'next/server';
import { DiscoveryService, DeviceDiscoveryPayload } from '@/services/discovery.service';
import { env } from '@/lib/env';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('x-gateway-key') || req.headers.get('authorization');
    const expectedKey = env.GATEWAY_API_KEY;

    if (authHeader && authHeader !== expectedKey && !authHeader.includes(expectedKey)) {
      return NextResponse.json({ success: false, error: 'Unauthorized gateway credentials' }, { status: 401 });
    }

    const body: DeviceDiscoveryPayload = await req.json();

    if (!body.gatewayMac || !body.devices || !Array.isArray(body.devices)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid discovery packet: gatewayMac and devices array required',
      }, { status: 400 });
    }

    const result = await DiscoveryService.discoverAndRegister(body);
    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message || 'Discovery processing error' }, { status: 500 });
  }
}
