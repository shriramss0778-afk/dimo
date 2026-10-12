export function validateReactorPayload(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Body must be a JSON object'] };
  }

  const p = data as Record<string, unknown>;
  if (!p.name || typeof p.name !== 'string') errors.push('name is required');
  if (!p.model || typeof p.model !== 'string') errors.push('model is required');
  if (!p.serialNumber || typeof p.serialNumber !== 'string') errors.push('serialNumber is required');
  if (!p.siteId || typeof p.siteId !== 'string') errors.push('siteId is required');

  return { valid: errors.length === 0, errors };
}
