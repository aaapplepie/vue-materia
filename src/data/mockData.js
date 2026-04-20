// ── 스펙 한계값 ────────────────────────────────────────────────────────────────
export const SPEC = {
  toc:          { max: 1.0,  unit: 'ppb',    label: 'TOC' },
  resistivity:  { min: 18.0, unit: 'MΩ·cm',  label: '저항' },
  particles:    { max: 5,    unit: '/mL',     label: '입자수' },
};

// ── 월별 트렌드 (12개월) ──────────────────────────────────────────────────────
export const MONTHS = ['5월','6월','7월','8월','9월','10월','11월','12월','1월','2월','3월','4월'];

export const resistivityTrend = MONTHS.map((month, i) => ({
  month,
  REF:  [17.8, 18.0, 18.1, 17.9, 18.2, 18.3, 18.1, 18.0, 18.2, 18.1, 18.3, 18.2][i],
  COMP: [17.5, 17.7, 17.9, 17.6, 18.0, 17.8, 17.6, 17.9, 18.0, 17.8, 17.9, 18.0][i],
  spec: 18.0,
}));

export const tocTrend = MONTHS.map((month, i) => ({
  month,
  REF:  [0.4, 0.5, 0.3, 0.6, 0.4, 0.3, 0.5, 0.4, 0.3, 0.4, 0.5, 0.5][i],
  COMP: [0.7, 0.9, 1.1, 0.8, 1.2, 0.9, 1.0, 1.3, 0.8, 0.9, 1.1, 1.0][i],
  spec: 1.0,
}));

export const yieldTrend = MONTHS.map((month, i) => ({
  month,
  REF:  [95, 96, 97, 94, 97, 96, 97, 96, 97, 97, 96, 97][i],
  COMP: [91, 92, 93, 90, 94, 92, 91, 93, 94, 92, 93, 93][i],
}));

export const contaminationByArea = [
  { area: 'Etch',   REF: 3,  COMP: 5  },
  { area: 'CMP',    REF: 8,  COMP: 6  },
  { area: '세정',   REF: 2,  COMP: 4  },
  { area: '린스',   REF: 1,  COMP: 3  },
  { area: '확산',   REF: 5,  COMP: 7  },
  { area: '포토',   REF: 4,  COMP: 2  },
];

// ── KPI 요약 ──────────────────────────────────────────────────────────────────
export const KPI = {
  lots:           { label: '처리 Lot 수',         unit: '',        icon: 'inventory_2',  REF: 642,   COMP: 587,   higherIsBetter: true  },
  resistivity:    { label: '평균 저항 (MΩ·cm)',   unit: 'MΩ·cm',   icon: 'electric_bolt', REF: 18.2,  COMP: 17.9,  higherIsBetter: true  },
  contamEvents:   { label: '오염 이벤트',         unit: '건',      icon: 'warning_amber', REF: 23,    COMP: 37,    higherIsBetter: false },
  upwConsumption: { label: 'UPW 사용량',          unit: 'L/일',    icon: 'water_drop',    REF: 22640, COMP: 22590, higherIsBetter: false },
};

// ── Lot 추적 데이터 (20건) ────────────────────────────────────────────────────
export const lots = [
  { id:'REF-0451', line:'REF',  stage:'Pre-Etch 린스',    waterType:'UPW', toc:0.3, resistivity:18.2, particles:2,  status:'Pass',   timestamp:'04-20 08:12' },
  { id:'CMP-0451', line:'COMP', stage:'Pre-Etch 린스',    waterType:'UPW', toc:0.7, resistivity:17.9, particles:4,  status:'Pass',   timestamp:'04-20 08:15' },
  { id:'REF-0452', line:'REF',  stage:'CMP 세정',         waterType:'UPW', toc:0.8, resistivity:18.1, particles:3,  status:'Pass',   timestamp:'04-20 08:35' },
  { id:'CMP-0452', line:'COMP', stage:'CMP 세정',         waterType:'UPW', toc:1.2, resistivity:17.7, particles:6,  status:'Fail',   timestamp:'04-20 08:38' },
  { id:'REF-0453', line:'REF',  stage:'확산 린스',        waterType:'DIW', toc:0.5, resistivity:18.0, particles:4,  status:'Pass',   timestamp:'04-20 09:01' },
  { id:'CMP-0453', line:'COMP', stage:'확산 린스',        waterType:'DIW', toc:1.4, resistivity:17.6, particles:7,  status:'Fail',   timestamp:'04-20 09:04' },
  { id:'REF-0454', line:'REF',  stage:'포토 Pre-Soak',    waterType:'UPW', toc:0.2, resistivity:18.3, particles:1,  status:'Pass',   timestamp:'04-20 09:18' },
  { id:'CMP-0454', line:'COMP', stage:'포토 Pre-Soak',    waterType:'UPW', toc:0.9, resistivity:18.0, particles:5,  status:'Pass',   timestamp:'04-20 09:21' },
  { id:'REF-0455', line:'REF',  stage:'습식 세정',        waterType:'UPW', toc:0.5, resistivity:18.2, particles:4,  status:'Pass',   timestamp:'04-20 09:44' },
  { id:'CMP-0455', line:'COMP', stage:'습식 세정',        waterType:'UPW', toc:1.1, resistivity:17.8, particles:6,  status:'Fail',   timestamp:'04-20 09:47' },
  { id:'REF-0456', line:'REF',  stage:'Post-Etch 린스',   waterType:'DIW', toc:0.6, resistivity:18.1, particles:3,  status:'Pass',   timestamp:'04-20 10:02' },
  { id:'CMP-0456', line:'COMP', stage:'Post-Etch 린스',   waterType:'DIW', toc:2.1, resistivity:17.4, particles:11, status:'Fail',   timestamp:'04-20 10:05' },
  { id:'REF-0457', line:'REF',  stage:'CMP 슬러리 린스',  waterType:'UPW', toc:0.4, resistivity:18.1, particles:3,  status:'Pass',   timestamp:'04-20 10:21' },
  { id:'CMP-0457', line:'COMP', stage:'CMP 슬러리 린스',  waterType:'UPW', toc:0.8, resistivity:17.9, particles:5,  status:'Pass',   timestamp:'04-20 10:24' },
  { id:'REF-0458', line:'REF',  stage:'스핀 린스 건조',   waterType:'UPW', toc:0.3, resistivity:18.3, particles:2,  status:'Pass',   timestamp:'04-20 10:48' },
  { id:'CMP-0458', line:'COMP', stage:'스핀 린스 건조',   waterType:'UPW', toc:1.0, resistivity:18.0, particles:5,  status:'Pass',   timestamp:'04-20 10:51' },
  { id:'REF-0459', line:'REF',  stage:'이온주입 전 세정', waterType:'UPW', toc:0.6, resistivity:18.0, particles:5,  status:'진행중', timestamp:'04-20 11:05' },
  { id:'CMP-0459', line:'COMP', stage:'이온주입 전 세정', waterType:'UPW', toc:0.9, resistivity:17.8, particles:4,  status:'진행중', timestamp:'04-20 11:08' },
  { id:'REF-0460', line:'REF',  stage:'산화막 성장 준비', waterType:'UPW', toc:0.4, resistivity:18.2, particles:2,  status:'진행중', timestamp:'04-20 11:20' },
  { id:'CMP-0460', line:'COMP', stage:'산화막 성장 준비', waterType:'UPW', toc:1.3, resistivity:17.7, particles:7,  status:'Fail',   timestamp:'04-20 11:23' },
];

// ── 알람 이벤트 ───────────────────────────────────────────────────────────────
export const alerts = [
  { line:'COMP', severity:'error',   title:'TOC 초과 — CMP-0456',    detail:'TOC 2.1 ppb (한계: 1.0) — Post-Etch 린스',   time:'10:05' },
  { line:'COMP', severity:'error',   title:'저항 미달 — CMP-0453',   detail:'17.6 MΩ·cm (최소: 18.0) — 확산 린스',        time:'09:04' },
  { line:'COMP', severity:'warning', title:'입자수 초과 — CMP-0452', detail:'6 /mL (한계: 5) — CMP 세정',                  time:'08:38' },
  { line:'COMP', severity:'warning', title:'TOC 급등 — CMP-0455',    detail:'TOC 1.1 ppb — 습식 세정, 4분 후 회복',        time:'09:47' },
  { line:'COMP', severity:'error',   title:'TOC 초과 — CMP-0460',    detail:'TOC 1.3 ppb (한계: 1.0) — 산화막 준비',       time:'11:23' },
  { line:'REF',  severity:'info',    title:'폴리셔 재생 완료',        detail:'Loop-1 이온교환수지 재생 정상 완료',           time:'07:30' },
  { line:'REF',  severity:'success', title:'필터 무결성 검사 통과',   detail:'0.2 µm POU 필터 버블포인트 정상',              time:'06:00' },
  { line:'REF',  severity:'info',    title:'UPW 루프 유량 정상',      detail:'Loop-1/2 유량 설계값 ±2% 이내',               time:'05:00' },
];
