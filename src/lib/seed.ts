import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedInitialTopology() {
  console.log('[Seed] Checking if database topology exists...');
  const siteCount = await prisma.site.count();
  if (siteCount > 0) {
    console.log('[Seed] Database topology already initialized.');
    return;
  }

  console.log('[Seed] Seeding initial industrial facilities and equipment...');

  // 1. Create Sites
  const surat = await prisma.site.create({
    data: {
      code: 'SUR-01',
      name: 'Surat Diamond Tech Park - Fab 1',
      city: 'Surat',
      state: 'Gujarat',
      country: 'India',
      timezone: 'Asia/Kolkata',
      description: 'Primary industrial diamond microwave CVD manufacturing plant.',
    },
  });

  const navsari = await prisma.site.create({
    data: {
      code: 'NAV-02',
      name: 'Navsari High-Yield Cleanroom Complex',
      city: 'Navsari',
      state: 'Gujarat',
      country: 'India',
      timezone: 'Asia/Kolkata',
      description: 'High-purity electronic and optical grade CVD diamond facility.',
    },
  });

  const mumbai = await prisma.site.create({
    data: {
      code: 'BOM-03',
      name: 'Mumbai Advanced CVD Labs',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      timezone: 'Asia/Kolkata',
      description: 'R&D pilot line and plasma engineering testing facility.',
    },
  });

  // 2. Gateways (Edge Appliances)
  const gwSuratA = await prisma.gateway.create({
    data: {
      siteId: surat.id,
      name: 'Surat-Bay-A-Edge-01',
      macAddress: '00:1B:44:11:3A:B7',
      ipAddress: '192.168.10.12',
      protocol: 'MQTT / Modbus-TCP',
      firmwareVersion: 'v2.4.1',
      status: 'CONNECTED',
    },
  });

  const gwSuratB = await prisma.gateway.create({
    data: {
      siteId: surat.id,
      name: 'Surat-Bay-B-Edge-02',
      macAddress: '00:1B:44:11:3A:D4',
      ipAddress: '192.168.10.15',
      protocol: 'MQTT / Modbus-TCP',
      firmwareVersion: 'v2.4.1',
      status: 'CONNECTED',
    },
  });

  const gwNavsari = await prisma.gateway.create({
    data: {
      siteId: navsari.id,
      name: 'Navsari-Lab-Edge-01',
      macAddress: '00:1B:44:11:3A:C8',
      ipAddress: '192.168.20.10',
      protocol: 'MQTT / OPC-UA',
      firmwareVersion: 'v2.4.1',
      status: 'CONNECTED',
    },
  });

  const gwMumbai = await prisma.gateway.create({
    data: {
      siteId: mumbai.id,
      name: 'Mumbai-Pilot-Edge-01',
      macAddress: '00:1B:44:11:3A:E9',
      ipAddress: '192.168.30.22',
      protocol: 'OPC-UA / SECS-GEM',
      firmwareVersion: 'v2.3.9',
      status: 'CONNECTED',
    },
  });

  // 3. Reactors
  const reactorData = [
    { siteId: surat.id, name: 'Alpha-01', serialNumber: 'PL1-SEC1-CVD01', model: 'MPCVD-915-PRO', chamberVolumeL: 45.0, maxPowerKw: 6.0, status: 'ALARM', condition: 'DEGRADED', healthScore: 65.0, totalRunHours: 2840, isSimulated: true, gatewayId: gwSuratA.id },
    { siteId: surat.id, name: 'Alpha-02', serialNumber: 'PL1-SEC1-CVD02', model: 'MPCVD-915-PRO', chamberVolumeL: 45.0, maxPowerKw: 6.0, status: 'RUNNING', condition: 'GOOD', healthScore: 85.0, totalRunHours: 3120, isSimulated: true, gatewayId: gwSuratA.id },
    { siteId: surat.id, name: 'Alpha-03', serialNumber: 'PL1-SEC1-CVD03', model: 'MPCVD-915-PRO', chamberVolumeL: 45.0, maxPowerKw: 6.0, status: 'RUNNING', condition: 'OPTIMAL', healthScore: 93.0, totalRunHours: 1980, isSimulated: true, gatewayId: gwSuratA.id },
    { siteId: surat.id, name: 'Alpha-04', serialNumber: 'PL1-SEC1-CVD04', model: 'MPCVD-915-PRO', chamberVolumeL: 45.0, maxPowerKw: 6.0, status: 'RUNNING', condition: 'GOOD', healthScore: 88.0, totalRunHours: 4420, isSimulated: true, gatewayId: gwSuratA.id },
    { siteId: surat.id, name: 'Alpha-06', serialNumber: 'PL1-SEC1-CVD06', model: 'MPCVD-915-PRO', chamberVolumeL: 45.0, maxPowerKw: 6.0, status: 'ALARM', condition: 'CRITICAL', healthScore: 38.0, totalRunHours: 1250, isSimulated: true, gatewayId: gwSuratB.id },
    { siteId: navsari.id, name: 'Alpha-07', serialNumber: 'PL1-SEC1-CVD07', model: 'MPCVD-2450-ULTRA', chamberVolumeL: 60.0, maxPowerKw: 10.0, status: 'IDLE', condition: 'OPTIMAL', healthScore: 90.0, totalRunHours: 820, isSimulated: true, gatewayId: gwNavsari.id },
    { siteId: navsari.id, name: 'Alpha-08', serialNumber: 'PL1-SEC1-CVD08', model: 'MPCVD-2450-ULTRA', chamberVolumeL: 60.0, maxPowerKw: 10.0, status: 'RUNNING', condition: 'OPTIMAL', healthScore: 94.0, totalRunHours: 2450, isSimulated: true, gatewayId: gwNavsari.id },
    { siteId: navsari.id, name: 'Alpha-10', serialNumber: 'PL1-SEC1-CVD10', model: 'MPCVD-2450-ULTRA', chamberVolumeL: 60.0, maxPowerKw: 10.0, status: 'IDLE', condition: 'OPTIMAL', healthScore: 91.0, totalRunHours: 640, isSimulated: true, gatewayId: gwNavsari.id },
    { siteId: mumbai.id, name: 'Alpha-05', serialNumber: 'PL1-SEC1-CVD05', model: 'MPCVD-2450-ULTRA', chamberVolumeL: 60.0, maxPowerKw: 10.0, status: 'MAINTENANCE', condition: 'DEGRADED', healthScore: 44.0, totalRunHours: 5600, isSimulated: true, gatewayId: gwMumbai.id },
    { siteId: mumbai.id, name: 'Alpha-09', serialNumber: 'PL1-SEC1-CVD09', model: 'MPCVD-2450-ULTRA', chamberVolumeL: 60.0, maxPowerKw: 10.0, status: 'RUNNING', condition: 'GOOD', healthScore: 82.0, totalRunHours: 3780, isSimulated: true, gatewayId: gwMumbai.id },
  ];

  for (const r of reactorData) {
    const reactor = await prisma.reactor.create({
      data: {
        siteId: r.siteId,
        name: r.name,
        serialNumber: r.serialNumber,
        model: r.model,
        chamberVolumeL: r.chamberVolumeL,
        maxPowerKw: r.maxPowerKw,
        status: r.status as any,
        condition: r.condition as any,
        healthScore: r.healthScore,
        totalRunHours: r.totalRunHours,
        isSimulated: r.isSimulated,
      },
    });

    // Default Operating Limits
    await prisma.operatingLimit.createMany({
      data: [
        { reactorId: reactor.id, parameter: 'plasma_temp', minNormal: 800, maxNormal: 860, minWarning: 780, maxWarning: 880, minCritical: 750, maxCritical: 910, unit: '°C' },
        { reactorId: reactor.id, parameter: 'chamber_pressure', minNormal: 15, maxNormal: 22, minWarning: 12, maxWarning: 26, minCritical: 8, maxCritical: 32, unit: 'Torr' },
        { reactorId: reactor.id, parameter: 'microwave_power', minNormal: 28, maxNormal: 33, minWarning: 25, maxWarning: 36, minCritical: 20, maxCritical: 40, unit: 'kW' },
      ],
    });

    // Default Sensor Transducers
    await prisma.sensor.createMany({
      data: [
        { reactorId: reactor.id, gatewayId: r.gatewayId, code: `TC-PLASM-${r.serialNumber.slice(-2)}`, name: 'Optical Dual-Wavelength Pyrometer', type: 'TEMPERATURE', unit: '°C', status: 'ONLINE', lastReading: 845.0, lastTimestamp: new Date() },
        { reactorId: reactor.id, gatewayId: r.gatewayId, code: `BP-VAC-${r.serialNumber.slice(-2)}`, name: 'Baratron Capacitance Manometer', type: 'PRESSURE', unit: 'Torr', status: 'ONLINE', lastReading: 18.2, lastTimestamp: new Date() },
        { reactorId: reactor.id, gatewayId: r.gatewayId, code: `MW-GEN-${r.serialNumber.slice(-2)}`, name: 'Microwave Directional Coupler', type: 'MICROWAVE_POWER', unit: 'kW', status: 'ONLINE', lastReading: 31.0, lastTimestamp: new Date() },
        { reactorId: reactor.id, gatewayId: r.gatewayId, code: `MFC-CH4-${r.serialNumber.slice(-2)}`, name: 'Mass Flow Controller - CH4', type: 'GAS_FLOW_CH4', unit: 'sccm', status: 'ONLINE', lastReading: 15.0, lastTimestamp: new Date() },
      ],
    });

    // Baseline initial telemetry log
    await prisma.telemetryLog.create({
      data: {
        reactorId: reactor.id,
        temperatureC: 844.5,
        pressureTorr: 18.2,
        microwavePowerKw: 31.1,
        ch4FlowSccm: 14.9,
        h2FlowSccm: 320.0,
        substrateTempC: 825.0,
        vacuumLevelMbar: 0.02,
        coolingFlowLpm: 4.8,
        isSimulated: true,
        isValid: true,
        qualityScore: 1.0,
      },
    });
  }

  // 4. Detection Rules
  await prisma.detectionRule.createMany({
    data: [
      { code: 'RULE-TEMP-RUNAWAY', name: 'Thermal Runaway Detection', description: 'Plasma pyrometer gradient ROC exceeds safe diamond substrate threshold', parameter: 'plasma_temp', condition: 'ROC_GREATER_THAN', threshold: 15.0, severity: 'CRITICAL', isActive: true },
      { code: 'RULE-VAC-LEAK', name: 'Vacuum Envelope Micro-leak', description: 'Chamber pressure deviates upward while mass flow is constant', parameter: 'chamber_pressure', condition: 'GREATER_THAN', threshold: 24.0, severity: 'WARNING', isActive: true },
      { code: 'RULE-RF-REFLECTED', name: 'Magnetron High Reflected Power', description: 'Reflected power ratio exceeds waveguide safety trip setpoint', parameter: 'reflected_power', condition: 'GREATER_THAN', threshold: 12.0, severity: 'CRITICAL', isActive: true },
      { code: 'RULE-GAS-RATIO', name: 'CH4 / H2 Gas Depletion', description: 'Methane to Hydrogen ratio deviates outside quality window', parameter: 'gas_ratio', condition: 'OUT_OF_BOUNDS', threshold: 5.5, severity: 'WARNING', isActive: true },
    ],
  });

  // 5. Spare Parts Inventory
  await prisma.sparePart.createMany({
    data: [
      { partNumber: 'MAG-915-06K', name: 'Panasonic 6kW 915MHz Industrial Magnetron', category: 'Magnetrons', stockCount: 3, minThreshold: 2, unitCostInr: 285000, location: 'Surat Fab 1 Clean Store' },
      { partNumber: 'QZ-BELL-450', name: 'High-Purity Fused Quartz Belljar 450mm', category: 'Optics', stockCount: 1, minThreshold: 2, unitCostInr: 140000, location: 'Surat Fab 1 Bay A' },
      { partNumber: 'SEAL-FFKM-V2', name: 'Perfluoroelastomer (FFKM) High-Vac Chamber O-Ring Kit', category: 'Seals', stockCount: 12, minThreshold: 4, unitCostInr: 22000, location: 'Navsari Cleanroom Racks' },
      { partNumber: 'MFC-HORI-300', name: 'Horiba STEC Digital Mass Flow Controller 500 sccm', category: 'MFC Valves', stockCount: 4, minThreshold: 2, unitCostInr: 88000, location: 'Mumbai Pilot Store' },
    ],
  });

  console.log('[Seed] Database initialization completed successfully.');
}

if (require.main === module) {
  seedInitialTopology()
    .then(() => prisma.$disconnect())
    .catch((e) => {
      console.error(e);
      prisma.$disconnect();
      process.exit(1);
    });
}
