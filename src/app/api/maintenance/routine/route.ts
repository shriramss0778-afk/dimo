import { NextResponse } from 'next/server';
import { MaintenanceService } from '@/services/maintenance.service';

export async function POST() {
  try {
    const result = await MaintenanceService.runAutomatedMaintenanceRoutine();
    return NextResponse.json({ success: true, ...result });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await MaintenanceService.runAutomatedMaintenanceRoutine();
    return NextResponse.json({ success: true, ...result });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
