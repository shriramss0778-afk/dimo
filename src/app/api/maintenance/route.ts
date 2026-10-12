import { NextResponse } from 'next/server';
import { MaintenanceService } from '@/services/maintenance.service';

export async function GET() {
  const [workOrders, spares] = await Promise.all([
    MaintenanceService.getWorkOrders(),
    MaintenanceService.getSpares(),
  ]);

  return NextResponse.json({
    success: true,
    data: {
      workOrders,
      spares,
    },
  });
}
