// ---------------------------------------------------------------------------
// Date helpers. Seed data is expressed relative to today so the demo never
// goes stale (every record turning "Overdue" a month from now).
// ---------------------------------------------------------------------------

const TODAY = startOfDay(new Date());

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// Parse 'YYYY-MM-DD' as a local date. `new Date('2026-09-28')` parses as UTC,
// which shifts the day backwards in US time zones.
function parseDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function offsetDays(days) {
  const date = new Date(TODAY);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

function addMonths(months) {
  const date = new Date(TODAY);
  date.setMonth(date.getMonth() + months);
  return toISODate(date);
}

function daysFromToday(dateString) {
  return Math.round((parseDate(dateString) - TODAY) / 86400000);
}

function formatDate(dateString) {
  return parseDate(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

const rolePermissions = {
  supervisor: { canCreateWO: true, canStartWO: true, canCloseWO: true, hint: 'Can create, start and close work orders.' },
  mechanic: { canCreateWO: true, canStartWO: true, canCloseWO: false, hint: 'Can create and start work. Closing needs supervisor sign-off.' },
  viewer: { canCreateWO: false, canStartWO: false, canCloseWO: false, hint: 'Read-only access to all records.' }
};

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

const assets = [
  {
    id: 'A-1045',
    assetNumber: 'ASSET-1045',
    asset: 'Ford F-550',
    description: 'Service truck with utility body',
    vin: '1FT8W3BT0KED94821',
    make: 'Ford',
    model: 'F-550',
    fuelType: 'Diesel',
    licensePlate: 'NC-2048',
    registrationExpiration: '2027-03-15',
    transponderNumber: 'TX-2048',
    fuelCardNumber: 'FC-4431',
    department: 'Public Works',
    location: 'Fleet Yard A',
    budgetCode: 'PW-TRK-01',
    inServiceDate: '2023-03-01',
    currentMileage: 185400,
    recordStatus: 'Active',
    poNumber: 'PO-1154',
    lifeExpectancyYears: 8,
    lifeExpectancyMiles: 300000,
    conditionRating: 3,
    notes: 'Regular service route; cooling system under review.'
  },
  {
    id: 'A-1032',
    assetNumber: 'ASSET-1032',
    asset: 'Chevrolet Silverado 2500',
    description: 'Field support pickup',
    vin: '1GCVKPEC2MJ150221',
    make: 'Chevrolet',
    model: 'Silverado 2500',
    fuelType: 'Gasoline',
    licensePlate: 'NC-1879',
    registrationExpiration: '2026-12-30',
    transponderNumber: 'TX-1879',
    fuelCardNumber: 'FC-2218',
    department: 'Utilities',
    location: 'Utilities Garage',
    budgetCode: 'UT-TRK-04',
    inServiceDate: '2021-06-02',
    currentMileage: 147250,
    recordStatus: 'Active',
    poNumber: 'PO-9812',
    lifeExpectancyYears: 6,
    lifeExpectancyMiles: 220000,
    conditionRating: 2,
    notes: 'Front-end wear and tire rotation due.'
  },
  {
    id: 'A-1007',
    assetNumber: 'ASSET-1007',
    asset: 'John Deere 210L Backhoe',
    description: 'Earthmoving/backhoe loader',
    vin: '1M00512H8LZ120441',
    make: 'John Deere',
    model: '210L',
    fuelType: 'Diesel',
    licensePlate: 'NC-4512',
    registrationExpiration: '2027-06-24',
    transponderNumber: 'TX-4512',
    fuelCardNumber: 'FC-9921',
    department: 'Parks & Rec',
    location: 'Parks South Yard',
    budgetCode: 'PR-EQ-12',
    inServiceDate: '2024-10-01',
    currentMileage: 8320,
    recordStatus: 'Active',
    poNumber: 'PO-2711',
    lifeExpectancyYears: 12,
    lifeExpectancyMiles: 500000,
    conditionRating: 4,
    notes: 'Hydraulic function stable; fluid test scheduled.'
  },
  {
    id: 'A-1078',
    assetNumber: 'ASSET-1078',
    asset: 'Freightliner M2 Dump Truck',
    description: 'Heavy-duty dump body',
    vin: '3AKJGLDR3MSFJ4021',
    make: 'Freightliner',
    model: 'M2',
    fuelType: 'Diesel',
    licensePlate: 'NC-3064',
    registrationExpiration: '2026-11-12',
    transponderNumber: 'TX-3064',
    fuelCardNumber: 'FC-2108',
    department: 'Streets',
    location: 'Roads Shop',
    budgetCode: 'ST-DMP-02',
    inServiceDate: '2019-05-08',
    currentMileage: 245930,
    recordStatus: 'Active',
    poNumber: 'PO-7601',
    lifeExpectancyYears: 10,
    lifeExpectancyMiles: 240000,
    conditionRating: 2,
    notes: 'Brake inspection overdue; past mileage life target, candidate for replacement.'
  },
  {
    id: 'A-1091',
    assetNumber: 'ASSET-1091',
    asset: 'Ford Transit Van',
    description: 'Service van for inspections and parts delivery',
    vin: '1FBAX2YB5NDA42321',
    make: 'Ford',
    model: 'Transit',
    fuelType: 'Gasoline',
    licensePlate: 'NC-5321',
    registrationExpiration: '2027-08-20',
    transponderNumber: 'TX-5321',
    fuelCardNumber: 'FC-8769',
    department: 'Fleet Admin',
    location: 'Fleet Operations',
    budgetCode: 'FA-VAN-02',
    inServiceDate: '2022-09-03',
    currentMileage: 97240,
    recordStatus: 'Active',
    poNumber: 'PO-4407',
    lifeExpectancyYears: 9,
    lifeExpectancyMiles: 180000,
    conditionRating: 4,
    notes: 'Used for recurring inspection route and material transfers.'
  }
];

// Additional fleet, in compact form:
// [id, name, make, model, department, location, fuel, inServiceDate, mileage, lifeYears, lifeMiles, condition, vin, plate, notes]
[
  ['A-1102', 'Ford Police Interceptor Utility', 'Ford', 'Explorer PIU', "Sheriff's Office", 'Sheriff HQ', 'Gasoline', '2022-01-15', 88400, 5, 120000, 3, '1FM5K8AB4NGA10217', 'NC-7102', 'Patrol unit; upfit includes lightbar and partition.'],
  ['A-1103', 'Ford Police Interceptor Utility', 'Ford', 'Explorer PIU', "Sheriff's Office", 'Sheriff HQ', 'Gasoline', '2021-03-10', 112900, 5, 120000, 2, '1FM5K8AB1MGB33980', 'NC-7103', 'High idle hours; brake wear above average.'],
  ['A-1110', 'Dodge Charger Pursuit', 'Dodge', 'Charger Pursuit', "Sheriff's Office", 'District 2 Substation', 'Gasoline', '2020-06-01', 131200, 5, 120000, 2, '2C3CDXAG6LH184420', 'NC-7110', 'Past life targets; transmission shudder reported.'],
  ['A-1120', 'Mack LR Refuse Truck', 'Mack', 'LR64', 'Solid Waste', 'Transfer Station', 'Diesel', '2020-02-01', 96400, 10, 250000, 3, '1M2LR02C5LM004812', 'NC-8120', 'Side-loader arm hydraulics serviced last quarter.'],
  ['A-1121', 'Mack LR Refuse Truck', 'Mack', 'LR64', 'Solid Waste', 'Transfer Station', 'Diesel', '2023-07-01', 41800, 10, 250000, 4, '1M2LR02C8PM011394', 'NC-8121', 'Newest refuse unit; under manufacturer warranty.'],
  ['A-1131', 'Ford Ranger', 'Ford', 'Ranger XL', 'Parks & Rec', 'Parks North Yard', 'Gasoline', '2023-05-01', 22100, 8, 150000, 4, '1FTER4FH2PLE20931', 'NC-4131', 'Grounds crew pickup.'],
  ['A-1140', 'Chevrolet Tahoe', 'Chevrolet', 'Tahoe PPV', 'Fleet Admin', 'County Admin Garage', 'Gasoline', '2021-09-01', 76300, 7, 150000, 3, '1GNSKDEC7MR301452', 'NC-1140', 'Emergency management command vehicle.'],
  ['A-1150', 'International HV Plow Truck', 'International', 'HV607', 'Streets', 'Roads Shop', 'Diesel', '2018-11-01', 188200, 12, 250000, 2, '3HAEETAR2JL621840', 'NC-3150', 'Pre-winter plow and spreader inspection pending.'],
  ['A-1151', 'Caterpillar 950M Wheel Loader', 'Caterpillar', '950M', 'Streets', 'Salt Dome', 'Diesel', '2019-03-01', 11800, 15, 400000, 3, 'CAT0950MKEJB01288', 'NC-3151', 'Salt loading; bucket cutting edge at 60%.'],
  ['A-1160', 'Ford F-350 Utility Truck', 'Ford', 'F-350', 'Utilities', 'Water Plant', 'Diesel', '2024-02-01', 18400, 8, 200000, 4, '1FT8W3BT3RED11804', 'NC-2160', 'Meter crew truck.'],
  ['A-1161', 'Chevrolet Bolt EV', 'Chevrolet', 'Bolt EUV', 'Fleet Admin', 'County Admin Garage', 'Electric', '2024-06-01', 12900, 8, 150000, 4, '1G1FZ6S08R4104417', 'NC-1161', 'Pool car; Level 2 charger at admin garage.'],
  ['A-1170', 'Freightliner Vactor Truck', 'Freightliner', '114SD', 'Utilities', 'Sewer Division', 'Diesel', '2017-08-01', 142300, 12, 250000, 2, '3ALHG5DV2HDJF7730', 'NC-2170', 'Vacuum pump rebuild recommended within 6 months.']
].forEach(([id, asset, make, model, department, location, fuelType, inServiceDate, currentMileage, lifeExpectancyYears, lifeExpectancyMiles, conditionRating, vin, licensePlate, notes]) => {
  const num = id.split('-')[1];
  assets.push({
    id, assetNumber: `ASSET-${num}`, asset, description: `${make} ${model}`, vin, make, model, fuelType, licensePlate,
    registrationExpiration: offsetDays(40 + (Number(num) % 300)), transponderNumber: `TX-${num}`, fuelCardNumber: `FC-${num}`,
    department, location, budgetCode: `${department.slice(0, 2).toUpperCase()}-${num}`, inServiceDate, currentMileage,
    recordStatus: 'Active', poNumber: `PO-${num}`, lifeExpectancyYears, lifeExpectancyMiles, conditionRating, notes
  });
});

const vendors = ['King Tire & Service', 'Tri-State Brake Co.', 'County Electric Shop', 'Fleet Parts Express'];

// Inventory status is derived from onHand vs reorderPoint, never stored.
const inventory = [
  { part: 'Oil Filter - 5W-30', location: 'Shop A', onHand: 18, reorderPoint: 10, unitCost: 18.75 },
  { part: 'Cabin Air Filter', location: 'Shop B', onHand: 8, reorderPoint: 10, unitCost: 27.40 },
  { part: 'Hydraulic Hose Kit', location: 'Shop C', onHand: 2, reorderPoint: 6, unitCost: 146.00 },
  { part: 'Brake Pad Set', location: 'Shop A', onHand: 22, reorderPoint: 12, unitCost: 74.20 },
  { part: 'Battery - 12V Truck', location: 'Shop D', onHand: 11, reorderPoint: 6, unitCost: 210.00 },
  { part: 'Hydraulic Fluid AW-46 (5 gal)', location: 'Shop C', onHand: 9, reorderPoint: 8, unitCost: 64.50 },
  { part: 'Plow Cutting Edge - 11 ft', location: 'Salt Dome', onHand: 3, reorderPoint: 4, unitCost: 385.00 },
  { part: 'Wiper Blade Set', location: 'Shop B', onHand: 30, reorderPoint: 15, unitCost: 21.00 },
  { part: 'Transmission Fluid ATF (qt)', location: 'Shop A', onHand: 5, reorderPoint: 12, unitCost: 9.80 }
];

const pmRecords = [
  { id: 'PM-01', assetId: 'A-1045', service: 'Oil & Filter Change', nextDue: offsetDays(8), intervalMonths: 3 },
  { id: 'PM-02', assetId: 'A-1078', service: 'Brake Inspection', nextDue: offsetDays(-6), intervalMonths: 1 },
  { id: 'PM-03', assetId: 'A-1007', service: 'Hydraulic Fluid Test', nextDue: offsetDays(36), intervalMonths: 6 },
  { id: 'PM-04', assetId: 'A-1032', service: 'Tire Rotation', nextDue: offsetDays(3), intervalMonths: 3 },
  { id: 'PM-05', assetId: 'A-1091', service: 'Annual Safety Inspection', nextDue: offsetDays(71), intervalMonths: 12 },
  { id: 'PM-06', assetId: 'A-1150', service: 'Pre-Winter Plow & Spreader Check', nextDue: offsetDays(-2), intervalMonths: 12 },
  { id: 'PM-07', assetId: 'A-1120', service: 'Packer Hydraulics Service', nextDue: offsetDays(11), intervalMonths: 3 },
  { id: 'PM-08', assetId: 'A-1102', service: 'Oil & Filter Change', nextDue: offsetDays(19), intervalMonths: 2 },
  { id: 'PM-09', assetId: 'A-1170', service: 'Vacuum Pump Inspection', nextDue: offsetDays(24), intervalMonths: 6 },
  { id: 'PM-10', assetId: 'A-1161', service: 'Battery Health & Tire Check', nextDue: offsetDays(52), intervalMonths: 6 }
];

// Status is Open / In Progress / Complete. "Overdue" is derived from dueDate.
const workOrders = [
  {
    id: 'WO-2451', assetId: 'A-1091', type: 'PM Service', priority: 'Low', status: 'Complete',
    createdAt: offsetDays(-10), dueDate: offsetDays(-5), completedAt: offsetDays(-8),
    description: 'Cabin filter replacement; no further issues.',
    labor: 180, parts: 27, vendor: 0, vendorName: '', mileage: 97240, conditionRating: 4
  },
  {
    id: 'WO-2448', assetId: 'A-1032', type: 'Repair', priority: 'High', status: 'Open',
    createdAt: offsetDays(-6), dueDate: offsetDays(4),
    description: 'Tire rotation and front-end alignment.',
    labor: 240, parts: 0, vendor: 700, vendorName: 'King Tire & Service', mileage: 147250, conditionRating: 2
  },
  {
    id: 'WO-2446', assetId: 'A-1078', type: 'Inspection', priority: 'Critical', status: 'In Progress', pmId: 'PM-02',
    createdAt: offsetDays(-15), dueDate: offsetDays(-6),
    description: 'Brake lining assessment and wheel end inspection.',
    labor: 610, parts: 445, vendor: 1820, vendorName: 'Tri-State Brake Co.', mileage: 245930, conditionRating: 2
  },
  {
    id: 'WO-2441', assetId: 'A-1045', type: 'Repair', priority: 'Routine', status: 'In Progress',
    createdAt: offsetDays(-9), dueDate: offsetDays(5),
    description: 'Cooling system leak diagnosis; pressure test and hose replacement review.',
    labor: 540, parts: 185, vendor: 0, vendorName: '', mileage: 185400, conditionRating: 3
  },
  {
    id: 'WO-2437', assetId: 'A-1007', type: 'Repair', priority: 'Routine', status: 'Complete',
    createdAt: offsetDays(-21), dueDate: offsetDays(-14), completedAt: offsetDays(-16),
    description: 'Replace worn auxiliary lighting harness.',
    labor: 220, parts: 90, vendor: 460, vendorName: 'County Electric Shop', mileage: 8200, conditionRating: 4
  },
  {
    id: 'WO-2450', assetId: 'A-1110', type: 'Repair', priority: 'High', status: 'Open',
    createdAt: offsetDays(-2), dueDate: offsetDays(1),
    description: 'Transmission shudder at 40-50 mph; scan codes and fluid check.',
    labor: 360, parts: 49, vendor: 0, vendorName: '', mileage: 131200, conditionRating: 2
  },
  {
    id: 'WO-2449', assetId: 'A-1120', type: 'Breakdown', priority: 'Critical', status: 'In Progress',
    createdAt: offsetDays(-4), dueDate: offsetDays(-1),
    description: 'Side-loader arm hydraulic leak; unit out of service.',
    labor: 720, parts: 310, vendor: 0, vendorName: '', mileage: 96400, conditionRating: 2
  },
  {
    id: 'WO-2444', assetId: 'A-1103', type: 'Repair', priority: 'Routine', status: 'Complete',
    createdAt: offsetDays(-13), dueDate: offsetDays(-6), completedAt: offsetDays(-9),
    description: 'Front and rear brake pads and rotors.',
    labor: 300, parts: 297, vendor: 0, vendorName: '', mileage: 112900, conditionRating: 3
  },
  {
    id: 'WO-2439', assetId: 'A-1170', type: 'Inspection', priority: 'Routine', status: 'Complete',
    createdAt: offsetDays(-19), dueDate: offsetDays(-12), completedAt: offsetDays(-12),
    description: 'Vacuum pump diagnostic by OEM technician.',
    labor: 120, parts: 0, vendor: 1150, vendorName: 'Fleet Parts Express', mileage: 142300, conditionRating: 2
  }
];

let nextWoNumber = Math.max(...workOrders.map((wo) => Number(wo.id.split('-')[1]))) + 1;

// Labor hours logged per day, oldest first, ending today.
const activityData = [18, 26, 30, 22, 35, 12, 29];

// ---------------------------------------------------------------------------
// Derived values
// ---------------------------------------------------------------------------

const PRIORITY_RANK = { Critical: 0, High: 1, Routine: 2, Low: 3 };

function getAssetById(assetId) {
  return assets.find((asset) => asset.id === assetId);
}

// Adds the unit number when several assets share a model name, e.g. "Mack LR Refuse Truck #1121".
function assetName(assetId) {
  const asset = getAssetById(assetId);
  if (!asset) return assetId;
  const shared = assets.filter((other) => other.asset === asset.asset).length > 1;
  return shared ? `${asset.asset} #${asset.id.split('-')[1]}` : asset.asset;
}

function woCost(wo) {
  return wo.labor + wo.parts + wo.vendor;
}

function woStatus(wo) {
  if (wo.status !== 'Complete' && daysFromToday(wo.dueDate) < 0) return 'Overdue';
  return wo.status;
}

function isOpen(wo) {
  return wo.status !== 'Complete';
}

function getPmStatus(pm) {
  const days = daysFromToday(pm.nextDue);
  if (days < 0) return 'Overdue';
  if (days <= 14) return 'Due Soon';
  return 'Scheduled';
}

function getInventoryStatus(item) {
  if (item.onHand <= item.reorderPoint / 2) return 'Critical';
  if (item.onHand <= item.reorderPoint) return 'Low Stock';
  return 'Healthy';
}

function getConditionLabel(value) {
  return { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Excellent' }[value] || 'Unknown';
}

// Life used is whichever is further along: age or mileage.
function lifeUsed(asset) {
  const years = (TODAY - parseDate(asset.inServiceDate)) / (365.25 * 86400000);
  return Math.max(years / asset.lifeExpectancyYears, asset.currentMileage / asset.lifeExpectancyMiles);
}

const STATUS_CLASSES = {
  Overdue: 'overdue', Critical: 'overdue', Poor: 'overdue', Replace: 'overdue',
  'In Progress': 'in-progress', 'Due Soon': 'in-progress', 'Low Stock': 'in-progress', Fair: 'in-progress', High: 'in-progress', Plan: 'in-progress',
  Complete: 'complete', Healthy: 'complete', Excellent: 'complete', OK: 'complete'
};

function badge(label) {
  return `<span class="status-badge ${STATUS_CLASSES[label] || 'open'}">${escapeHtml(label)}</span>`;
}

function emptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}" class="empty-state">${message}</td></tr>`;
}

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const $ = (id) => document.getElementById(id);

const assetSearch = $('assetSearch');
const roleSelect = $('roleSelect');
const woForm = $('woForm');
const woAssetSelect = $('woAsset');
const navButtons = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');

let selectedAssetId = null;
const assetSort = { key: null, dir: 'asc' };
let highlightWoId = null;

function permissions() {
  return rolePermissions[roleSelect.value];
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function renderDashboardKpis() {
  const open = workOrders.filter(isOpen);
  const overdue = open.filter((wo) => woStatus(wo) === 'Overdue').length;
  const critical = open.filter((wo) => wo.priority === 'Critical').length;
  const pmDue = pmRecords.filter((pm) => getPmStatus(pm) !== 'Scheduled');
  const pmOverdue = pmDue.filter((pm) => getPmStatus(pm) === 'Overdue').length;
  const closedSpend = workOrders.filter((wo) => !isOpen(wo)).reduce((sum, wo) => sum + woCost(wo), 0);
  const openSpend = open.reduce((sum, wo) => sum + woCost(wo), 0);
  const departments = new Set(assets.map((asset) => asset.department)).size;

  $('kpiAssets').textContent = assets.length;
  $('kpiAssetsSub').textContent = `Demo subset across ${departments} departments`;
  $('kpiOpenWOs').textContent = open.length;
  $('kpiOpenWOsSub').textContent = `${overdue} overdue · ${critical} critical`;
  $('kpiPmDue').textContent = pmDue.length;
  $('kpiPmDueSub').textContent = `${pmOverdue} overdue`;
  $('kpiCosts').textContent = formatCurrency(closedSpend + openSpend);
  $('kpiCostsSub').textContent = `${formatCurrency(closedSpend)} closed · ${formatCurrency(openSpend)} committed`;
  $('navWoCount').textContent = open.length;
}

function renderActivityChart() {
  const max = Math.max(...activityData);
  $('activityChart').innerHTML = activityData
    .map((hours, index) => {
      const date = new Date(TODAY);
      date.setDate(date.getDate() - (activityData.length - 1 - index));
      const label = date.toLocaleDateString('en-US', { weekday: 'short' });
      return `
        <div class="bar-col" title="${label}: ${hours} labor hours">
          <span class="bar-value">${hours}</span>
          <div class="bar" style="height:${(hours / max) * 100}%"></div>
          <span class="bar-label">${label}</span>
        </div>`;
    })
    .join('');
}

function renderPriorityQueue() {
  const woItems = workOrders
    .filter((wo) => isOpen(wo) && (woStatus(wo) === 'Overdue' || PRIORITY_RANK[wo.priority] <= 1))
    .map((wo) => ({
      rank: woStatus(wo) === 'Overdue' ? 0 : PRIORITY_RANK[wo.priority] + 1,
      label: `${wo.id} · ${wo.description}`,
      assetId: wo.assetId,
      status: woStatus(wo) === 'Overdue' ? 'Overdue' : wo.priority
    }));

  const pmItems = pmRecords
    .filter((pm) => getPmStatus(pm) !== 'Scheduled')
    .map((pm) => ({
      rank: getPmStatus(pm) === 'Overdue' ? 0 : 2,
      label: `PM · ${pm.service} (${formatDate(pm.nextDue)})`,
      assetId: pm.assetId,
      status: getPmStatus(pm)
    }));

  const items = [...woItems, ...pmItems].sort((a, b) => a.rank - b.rank).slice(0, 5);

  $('priorityQueue').innerHTML = items.length
    ? items.map((item) => `
      <li class="clickable" data-asset-id="${item.assetId}">
        <div>
          <strong>${escapeHtml(assetName(item.assetId))}</strong>
          <div class="muted small">${escapeHtml(item.label)}</div>
        </div>
        ${badge(item.status)}
      </li>`).join('')
    : '<li class="empty-state">Nothing needs attention right now.</li>';
}

function renderRecentWOs() {
  const recent = [...workOrders]
    .sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))
    .slice(0, 5);

  $('recentWOs').innerHTML = recent
    .map((wo) => `
      <tr>
        <td class="mono">${wo.id}</td>
        <td>${escapeHtml(assetName(wo.assetId))}</td>
        <td>${escapeHtml(getAssetById(wo.assetId).department)}</td>
        <td>${badge(woStatus(wo))}</td>
        <td class="num">${formatCurrency(woCost(wo))}</td>
      </tr>`)
    .join('');
}

function renderAssetTable() {
  const q = assetSearch.value.trim().toLowerCase();
  const dept = $('assetDeptFilter').value;
  const filtered = assets.filter((asset) => (!dept || asset.department === dept) && (!q || [
    asset.asset, asset.assetNumber, asset.vin, asset.department, asset.location, asset.make, asset.model,
    asset.description, asset.licensePlate, asset.transponderNumber, asset.fuelCardNumber, asset.poNumber, asset.id
  ].some((value) => String(value).toLowerCase().includes(q))));

  if (assetSort.key) {
    const dir = assetSort.dir === 'asc' ? 1 : -1;
    filtered.sort((a, b) => {
      const av = a[assetSort.key];
      const bv = b[assetSort.key];
      return (typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))) * dir;
    });
  }

  document.querySelectorAll('#assetSortRow .sort-btn').forEach((button) => {
    const active = button.dataset.sort === assetSort.key;
    button.dataset.dir = active ? assetSort.dir : '';
    button.closest('th').setAttribute('aria-sort', active ? (assetSort.dir === 'asc' ? 'ascending' : 'descending') : 'none');
  });

  $('assetCount').textContent = q || dept
    ? `${filtered.length} of ${assets.length} assets`
    : `${assets.length} assets`;

  $('assetTableBody').innerHTML = filtered.length
    ? filtered.map((asset) => `
      <tr class="asset-row ${asset.id === selectedAssetId ? 'selected' : ''}" data-asset-id="${asset.id}" tabindex="0">
        <td><strong>${escapeHtml(asset.asset)}</strong><div class="muted small">${asset.assetNumber} · ${asset.licensePlate}</div></td>
        <td class="mono">${asset.vin}</td>
        <td>${escapeHtml(asset.department)}</td>
        <td class="num">${asset.currentMileage.toLocaleString()}</td>
        <td>${badge(getConditionLabel(asset.conditionRating))}</td>
        <td>${asset.fuelType}</td>
      </tr>`).join('')
    : emptyRow(6, 'No assets match these filters.');
}

function renderAssetDetail() {
  const detailEl = $('assetDetail');
  const asset = getAssetById(selectedAssetId);
  if (!asset) {
    detailEl.classList.add('hidden');
    return;
  }
  detailEl.classList.remove('hidden');

  const used = lifeUsed(asset);
  $('detailAssetName').textContent = asset.asset;
  $('detailAssetNumber').textContent = asset.assetNumber;
  $('detailVin').textContent = asset.vin;
  $('detailDepartment').textContent = asset.department;
  $('detailLocation').textContent = asset.location;
  $('detailMileage').textContent = `${asset.currentMileage.toLocaleString()} mi`;
  $('detailCondition').textContent = `${getConditionLabel(asset.conditionRating)} (${asset.conditionRating}/4)`;
  $('detailPlate').textContent = asset.licensePlate;
  $('detailFuel').textContent = asset.fuelType;
  $('detailBudget').textContent = asset.budgetCode;
  $('detailPo').textContent = asset.poNumber;
  $('detailReg').textContent = formatDate(asset.registrationExpiration);
  $('detailLife').textContent = `${Math.round(used * 100)}% (${asset.lifeExpectancyYears} yr / ${asset.lifeExpectancyMiles.toLocaleString()} mi)`;
  $('detailNotes').textContent = asset.notes;

  const assetWOs = workOrders.filter((wo) => wo.assetId === asset.id);
  $('detailWOs').innerHTML = assetWOs.length
    ? assetWOs.map((wo) => `
      <li><span><span class="mono">${wo.id}</span> · ${escapeHtml(wo.description)}</span>${badge(woStatus(wo))}</li>`).join('')
    : '<li class="empty-state">No work orders on record.</li>';

  const assetPMs = pmRecords.filter((pm) => pm.assetId === asset.id);
  $('detailPMs').innerHTML = assetPMs.length
    ? assetPMs.map((pm) => `
      <li><span>${escapeHtml(pm.service)} · ${formatDate(pm.nextDue)}</span>${badge(getPmStatus(pm))}</li>`).join('')
    : '<li class="empty-state">No PM schedule.</li>';
}

function renderWOList() {
  const perms = permissions();
  const sorted = [...workOrders].sort((a, b) => {
    if (isOpen(a) !== isOpen(b)) return isOpen(a) ? -1 : 1;
    const aOverdue = woStatus(a) === 'Overdue' ? 0 : 1;
    const bOverdue = woStatus(b) === 'Overdue' ? 0 : 1;
    return aOverdue - bOverdue || PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
  });

  $('woQueueTag').textContent = `${workOrders.filter(isOpen).length} open`;

  $('woList').innerHTML = sorted
    .map((wo) => {
      const actions = [];
      if (perms.canStartWO && wo.status === 'Open') actions.push(`<button class="mini-btn" data-action="start" data-wo-id="${wo.id}">Start work</button>`);
      if (perms.canCloseWO && isOpen(wo)) actions.push(`<button class="mini-btn primary" data-action="close" data-wo-id="${wo.id}">Close</button>`);
      if (!perms.canCloseWO && perms.canStartWO && isOpen(wo)) actions.push('<span class="muted small">Supervisor closes</span>');
      const due = isOpen(wo) ? `Due ${formatDate(wo.dueDate)}` : `Closed ${formatDate(wo.completedAt)}`;
      return `
      <li class="${wo.id === highlightWoId ? 'flash' : ''} ${isOpen(wo) ? '' : 'is-complete'}">
        <div class="wo-head">
          <span><span class="wo-number">${wo.id}</span> <span class="muted small">${wo.type} · ${wo.priority}</span></span>
          ${badge(woStatus(wo))}
        </div>
        <div><strong>${escapeHtml(assetName(wo.assetId))}</strong></div>
        <div class="muted">${escapeHtml(wo.description)}</div>
        <div class="wo-foot">
          <span class="small muted">${due} · ${formatCurrency(woCost(wo))}${wo.vendorName ? ` · ${escapeHtml(wo.vendorName)}` : ''}</span>
          <span class="wo-actions">${actions.join('')}</span>
        </div>
      </li>`;
    })
    .join('');
}

function renderInventoryTable() {
  const below = inventory.filter((item) => getInventoryStatus(item) !== 'Healthy').length;
  $('inventoryTag').textContent = below ? `${below} below reorder point` : 'All stocked';

  $('inventoryTableBody').innerHTML = inventory
    .map((item) => `
      <tr>
        <td>${escapeHtml(item.part)}</td>
        <td>${item.location}</td>
        <td class="num">${item.onHand}</td>
        <td class="num">${item.reorderPoint}</td>
        <td class="num">${formatCurrency(item.unitCost)}</td>
        <td class="num">${formatCurrency(item.onHand * item.unitCost)}</td>
        <td>${badge(getInventoryStatus(item))}</td>
      </tr>`)
    .join('');
}

function renderPmTable() {
  const ranked = [...pmRecords].sort((a, b) => parseDate(a.nextDue) - parseDate(b.nextDue));

  $('pmTableBody').innerHTML = ranked
    .map((pm) => {
      const days = daysFromToday(pm.nextDue);
      const relative = days < 0 ? `${-days} days late` : days === 0 ? 'today' : `in ${days} days`;
      return `
      <tr>
        <td>${escapeHtml(assetName(pm.assetId))}</td>
        <td>${escapeHtml(pm.service)}</td>
        <td>${formatDate(pm.nextDue)} <span class="muted small">(${relative})</span></td>
        <td>Every ${pm.intervalMonths} mo</td>
        <td>${badge(getPmStatus(pm))}</td>
      </tr>`;
    })
    .join('');

  $('pmPriorityList').innerHTML = ranked
    .slice(0, 4)
    .map((pm) => `
      <li>
        <span>${escapeHtml(assetName(pm.assetId))}<div class="muted small">${escapeHtml(pm.service)}</div></span>
        ${badge(getPmStatus(pm))}
      </li>`)
    .join('');
}

function renderCostReports() {
  const byDept = {};
  const byVendor = {};

  workOrders.forEach((wo) => {
    const dept = getAssetById(wo.assetId).department;
    byDept[dept] ??= { labor: 0, parts: 0, vendor: 0 };
    byDept[dept].labor += wo.labor;
    byDept[dept].parts += wo.parts;
    byDept[dept].vendor += wo.vendor;

    if (wo.vendorName && wo.vendor > 0) {
      byVendor[wo.vendorName] ??= { jobs: 0, cost: 0 };
      byVendor[wo.vendorName].jobs += 1;
      byVendor[wo.vendorName].cost += wo.vendor;
    }
  });

  const deptRows = Object.entries(byDept)
    .map(([dept, v]) => ({ dept, ...v, total: v.labor + v.parts + v.vendor }))
    .sort((a, b) => b.total - a.total);

  $('deptCostTable').innerHTML = deptRows.length
    ? deptRows.map((row) => `
      <tr>
        <td>${escapeHtml(row.dept)}</td>
        <td class="num">${formatCurrency(row.labor)}</td>
        <td class="num">${formatCurrency(row.parts)}</td>
        <td class="num">${formatCurrency(row.vendor)}</td>
        <td class="num"><strong>${formatCurrency(row.total)}</strong></td>
      </tr>`).join('')
    : emptyRow(5, 'No work order costs yet.');

  const vendorRows = Object.entries(byVendor).sort((a, b) => b[1].cost - a[1].cost);
  $('vendorCostTable').innerHTML = vendorRows.length
    ? vendorRows.map(([vendor, v]) => `
      <tr>
        <td>${escapeHtml(vendor)}</td>
        <td class="num">${v.jobs}</td>
        <td class="num">${formatCurrency(v.cost)}</td>
      </tr>`).join('')
    : emptyRow(3, 'No outside vendor work yet.');
}

function renderLifeExpectancy() {
  $('lifeExpectancyList').innerHTML = [...assets]
    .map((asset) => ({ asset, used: lifeUsed(asset) }))
    .sort((a, b) => b.used - a.used)
    .slice(0, 8)
    .map(({ asset, used }) => {
      const pct = Math.round(used * 100);
      const label = used >= 1 ? 'Replace' : used >= 0.75 ? 'Plan' : 'OK';
      return `
      <li>
        <div class="life-head">
          <span>${escapeHtml(assetName(asset.id))}</span>
          <span><strong>${pct}%</strong> ${badge(label)}</span>
        </div>
        <div class="life-track"><div class="life-fill ${STATUS_CLASSES[label]}" style="width:${Math.min(pct, 100)}%"></div></div>
      </li>`;
    })
    .join('');
}

function renderAll() {
  renderDashboardKpis();
  renderActivityChart();
  renderPriorityQueue();
  renderRecentWOs();
  renderAssetTable();
  renderAssetDetail();
  renderWOList();
  renderInventoryTable();
  renderPmTable();
  renderCostReports();
  renderLifeExpectancy();
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

let toastTimer;
function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

function showView(viewId) {
  views.forEach((view) => view.classList.toggle('active', view.id === viewId));
  navButtons.forEach((button) => button.classList.toggle('active', button.dataset.view === viewId));
  const active = [...navButtons].find((button) => button.dataset.view === viewId);
  $('viewTitle').textContent = active.firstChild.textContent.trim();
  history.replaceState(null, '', `#/${viewId}`);
}

function openAsset(assetId) {
  selectedAssetId = assetId;
  showView('assets');
  renderAssetTable();
  renderAssetDetail();
  $('assetDetail').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function startWorkOrder(woId) {
  const wo = workOrders.find((item) => item.id === woId);
  if (!wo || !permissions().canStartWO) return;
  wo.status = 'In Progress';
  renderAll();
  showToast(`${wo.id} is now in progress.`);
}

function closeWorkOrder(woId) {
  const wo = workOrders.find((item) => item.id === woId);
  if (!wo || !permissions().canCloseWO) return;

  wo.status = 'Complete';
  wo.completedAt = toISODate(TODAY);

  const asset = getAssetById(wo.assetId);
  asset.currentMileage = Math.max(asset.currentMileage, wo.mileage);
  asset.conditionRating = wo.conditionRating;
  asset.notes = `${asset.notes} ${wo.id} closed ${formatDate(wo.completedAt)}.`;

  let message = `${wo.id} closed. ${asset.asset} updated.`;
  const pm = pmRecords.find((record) => record.id === wo.pmId);
  if (pm) {
    pm.nextDue = addMonths(pm.intervalMonths);
    message += ` Next ${pm.service} scheduled for ${formatDate(pm.nextDue)}.`;
  }

  renderAll();
  showToast(message);
}

function applyRolePermissions() {
  const perms = permissions();
  const createButton = woForm.querySelector('button[type="submit"]');
  createButton.disabled = !perms.canCreateWO;
  createButton.textContent = perms.canCreateWO ? 'Create Work Order' : 'View Only Access';
  woForm.querySelectorAll('input, select, textarea').forEach((field) => { field.disabled = !perms.canCreateWO; });
  $('roleBanner').classList.toggle('hidden', perms.canCreateWO);
  $('roleHint').textContent = perms.hint;
  renderWOList();
}

function updateFormTotal() {
  const total = ['woLabor', 'woParts', 'woVendor'].reduce((sum, id) => sum + (Number($(id).value) || 0), 0);
  $('woTotal').textContent = formatCurrency(total);
}

function syncMileageToAsset() {
  const asset = getAssetById(woAssetSelect.value);
  if (asset) $('woMileage').value = asset.currentMileage;
}

function handleCreateWorkOrder(event) {
  event.preventDefault();
  if (!permissions().canCreateWO) return;

  const asset = getAssetById(woAssetSelect.value);
  if (!asset) {
    showToast('Please select a valid asset.');
    return;
  }

  const type = $('woType').value;
  const priority = $('woPriority').value;
  const dueInDays = { Critical: 1, High: 3, Routine: 7, Low: 14 }[priority];

  const newWO = {
    id: `WO-${nextWoNumber++}`,
    assetId: asset.id,
    type,
    priority,
    status: 'Open',
    createdAt: toISODate(TODAY),
    dueDate: offsetDays(dueInDays),
    description: $('woDescription').value.trim() || type,
    labor: Number($('woLabor').value) || 0,
    parts: Number($('woParts').value) || 0,
    vendor: Number($('woVendor').value) || 0,
    vendorName: $('woVendorName').value,
    mileage: Number($('woMileage').value) || asset.currentMileage,
    conditionRating: Number($('woCondition').value) || asset.conditionRating
  };

  // A PM Service work order is tied to the asset's soonest PM so closing it reschedules that PM.
  if (type === 'PM Service') {
    const pm = pmRecords
      .filter((record) => record.assetId === asset.id)
      .sort((a, b) => parseDate(a.nextDue) - parseDate(b.nextDue))[0];
    if (pm) newWO.pmId = pm.id;
  }

  workOrders.unshift(newWO);
  asset.currentMileage = Math.max(asset.currentMileage, newWO.mileage);

  highlightWoId = newWO.id;
  renderAll();
  highlightWoId = null;
  showToast(`${newWO.id} created for ${asset.asset} · ${formatCurrency(woCost(newWO))}, due ${formatDate(newWO.dueDate)}.`);

  woForm.reset();
  syncMileageToAsset();
  updateFormTotal();
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------

navButtons.forEach((button) => button.addEventListener('click', () => showView(button.dataset.view)));
roleSelect.addEventListener('change', applyRolePermissions);
assetSearch.addEventListener('input', renderAssetTable);
$('assetDeptFilter').addEventListener('change', renderAssetTable);
$('resetDemoBtn').addEventListener('click', () => location.reload());

// Click a column header: ascending, then descending, then back to default order.
$('assetSortRow').addEventListener('click', (event) => {
  const button = event.target.closest('.sort-btn');
  if (!button) return;
  const key = button.dataset.sort;
  if (assetSort.key !== key) Object.assign(assetSort, { key, dir: 'asc' });
  else if (assetSort.dir === 'asc') assetSort.dir = 'desc';
  else Object.assign(assetSort, { key: null, dir: 'asc' });
  renderAssetTable();
});

$('detailCloseBtn').addEventListener('click', () => {
  selectedAssetId = null;
  renderAssetTable();
  renderAssetDetail();
});

$('assetTableBody').addEventListener('click', (event) => {
  const row = event.target.closest('.asset-row');
  if (row) openAsset(row.dataset.assetId);
});

$('assetTableBody').addEventListener('keydown', (event) => {
  const row = event.target.closest('.asset-row');
  if (row && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openAsset(row.dataset.assetId);
  }
});

$('priorityQueue').addEventListener('click', (event) => {
  const item = event.target.closest('[data-asset-id]');
  if (item) openAsset(item.dataset.assetId);
});

$('woList').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  if (button.dataset.action === 'start') startWorkOrder(button.dataset.woId);
  if (button.dataset.action === 'close') closeWorkOrder(button.dataset.woId);
});

woAssetSelect.addEventListener('change', syncMileageToAsset);
['woLabor', 'woParts', 'woVendor'].forEach((id) => $(id).addEventListener('input', updateFormTotal));
woForm.addEventListener('submit', handleCreateWorkOrder);

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

woAssetSelect.innerHTML = assets
  .map((asset) => `<option value="${asset.id}">${escapeHtml(assetName(asset.id))} (${escapeHtml(asset.department)})</option>`)
  .join('');
$('assetDeptFilter').insertAdjacentHTML('beforeend', [...new Set(assets.map((asset) => asset.department))]
  .sort()
  .map((dept) => `<option>${escapeHtml(dept)}</option>`)
  .join(''));
$('woVendorName').insertAdjacentHTML('beforeend', vendors.map((v) => `<option>${escapeHtml(v)}</option>`).join(''));
$('todayPill').textContent = TODAY.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

// Browsers restore form values on reload; start every session from a clean state.
woForm.reset();
roleSelect.value = 'supervisor';
assetSearch.value = '';
$('assetDeptFilter').value = '';

syncMileageToAsset();
updateFormTotal();
renderAll();
applyRolePermissions();

const initialView = location.hash.replace(/^#\/?/, '');
if (document.getElementById(initialView)?.classList.contains('view')) showView(initialView);
