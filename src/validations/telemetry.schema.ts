import { TelemetryPayload } from '@/types';

export function validateTelemetryPayload(data: unknown): { valid: boolean; errors: string[]; data?: TelemetryPayload } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Request body must be a valid JSON object'] };
  }

  const payload = data as Partial<TelemetryPayload>;

  if (!payload.reactorId || typeof payload.reactorId !== 'string') {
    errors.push('reactorId is required and must be a string');
  }

  if (typeof payload.temperatureC !== 'number' || isNaN(payload.temperatureC)) {
    errors.push('temperatureC is required and must be a valid number');
  }

  if (typeof payload.pressureTorr !== 'number' || isNaN(payload.pressureTorr)) {
    errors.push('pressureTorr is required and must be a valid number');
  }

  if (typeof payload.microwavePowerKw !== 'number' || isNaN(payload.microwavePowerKw)) {
    errors.push('microwavePowerKw is required and must be a valid number');
  }

  if (typeof payload.ch4FlowSccm !== 'number' || isNaN(payload.ch4FlowSccm)) {
    errors.push('ch4FlowSccm is required and must be a valid number');
  }

  if (typeof payload.h2FlowSccm !== 'number' || isNaN(payload.h2FlowSccm)) {
    errors.push('h2FlowSccm is required and must be a valid number');
  }

  if (typeof payload.substrateTempC !== 'number' || isNaN(payload.substrateTempC)) {
    errors.push('substrateTempC is required and must be a valid number');
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    data: payload as TelemetryPayload,
  };
}
