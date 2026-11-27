"use strict";

// HYPERTROPHY.OS — Module 1/3 : Données, Constantes & Grilles Matérielles

/* ========================================================================
   1. PWA MANIFEST & CORE CONSTANTS (v0.5.1)
   ======================================================================== */
const APP_VERSION = "0.5.1";
const DB_NAME = "HypertrophyDB";
const DB_VERSION = 1;
const STORE_NAME = "AppStateStore";
const ROOT_KEY = "main_state";

try {
  const manifest = {
    name: "HYPERTROPHY.OS",
    short_name: "HYPERTROPHY",
    version: APP_VERSION,
    start_url: "./",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait"
  };
  const blob = new Blob([JSON.stringify(manifest)], { type: "application/manifest+json" });
  const link = document.createElement("link");
  link.rel = "manifest";
  link.href = URL.createObjectURL(blob);
  document.head.appendChild(link);
} catch (_) { /* Safe fallback in sandboxed previews */ }

/* ========================================================================
   2. EXACT DISCRETE EQUIPMENT GRIDS & HARDWARE HINTS
   ======================================================================== */
const EQUIPMENT_GRIDS = (function buildGrids() {
  const uniqSort = (arr) => Array.from(new Set(arr)).sort((a, b) => a - b);

  // Matrix Chestpress: 4.5 + 7*n + (0 | 2.3 | 4.6) for n=0..15
  const matrix_chest = [];
  for (let n = 0; n <= 15; n++) {
    [0, 2.3, 4.6].forEach(add => {
      matrix_chest.push(Math.round((4.5 + 7 * n + add) * 10) / 10);
    });
  }

  // Matrix Shoulderpress: 4.5*n + (0 | 2.3) for n=1..20
  const matrix_shoulder = [];
  for (let n = 1; n <= 20; n++) {
    [0, 2.3].forEach(add => {
      matrix_shoulder.push(Math.round((4.5 * n + add) * 10) / 10);
    });
  }

  // Technogym Lat Pulldown: 5*n for n=1..25
  const technogym_5 = [];
  for (let n = 1; n <= 25; n++) technogym_5.push(5 * n);

  // Matrix Aura G3-MSFT400 single pulley: 1.13 + 2.27*n for n=0..25
  const matrix_cable_1 = [];
  for (let n = 0; n <= 25; n++) {
    matrix_cable_1.push(Math.round((1.13 + 2.27 * n) * 100) / 100);
  }

  // Landmine + Olympic bar: 5*n for n=1..30
  const landmine_5 = [];
  for (let n = 1; n <= 30; n++) landmine_5.push(5 * n);

  return {
    matrix_chest:    uniqSort(matrix_chest),
    matrix_shoulder: uniqSort(matrix_shoulder),
    technogym_5:     uniqSort(technogym_5),
    matrix_cable_1:  uniqSort(matrix_cable_1),
    landmine_5:      uniqSort(landmine_5),
    pdc_kb10:        [0, 10, 20],
    iso_kb10:        [10]
  };
})();

function snapToEquipment(equipKey, targetKg, dir) {
  const mode = dir || "nearest";
  const grid = EQUIPMENT_GRIDS[equipKey];
  if (!grid || !grid.length) return Math.max(0, Math.round((Number(targetKg) || 0) * 10) / 10);
  const val = Number(targetKg) || 0;
  if (mode === "up") {
    const found = grid.find(g => g > val + 0.001);
    return found !== undefined ? found : grid[grid.length - 1];
  }
  if (mode === "down") {
    let res = grid[0];
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] < val - 0.001) res = grid[i];
    }
    return res;
  }
  let best = grid[0];
  let bestDiff = Math.abs(grid[0] - val);
  for (let i = 1; i < grid.length; i++) {
    const diff = Math.abs(grid[i] - val);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = grid[i];
    }
  }
  return best;
}

function stepEquipment(equipKey, currentKg, delta) {
  const grid = EQUIPMENT_GRIDS[equipKey];
  if (!grid || !grid.length) return Math.max(0, (Number(currentKg) || 0) + (delta >= 0 ? 2.5 : -2.5));
  const snapped = snapToEquipment(equipKey, currentKg, "nearest");
  const idx = grid.indexOf(snapped);
  const nextIdx = Math.max(0, Math.min(grid.length - 1, idx + (delta >= 0 ? 1 : -1)));
  return grid[nextIdx];
}

// Readable weight rounded to 0.1 kg with French comma (e.g. "62,8", "12,5", "60")
function formatKgFR(val) {
  const rounded = Math.round((Number(val) || 0) * 10) / 10;
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(1).replace(".", ",");
}

function formatStepperWeight(equipKey, val) {
  const num = Number(val) || 0;
  if (equipKey === "pdc_kb10" && num === 0) return "PDC";
  return formatKgFR(num);
}

// Dynamic hardware plate/add-on micro-badge below weight stepper
function getHardwareHint(equipKey, weight) {
  const w = snapToEquipment(equipKey, weight, "nearest");

  if (equipKey === "matrix_chest") {
    let best = { n: 0, add: 0, diff: 999 };
    for (let n = 0; n <= 15; n++) {
      const base = 4.5 + 7 * n;
      [0, 2.3, 4.6].forEach(add => {
        const diff = Math.abs((base + add) - w);
        if (diff < best.diff) best = { n, add, diff, base };
      });
    }
    const baseStr = formatKgFR(best.base);
    if (best.add === 0) return baseStr;
    return `${baseStr} + ${formatKgFR(best.add)}`;
  }

  if (equipKey === "matrix_shoulder") {
    let best = { n: 1, add: 0, diff: 999, base: 4.5 };
    for (let n = 1; n <= 20; n++) {
      const base = 4.5 * n;
      [0, 2.3].forEach(add => {
        const diff = Math.abs((base + add) - w);
        if (diff < best.diff) best = { n, add, diff, base };
      });
    }
    const baseStr = formatKgFR(best.base);
    if (best.add === 0) return baseStr;
    return `${baseStr} + 2,3`;
  }

  if (equipKey === "matrix_cable_1") {
    const idx = Math.max(1, Math.min(26, Math.round((w - 1.13) / 2.27) + 1));
    return `Plaque #${idx}`;
  }

  if (equipKey === "pdc_kb10") {
    if (w <= 0) return "Poids du corps";
    if (w <= 10) return "1 KB 10 kg";
    return "2 KB 10 kg";
  }

  return "";
}

/* ========================================================================
   3. CLINICAL SLIDER SCALES (RPE 1-10 & SI PAIN 0-10)
   ======================================================================== */
const RPE_SCALE = {
  1:  { label: "Aucun effort",               color: "#30D158" },
  2:  { label: "Très facile",                color: "#30D158" },
  3:  { label: "Facile",                     color: "#30D158" },
  4:  { label: "Effort léger",               color: "#30D158" },
  5:  { label: "Effort modéré",              color: "#FFD60A" },
  6:  { label: "Effort soutenu",             color: "#FFD60A" },
  7:  { label: "Dur — Optimal",              color: "#FF9F0A" },
  8:  { label: "Très dur",                   color: "#FF9F0A" },
  9:  { label: "Limite — Alerte SNC",        color: "#FF453A" },
  10: { label: "Échec absolu — Alerte SNC",  color: "#FF453A" }
};

const SI_SCALE = {
  0:  { label: "Aucune douleur",                             color: "#30D158" },
  1:  { label: "Gêne minime",                                color: "#30D158" },
  2:  { label: "Raideur légère",                             color: "#FFD60A" },
  3:  { label: "Inconfort notable — Vigilance",              color: "#FF9F0A" },
  4:  { label: "Douleur modérée — Coupe-circuit SI (-15%)",  color: "#FF453A" },
  5:  { label: "Douleur franche — Coupe-circuit SI (-15%)",  color: "#FF453A" },
  6:  { label: "Douleur forte — Coupe-circuit SI (-15%)",    color: "#FF453A" },
  7:  { label: "Douleur intense — Coupe-circuit SI (-15%)",  color: "#FF453A" },
  8:  { label: "Douleur sévère — Coupe-circuit SI (-15%)",   color: "#FF453A" },
  9:  { label: "Douleur critique — Arrêt recommandé",        color: "#FF453A" },
  10: { label: "Douleur insupportable — Arrêt immédiat",     color: "#FF453A" }
};

function hexToSoftBg(hex) {
  if (hex === "#30D158") return "rgba(48,209,88,0.18)";
  if (hex === "#FFD60A") return "rgba(255,214,10,0.18)";
  if (hex === "#FF9F0A") return "rgba(255,159,10,0.20)";
  return "rgba(255,69,58,0.22)";
}

/* ========================================================================
   4. MUSCLE GROUPS, EXERCISES & WORKOUTS (CLEAN MACHINE NAMES)
   ======================================================================== */
const MUSCLE_GROUPS = {
  // FACE column (4 cards)
  Pectoraux:          { id: "Pectoraux",        side: "face", targetSets: 8,  refEx: "ua_chest" },
  "Épaules":          { id: "Épaules",          side: "face", targetSets: 14, refEx: "ub_sh_press" },
  Bras:               { id: "Bras",             side: "face", targetSets: 7,  refEx: "ub_curl" },
  Quadriceps:         { id: "Quadriceps",       side: "face", targetSets: 8,  refEx: "la_goblet" },
  // DOS column (3 cards)
  Dos:                { id: "Dos",              side: "dos",  targetSets: 11, refEx: "ua_lat_tri" },
  "Ischios/Fessiers": { id: "Ischios/Fessiers", side: "dos",  targetSets: 8,  refEx: "lb_rdl" },
  Tronc:              { id: "Tronc",            side: "dos",  targetSets: 6,  refEx: "la_pallof" }
};

const EXERCISES = {
  // UPPER A (18 sets)
  ua_chest: {
    id: "ua_chest", name: "Chestpress poulie Matrix (banc plat)", shortName: "Chestpress Matrix",
    muscle: "Pectoraux", equipment: "Matrix Chestpress (banc plat)", equip: "matrix_chest",
    sets: 4, minReps: 8, maxReps: 10, defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Omoplates rétractées et plaquées au banc plat, coudes à 45°, trajectoire convergente contrôlée.",
    svgType: "chestpress"
  },
  ua_lat_tri: {
    id: "ua_lat_tri", name: "Tirage vertical Technogym (triangles neutres)", shortName: "Tirage Triangles",
    muscle: "Dos", equipment: "Technogym Tirage Vertical", equip: "technogym_5",
    sets: 4, minReps: 8, maxReps: 12, defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Poitrine sortie, coudes tirés vers les hanches, zéro balancier lombaire.",
    svgType: "latpull"
  },
  ua_lm_press: {
    id: "ua_lm_press", name: "Landmine Press unilatéral à genoux", shortName: "LM Press À Genoux",
    muscle: "Épaules", equipment: "Landmine + Barre", equip: "landmine_5",
    sets: 3, minReps: 8, maxReps: 12, unitLabel: "/bras", defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Half-Kneeling obligatoire : fessier du genou au sol contracté pour verrouiller le bassin et annuler la lordose.",
    svgType: "landmine_press"
  },
  ua_lat_wide: {
    id: "ua_lat_wide", name: "Tirage vertical barre arquée large", shortName: "Tirage Large",
    muscle: "Dos", equipment: "Technogym Tirage Vertical", equip: "technogym_5",
    sets: 3, minReps: 10, maxReps: 12, defaultRir: 2, type: "weighted", siSensitive: false, main: false,
    cue: "Étirement complet en haut, abaissement scapulaire puis coudes vers les hanches.",
    svgType: "latpull"
  },
  ua_tri: {
    id: "ua_tri", name: "Extension Triceps Overhead poulie corde", shortName: "Triceps Overhead",
    muscle: "Bras", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 4, minReps: 10, maxReps: 15, defaultRir: 2, type: "weighted", siSensitive: false, main: false,
    cue: "Dos à la poulie haute, buste légèrement penché, étirement maximal du chef long du triceps.",
    svgType: "overhead_tri"
  },
  // LOWER A (11 sets)
  la_goblet: {
    id: "la_goblet", name: "Landmine Goblet Squat (tempo 3s)", shortName: "LM Goblet Squat",
    muscle: "Quadriceps", equipment: "Landmine + Barre", equip: "landmine_5",
    sets: 4, minReps: 8, maxReps: 12, defaultRir: 2, type: "weighted", siSensitive: true, main: true,
    cue: "Charge antérieure contre le sternum, descente contrôlée 3s, zéro rétroversion pelvienne en bas.",
    svgType: "goblet"
  },
  la_split: {
    id: "la_split", name: "Split Squat statique", shortName: "Split Squat Stat.",
    muscle: "Quadriceps", equipment: "Poids du corps / Kettlebell", equip: "pdc_kb10",
    sets: 4, minReps: 10, maxReps: 15, unitLabel: "/jambe", defaultRir: 2, type: "bodyweight_kb", siSensitive: true, main: true,
    cue: "Pieds fixes au sol (supprime le cisaillement SI). Progresser 10→15 reps puis ajouter 1 Kettlebell.",
    svgType: "lunge"
  },
  la_pallof: {
    id: "la_pallof", name: "Pallof Press à la poulie", shortName: "Pallof Press",
    muscle: "Tronc", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 3, minReps: 20, maxReps: 30, stepDur: 5, unitLabel: "s/côté", defaultRir: 2, type: "isometric", siSensitive: false, main: false,
    cue: "Anti-rotation stricte devant le sternum. Progression en durée (20s→30s) avant d'augmenter la charge.",
    svgType: "pallof"
  },
  // UPPER B (22 sets)
  ub_sh_press: {
    id: "ub_sh_press", name: "Shoulderpress poulie Matrix", shortName: "Shoulderpress",
    muscle: "Épaules", equipment: "Matrix Shoulderpress", equip: "matrix_shoulder",
    sets: 4, minReps: 8, maxReps: 10, defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Dos et lombaires intégralement plaqués au dossier calé, poussée verticale fluide.",
    svgType: "shoulderpress"
  },
  ub_lm_row: {
    id: "ub_lm_row", name: "Landmine Row unilatéral appui banc", shortName: "Landmine Row",
    muscle: "Dos", equipment: "Landmine + Barre", equip: "landmine_5",
    sets: 4, minReps: 8, maxReps: 12, unitLabel: "/côté", defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Main libre verrouillée sur le banc : colonne neutre déchargée, tirage coude vers la hanche.",
    svgType: "landmine_row"
  },
  ub_fly: {
    id: "ub_fly", name: "Écarté incliné 30° poulies basses", shortName: "Écarté Incliné 30°",
    muscle: "Pectoraux", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 4, minReps: 10, maxReps: 12, defaultRir: 2, type: "weighted", siSensitive: false, main: true,
    cue: "Banc incliné 30° centré entre les deux poulies basses, étirement pectoral contrôlé (charge par bras).",
    svgType: "incline_fly"
  },
  ub_facepull: {
    id: "ub_facepull", name: "Facepull poulie haute corde", shortName: "Facepull Corde",
    muscle: "Épaules", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 4, minReps: 12, maxReps: 15, defaultRir: 2, type: "weighted", siSensitive: false, main: false,
    cue: "Tirage vers le front avec rotation externe en fin de course pour deltoïde postérieur et coiffe.",
    svgType: "facepull"
  },
  ub_lat_raise: {
    id: "ub_lat_raise", name: "Élévations latérales poulie basse derrière le dos", shortName: "Élév. Latérales",
    muscle: "Épaules", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 3, minReps: 12, maxReps: 15, unitLabel: "/côté", defaultRir: 2, type: "weighted", siSensitive: false, main: false,
    cue: "Câble passant derrière le dos : tension maximale à l'étirement dans le plan scapulaire (30°).",
    svgType: "lat_raise"
  },
  ub_curl: {
    id: "ub_curl", name: "Curl Biceps poulie basse (dos à la poulie)", shortName: "Curl Biceps Étiré",
    muscle: "Bras", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 3, minReps: 10, maxReps: 12, defaultRir: 2, type: "weighted", siSensitive: false, main: false,
    cue: "Dos à la poulie basse, bras en arrière du buste pour étirer le chef long du biceps.",
    svgType: "curl"
  },
  // LOWER B (11 sets)
  lb_rdl: {
    id: "lb_rdl", name: "Soulevé de terre roumain B-Stance", shortName: "B-Stance RDL",
    muscle: "Ischios/Fessiers", equipment: "Landmine + Barre", equip: "landmine_5",
    sets: 4, minReps: 8, maxReps: 12, unitLabel: "/jambe", defaultRir: 2, type: "weighted", siSensitive: true, main: true,
    cue: "Pied arrière en béquille, charnière de hanche pure, étirement maximal ischios sans flexion lombaire.",
    svgType: "rdl"
  },
  lb_pullthrough: {
    id: "lb_pullthrough", name: "Cable Pull-Through poulie basse corde", shortName: "Cable Pull-Through",
    muscle: "Ischios/Fessiers", equipment: "Matrix Aura G3-MSFT400", equip: "matrix_cable_1",
    sets: 4, minReps: 12, maxReps: 15, defaultRir: 2, type: "weighted", siSensitive: true, main: true,
    cue: "Zéro charge axiale : flexion de hanche fluide, contraction fessière forte sans hyperextension lombaire.",
    svgType: "pullthrough"
  },
  lb_carry: {
    id: "lb_carry", name: "Suitcase Carry 1 KB 10 kg", shortName: "Suitcase Carry",
    muscle: "Tronc", equipment: "Kettlebell 10 kg", equip: "iso_kb10",
    sets: 3, minReps: 30, maxReps: 45, stepDur: 5, unitLabel: "s/côté", defaultRir: 2, type: "isometric", siSensitive: true, main: false,
    cue: "Épaules strictement de niveau, anti-flexion latérale. Progression en durée (30s→45s).",
    svgType: "carry"
  }
};

const WORKOUTS = {
  UA: {
    code: "UA", title: "Upper A", subtitle: "18 séries · Pecs / Dos / Triceps Étiré", dayOfWeek: 1,
    blocks: [
      { id: "UA_A", type: "superset", label: "Superset Antagoniste A (4/4)", exIds: ["ua_chest", "ua_lat_tri"], restSec: 120, transitionSec: 120 },
      { id: "UA_B", type: "superset", label: "Superset Antagoniste B (3/3)", exIds: ["ua_lm_press", "ua_lat_wide"], restSec: 90, transitionSec: 90 },
      { id: "UA_C", type: "single",   label: "Bloc C — Triceps Overhead",    exIds: ["ua_tri"], restSec: 60, transitionSec: 0 }
    ]
  },
  LA: {
    code: "LA", title: "Lower A", subtitle: "11 séries · Quadriceps & Anti-Rotation", dayOfWeek: 2,
    blocks: [
      { id: "LA_A", type: "single", label: "Bloc A — Dominant Genou",     exIds: ["la_goblet"], restSec: 120, transitionSec: 120 },
      { id: "LA_B", type: "single", label: "Bloc B — Unilatéral SI-Safe", exIds: ["la_split"], restSec: 90, transitionSec: 90 },
      { id: "LA_C", type: "single", label: "Bloc C — Tronc Isométrique",  exIds: ["la_pallof"], restSec: 60, transitionSec: 0 }
    ]
  },
  UB: {
    code: "UB", title: "Upper B", subtitle: "22 séries · Ceinture Scapulaire ++", dayOfWeek: 4,
    blocks: [
      { id: "UB_A", type: "superset", label: "Superset Antagoniste A (4/4)", exIds: ["ub_sh_press", "ub_lm_row"], restSec: 120, transitionSec: 120 },
      { id: "UB_B", type: "superset", label: "Superset Antagoniste B (4/4)", exIds: ["ub_fly", "ub_facepull"], restSec: 90, transitionSec: 90 },
      { id: "UB_C", type: "superset", label: "Superset Antagoniste C (3/3)", exIds: ["ub_lat_raise", "ub_curl"], restSec: 60, transitionSec: 0 }
    ]
  },
  LB: {
    code: "LB", title: "Lower B", subtitle: "11 séries · Chaîne Postérieure & Tronc", dayOfWeek: 5,
    blocks: [
      { id: "LB_A", type: "single", label: "Bloc A — Charnière Unilatérale", exIds: ["lb_rdl"], restSec: 120, transitionSec: 120 },
      { id: "LB_B", type: "single", label: "Bloc B — Extension Hanches",     exIds: ["lb_pullthrough"], restSec: 90, transitionSec: 90 },
      { id: "LB_C", type: "single", label: "Bloc C — Portage Unilatéral",    exIds: ["lb_carry"], restSec: 60, transitionSec: 0 }
    ]
  }
};

const CALIBRATION_SESSIONS = {
  CAL_U: {
    code: "CAL_U", title: "Calibration 1/2 — Upper", subtitle: "Test sub-maximal (~20 min, RIR 0 technique)",
    exIds: ["ua_chest", "ua_lat_tri", "ub_sh_press", "ub_lm_row"]
  },
  CAL_L: {
    code: "CAL_L", title: "Calibration 2/2 — Lower", subtitle: "Test sub-maximal SI-Safe (~15 min)",
    exIds: ["la_goblet", "lb_rdl"]
  }
};

const MCGILL_ITEMS = [
  { title: "McGill Curl-Up", sub: "3 × 10s · Mains sous lombaires, menton rentré" },
  { title: "Side Plank (Gainage latéral)", sub: "3 × 10s / côté · Alignement épaules-bassin" },
  { title: "Bird-Dog", sub: "3 × 10s / côté · Extension contrôlée sans creuser" },
  { title: "Mobilité Hanches 90/90", sub: "2 min · Rotations internes/externes douces" },
  { title: "Suspension passive barre fixe", sub: "30–45s · Décompression discale & épaules" }
];
