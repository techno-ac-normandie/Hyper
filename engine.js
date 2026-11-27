"use strict";

// HYPERTROPHY.OS — Module 2/3 : Persistance IndexedDB, Audio, Calendrier & Moteur Markov

/* ========================================================================
   5. INDEXEDDB PERSISTENCE (100% IndexedDB, ZERO localStorage)
   ======================================================================== */
const DB = {
  conn: null,
  memoryFallback: null,
  saveTimer: null,

  open() {
    return new Promise((resolve) => {
      if (this.conn) return resolve(this.conn);
      if (!("indexedDB" in window)) return resolve(null);
      try {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        req.onsuccess = (e) => {
          const db = e.target.result;
          db.onclose = () => { this.conn = null; };
          db.onversionchange = () => {
            try { db.close(); } catch (_) {}
            this.conn = null;
          };
          this.conn = db;
          resolve(db);
        };
        req.onerror = () => resolve(null);
      } catch (_) {
        resolve(null);
      }
    });
  },

  async load() {
    const db = await this.open();
    if (!db) return this.memoryFallback;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, "readonly");
        const req = tx.objectStore(STORE_NAME).get(ROOT_KEY);
        req.onsuccess = () => resolve(req.result || this.memoryFallback);
        req.onerror = () => resolve(this.memoryFallback);
      } catch (err) {
        if (err && err.name === "InvalidStateError") {
          this.conn = null;
          this.open().then(reDb => {
            if (!reDb) return resolve(this.memoryFallback);
            try {
              const tx2 = reDb.transaction(STORE_NAME, "readonly");
              const r2 = tx2.objectStore(STORE_NAME).get(ROOT_KEY);
              r2.onsuccess = () => resolve(r2.result || this.memoryFallback);
              r2.onerror = () => resolve(this.memoryFallback);
            } catch (_) { resolve(this.memoryFallback); }
          });
        } else {
          resolve(this.memoryFallback);
        }
      }
    });
  },

  async writeNow(data) {
    this.memoryFallback = JSON.parse(JSON.stringify(data));
    const db = await this.open();
    if (!db) return;
    return new Promise((resolve) => {
      const attempt = (targetDb, retry) => {
        try {
          const tx = targetDb.transaction(STORE_NAME, "readwrite");
          tx.objectStore(STORE_NAME).put(this.memoryFallback, ROOT_KEY);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch (err) {
          if (retry && err && err.name === "InvalidStateError") {
            this.conn = null;
            this.open().then(newDb => newDb ? attempt(newDb, false) : resolve());
          } else {
            resolve();
          }
        }
      };
      attempt(db, true);
    });
  },

  scheduleSave(data) {
    this.memoryFallback = JSON.parse(JSON.stringify(data));
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.writeNow(this.memoryFallback);
    }, 180);
  }
};

/* ========================================================================
   6. WEB AUDIO ENGINE (5,4,3,2,1s short beep + 0s double long beep)
   ======================================================================== */
const Sound = {
  ctx: null,
  ensure() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
    } catch (_) {}
  },
  beep(freq, dur, delay) {
    try {
      this.ensure();
      if (!this.ctx) return;
      const t0 = this.ctx.currentTime + (delay || 0);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.001, t0);
      gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch (_) {}
  },
  tick() { this.beep(880, 0.09, 0); },
  done() {
    this.beep(1046, 0.28, 0);
    this.beep(1318, 0.36, 0.34);
  }
};

/* ========================================================================
   7. DATE, BIOMETRY & ROLLING CALENDAR HELPERS
   ======================================================================== */
function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISODate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function addDays(isoStr, days) {
  const d = parseISODate(isoStr);
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

function getMondayOfWeek(isoStr) {
  const d = parseISODate(isoStr);
  const wd = d.getDay();
  const diff = wd === 0 ? -6 : 1 - wd;
  d.setDate(d.getDate() + diff);
  return toISODate(d);
}

function getEffectiveToday(state) {
  const base = toISODate(new Date());
  return addDays(base, (state && state.simDayOffset) ? state.simDayOffset : 0);
}

function formatShortDate(iso) {
  if (!iso) return "—";
  const d = parseISODate(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

function formatMMSS(sec) {
  const s = Math.max(0, Math.floor(sec));
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function calcProteinTarget(weightKg, bodyFatPct) {
  const lean = (Number(weightKg) || 110) * (1 - (Number(bodyFatPct) || 27.5) / 100);
  return Math.round(lean * 1.8);
}

function getEffectiveTargetSets(ex, state) {
  let n = ex.sets;
  if (state.cycle.phase === "deload") {
    n = Math.max(2, Math.round(n * 0.65));
  } else if (state.clinical.siAlertActive && ex.siSensitive) {
    n = Math.max(2, n - 1);
  }
  return n;
}

function getEffectiveTargetRir(ex, state) {
  if (state.cycle.phase === "deload") return 3;
  const p = state.prescriptions[ex.id];
  return p && typeof p.targetRir === "number" ? p.targetRir : ex.defaultRir;
}

function computeWeekSchedule(weekMonday, state, todayStr) {
  const baseSlots = [
    { code: "UA", offset: 0 },
    { code: "LA", offset: 1 },
    { code: "UB", offset: 3 },
    { code: "LB", offset: 4 }
  ];
  const weekEnd = addDays(weekMonday, 6);
  const doneCodes = new Set();
  (state.history || []).forEach(h => {
    if (h.date >= weekMonday && h.date <= weekEnd) doneCodes.add(h.workoutCode);
  });

  const scheduledMap = {};
  let cursor = null;

  baseSlots.forEach(slot => {
    if (doneCodes.has(slot.code)) return;
    let targetDate = addDays(weekMonday, slot.offset);
    if (weekEnd >= todayStr && targetDate < todayStr) {
      targetDate = todayStr;
    }
    if (cursor && targetDate <= cursor) {
      targetDate = addDays(cursor, 1);
    }
    if (targetDate <= weekEnd) {
      scheduledMap[targetDate] = slot.code;
      cursor = targetDate;
    }
  });

  return scheduledMap;
}

function getScheduledMapForMonth(year, monthIdx, state, todayStr) {
  const map = {};
  const first = new Date(year, monthIdx, 1, 12, 0, 0);
  const last = new Date(year, monthIdx + 1, 0, 12, 0, 0);
  let mon = getMondayOfWeek(toISODate(first));
  while (mon <= toISODate(last)) {
    const wkMap = computeWeekSchedule(mon, state, todayStr);
    Object.keys(wkMap).forEach(d => {
      if (d >= todayStr) map[d] = wkMap[d];
    });
    mon = addDays(mon, 7);
  }
  return map;
}

/* ========================================================================
   8. MATH, MARKOV ENGINE, PEAK FORM (3 LOCKS) & 4-SIGNAL DETECTOR
   ======================================================================== */
function computeE1RM(weight, reps, rir, ex, profileWeightKg) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 0;
  const rr = Math.max(0, Number(rir) || 0);
  if (r <= 0) return 0;

  if (ex.type === "isometric") {
    const effW = w > 0 ? w : 10;
    return Math.round((effW * (r / 15)) * 10) / 10;
  }

  let effW = w;
  if (w === 0 || ex.type === "bodyweight_kb") {
    effW = 0.65 * (Number(profileWeightKg) || 110) + (w > 0 ? w : 0);
  }

  const denom = Math.max(0.15, 1.0278 - 0.0278 * Math.min(30, r + rr));
  return Math.round((effW / denom) * 10) / 10;
}

function formatPerformedSetsSummary(exLog, ex) {
  const doneSets = (exLog.sets || []).filter(s => s.done);
  if (!doneSets.length) return "0 série (ABANDON)";

  const groups = [];
  doneSets.forEach(s => {
    const repsVal = Number(s.reps) || 0;
    const wVal = Number(s.weight) || 0;
    const repStr = ex && ex.type === "isometric" ? `${repsVal}s` : `${repsVal}`;
    const loadStr = (ex && ex.equip === "pdc_kb10" && wVal === 0) ? "PDC" : `${formatKgFR(wVal)} kg`;
    const key = `${repStr}|${loadStr}`;
    const last = groups.length ? groups[groups.length - 1] : null;
    if (last && last.key === key) last.count += 1;
    else groups.push({ key, count: 1, repStr, loadStr });
  });

  return groups.map(g => `${g.count} x ${g.repStr} @ ${g.loadStr}`).join(" + ");
}

function evaluateMesocycleSignals(state) {
  if (state.cycle.phase === "deload") {
    return { triggered: false, signals: [], signature: "" };
  }
  const signals = [];
  const hist = state.history || [];

  if (state.cycle.week >= 5 || (state.cycle.accumulationSessions || 0) >= 16) {
    signals.push({ code: "CAL", text: `Plafond calendaire atteint (Sem. ${state.cycle.week} / ${state.cycle.accumulationSessions} séances).` });
  }

  const last4 = hist.slice(-4);
  if (last4.length >= 4) {
    const avgRpe = last4.reduce((a, b) => a + (Number(b.rpe) || 0), 0) / last4.length;
    if (avgRpe > 8.5) {
      signals.push({ code: "SNC", text: `Fatigue SNC : RPE moyen ${avgRpe.toFixed(1)}/10 sur les 4 dernières séances.` });
    }
  }

  const last2 = hist.slice(-2);
  if (last2.length === 2 && last2.every(s => Number(s.siPain) >= 4)) {
    signals.push({ code: "SI", text: "Alerte clinique SI persistante (≥ 4/10 sur 2 séances consécutives)." });
  }

  const mainExs = Object.values(EXERCISES).filter(e => e.main && e.type !== "isometric");
  let evalCount = 0;
  let stalledCount = 0;
  mainExs.forEach(ex => {
    const arr = state.e1rmHistory[ex.id] || [];
    if (arr.length >= 3) {
      evalCount++;
      const last3 = arr.slice(-3).map(p => p.value);
      if (last3[2] <= last3[0] && last3[1] <= last3[0]) stalledCount++;
    }
  });
  if (evalCount >= 3 && (stalledCount / evalCount) >= 0.5) {
    signals.push({ code: "STAG", text: `Stagnation multi-exercices (${stalledCount}/${evalCount} mouvements principaux sur 3 séances).` });
  }

  const signature = signals.map(s => s.code).sort().join("+");
  return { triggered: signals.length > 0, signals, signature };
}

function finalizeWorkoutAndApplyMarkov(state, active, rpe, siPain, todayStr) {
  const workout = WORKOUTS[active.workoutCode];
  const totalSec = Math.max(60, Math.round((Date.now() - active.startedAt) / 1000));
  const restSec = Math.min(Math.round(totalSec * 0.72), Math.round(active.totalRestSec || 0));
  const doneTotal = active.setsFlat.filter(s => s.done).length;
  const activeSecRaw = Math.max(30, doneTotal * 38);

  let activePct = Math.round((activeSecRaw / totalSec) * 100);
  let restPct = Math.round((restSec / totalSec) * 100);
  if (activePct + restPct > 94) {
    const scale = 94 / (activePct + restPct);
    activePct = Math.max(5, Math.round(activePct * scale));
    restPct = Math.max(5, Math.round(restPct * scale));
  }
  const transPct = Math.max(0, 100 - activePct - restPct);
  const densityScore = Math.min(100, Math.round((doneTotal / Math.max(1, totalSec / 60)) * 180));

  const isDeload = state.cycle.phase === "deload";
  const exSummaries = [];
  const adjustments = [];
  const strengths = [];
  const suboptimals = [];

  // Rule 1: Clinical SI Circuit Breaker
  let siAction = null;
  if (siPain >= 4) {
    if (!state.clinical.siAlertActive) {
      state.clinical.siAlertActive = true;
      Object.values(EXERCISES).forEach(ex => {
        if (ex.siSensitive && state.prescriptions[ex.id] && state.prescriptions[ex.id].weight > 0) {
          state.prescriptions[ex.id].weight = snapToEquipment(ex.equip, state.prescriptions[ex.id].weight * 0.85, "nearest");
        }
      });
      siAction = "Coupe-circuit SI activé : -15% charge & -1 série sur LA/LB.";
    } else {
      siAction = "Coupe-circuit SI maintenu (-15% charge & -1 série sur LA/LB).";
    }
    suboptimals.push(`Douleur lombaire / SI élevée (${siPain}/10) : protection clinique active.`);
  } else if (siPain <= 2 && state.clinical.siAlertActive) {
    state.clinical.siAlertActive = false;
    siAction = "Douleur SI ≤ 2/10 : restauration automatique du volume nominal LA/LB.";
    strengths.push("Tolérance sacro-iliaque excellente : volume nominal restauré.");
  }

  const exOrder = [];
  workout.blocks.forEach(b => b.exIds.forEach(id => exOrder.push(id)));
  let totalHardSets = 0;

  // Trackers for strict 3-lock Peak Form calculation
  let sumActualRir = 0;
  let sumPrescribedRir = 0;
  let countDoneSetsAll = 0;

  exOrder.forEach(exId => {
    const ex = EXERCISES[exId];
    const sets = active.setsFlat.filter(s => s.exId === exId);
    const doneSets = sets.filter(s => s.done);
    totalHardSets += doneSets.filter(s => Number(s.rir) <= 3).length;

    const presc = state.prescriptions[exId] || {
      weight: snapToEquipment(ex.equip, 20),
      targetRir: ex.defaultRir,
      targetReps: ex.minReps
    };
    const prescribedRirForSession = getEffectiveTargetRir(ex, state);
    doneSets.forEach(s => {
      sumActualRir += Number(s.rir) || 0;
      sumPrescribedRir += prescribedRirForSession;
      countDoneSetsAll += 1;
    });

    const oldTargetReps = presc.targetReps || ex.minReps;
    const prevHist = state.e1rmHistory[exId] || [];
    const prevRecord = prevHist.length ? Math.max(...prevHist.map(h => h.value)) : 0;
    const prevLast = prevHist.length ? prevHist[prevHist.length - 1].value : 0;

    let status = "OK";
    let bestE1RM = 0;
    let topSet = null;
    let nextWeight = presc.weight;
    let nextRir = presc.targetRir;
    let nextTargetReps = oldTargetReps;
    let ruleReason = "Maintien";
    let pctChange = 0;
    let transitionText = "";

    const loadLabel = (w) => (ex.equip === "pdc_kb10" && w === 0) ? "PDC" : `${formatKgFR(w)} kg`;

    if (doneSets.length === 0) {
      status = "ABANDON";
      if (!isDeload && presc.weight > 0) {
        let downW = snapToEquipment(ex.equip, presc.weight * 0.95, "nearest");
        if (downW >= presc.weight) downW = snapToEquipment(ex.equip, presc.weight, "down");
        nextWeight = downW;
        pctChange = presc.weight > 0 ? Math.round(((nextWeight - presc.weight) / presc.weight) * 1000) / 10 : -5;
        ruleReason = "Abandon : cran de sécurité inférieur";
      } else {
        ruleReason = "Abandon (aucun e1RM ajouté)";
      }
      suboptimals.push(`${ex.shortName} : ABANDON (0 série validée).`);
    } else {
      doneSets.forEach(s => {
        const val = computeE1RM(s.weight, s.reps, s.rir, ex, state.profile.weightKg);
        if (val > bestE1RM) { bestE1RM = val; topSet = s; }
      });
      if (!state.e1rmHistory[exId]) state.e1rmHistory[exId] = [];
      state.e1rmHistory[exId].push({ date: todayStr, value: bestE1RM });

      const allHitMax = doneSets.every(s => Number(s.reps) >= ex.maxReps);
      const failedSet = doneSets.some(s => Number(s.reps) < ex.minReps && Number(s.rir) === 0);
      const baseW = topSet ? Number(topSet.weight) : presc.weight;

      if (doneSets.length < sets.length) {
        status = "Partiel";
        pctChange = 0;
        ruleReason = "Partiel : maintien strict de la charge";
        suboptimals.push(`${ex.shortName} : incomplet (${doneSets.length}/${sets.length} séries).`);
      } else if (isDeload) {
        status = "Décharge";
        pctChange = 0;
        ruleReason = "Phase Deload : récupération active (RIR 3)";
      } else if (siPain >= 4 && ex.siSensitive) {
        status = "SI -15%";
        nextWeight = presc.weight;
        pctChange = -15;
        ruleReason = "Coupe-circuit SI (-15% & -1 série)";
      } else if (failedSet) {
        status = "Échec";
        if (ex.type === "isometric") {
          const step = ex.stepDur || 5;
          nextTargetReps = Math.max(ex.minReps, oldTargetReps - step);
          pctChange = oldTargetReps > 0 ? Math.round(((nextTargetReps - oldTargetReps) / oldTargetReps) * 1000) / 10 : -5;
          ruleReason = `Sanction d'échec RIR 0 : -${step}s`;
        } else if (presc.weight > 0) {
          let downW = snapToEquipment(ex.equip, presc.weight * 0.95, "nearest");
          if (downW >= presc.weight) downW = snapToEquipment(ex.equip, presc.weight, "down");
          nextWeight = downW;
          pctChange = Math.round(((nextWeight - presc.weight) / presc.weight) * 1000) / 10;
          ruleReason = "Sanction d'échec (reps < min à RIR 0) : cran inférieur";
        } else {
          nextTargetReps = ex.minReps;
          pctChange = -5;
          ruleReason = "Sanction d'échec PDC : retour bas de fourchette";
        }
        suboptimals.push(`${ex.shortName} : sous-fourchette à RIR 0 (ajustement négatif).`);
      } else if (ex.type === "isometric") {
        const step = ex.stepDur || 5;
        const curDur = topSet ? Number(topSet.reps) : oldTargetReps;
        if (allHitMax) {
          const upW = snapToEquipment(ex.equip, baseW, "up");
          if (upW > baseW) {
            nextWeight = upW;
            nextTargetReps = ex.minReps;
            nextRir = 2;
            pctChange = Math.round(((upW - baseW) / Math.max(1, baseW)) * 1000) / 10;
            ruleReason = `Plafond ${ex.maxReps}s validé → ${formatKgFR(upW)} kg & retour ${ex.minReps}s`;
            strengths.push(`${ex.shortName} : plafond ${ex.maxReps}s franchi → ${formatKgFR(upW)} kg.`);
          } else {
            nextTargetReps = ex.maxReps;
            nextRir = Math.max(0, presc.targetRir - 1);
            ruleReason = `Plafond ${ex.maxReps}s maintenu (charge fixe KB)`;
          }
        } else {
          nextTargetReps = Math.min(ex.maxReps, curDur + step);
          nextRir = Math.max(0, presc.targetRir - 1);
          pctChange = Math.round(((nextTargetReps - curDur) / Math.max(1, curDur)) * 1000) / 10;
          ruleReason = `Progression durée : +${step}s (${curDur}s → ${nextTargetReps}s)`;
          strengths.push(`${ex.shortName} : +${step}s validé pour la séance suivante.`);
        }
        transitionText = nextWeight !== presc.weight
          ? `${formatKgFR(presc.weight)} kg (${curDur}s) → ${formatKgFR(nextWeight)} kg (${nextTargetReps}s)`
          : `${curDur}s → ${nextTargetReps}s @ ${formatKgFR(nextWeight)} kg`;
      } else if (ex.equip === "pdc_kb10") {
        const minDone = Math.min(...doneSets.map(s => Number(s.reps) || 0));
        if (allHitMax) {
          const upW = snapToEquipment(ex.equip, baseW, "up");
          if (upW > baseW) {
            nextWeight = upW;
            nextTargetReps = ex.minReps;
            nextRir = 2;
            pctChange = 10;
            ruleReason = `15 reps validées → ${loadLabel(upW)} & retour ${ex.minReps} reps`;
            strengths.push(`${ex.shortName} : plafond 15 reps validé → ${loadLabel(upW)}.`);
          } else {
            nextTargetReps = ex.maxReps;
            nextRir = Math.max(0, presc.targetRir - 1);
            ruleReason = "Plafond 20 kg × 15 reps atteint";
          }
        } else {
          nextTargetReps = Math.min(ex.maxReps, minDone + 1);
          nextRir = Math.max(0, presc.targetRir - 1);
          pctChange = Math.round(((nextTargetReps - Math.max(1, minDone)) / Math.max(1, minDone)) * 1000) / 10;
          ruleReason = `Double Prog. : +1 rep cible (${minDone} → ${nextTargetReps})`;
          strengths.push(`${ex.shortName} : +1 rep cible (${nextTargetReps}r @ ${loadLabel(nextWeight)}).`);
        }
        transitionText = nextWeight !== presc.weight
          ? `${loadLabel(presc.weight)} (${ex.maxReps}r) → ${loadLabel(nextWeight)} (${nextTargetReps}r)`
          : `${minDone}r → ${nextTargetReps}r @ ${loadLabel(nextWeight)}`;
      } else if (ex.equip === "landmine_5" || ex.equip === "technogym_5") {
        const minDone = Math.min(...doneSets.map(s => Number(s.reps) || 0));
        if (allHitMax) {
          const upW = snapToEquipment(ex.equip, baseW, "up");
          nextWeight = upW;
          nextTargetReps = ex.minReps;
          nextRir = 2;
          pctChange = baseW > 0 ? Math.round(((upW - baseW) / baseW) * 1000) / 10 : 0;
          ruleReason = `Plafond ${ex.maxReps} reps validé → ${formatKgFR(upW)} kg & retour ${ex.minReps}r`;
          strengths.push(`${ex.shortName} : ${ex.maxReps} reps validées → passage à ${formatKgFR(upW)} kg.`);
        } else {
          nextWeight = snapToEquipment(ex.equip, baseW, "nearest");
          nextTargetReps = Math.min(ex.maxReps, minDone + 1);
          nextRir = Math.max(0, presc.targetRir - 1);
          pctChange = 0;
          ruleReason = `Double Prog. : maintien ${formatKgFR(nextWeight)} kg, viser ${nextTargetReps} reps`;
        }
        transitionText = nextWeight !== presc.weight
          ? `${formatKgFR(presc.weight)} kg → ${formatKgFR(nextWeight)} kg (${nextTargetReps}r)`
          : `${formatKgFR(nextWeight)} kg (${minDone}r → ${nextTargetReps}r)`;
      } else {
        // Fine Matrix grids (matrix_chest, matrix_shoulder, matrix_cable_1)
        const hitRecord = bestE1RM >= prevRecord || prevRecord === 0;
        if (presc.targetRir >= 2) {
          if (hitRecord) {
            nextWeight = snapToEquipment(ex.equip, baseW, "up");
            nextRir = 1;
            pctChange = baseW > 0 ? Math.round(((nextWeight - baseW) / baseW) * 1000) / 10 : 0;
            ruleReason = `Double Prog. S1 → cran supérieur (${formatKgFR(nextWeight)} kg) & RIR 1`;
            strengths.push(`${ex.shortName} : record e1RM (${bestE1RM}), passage à ${formatKgFR(nextWeight)} kg.`);
          } else {
            ruleReason = "Consolidation au cran actuel (RIR 2)";
          }
        } else if (presc.targetRir === 1) {
          if (hitRecord) {
            nextWeight = snapToEquipment(ex.equip, baseW, "up");
            nextRir = 0;
            pctChange = baseW > 0 ? Math.round(((nextWeight - baseW) / baseW) * 1000) / 10 : 0;
            ruleReason = `Double Prog. S2 → cran supérieur (${formatKgFR(nextWeight)} kg) & RIR 0`;
            strengths.push(`${ex.shortName} : surcharge validée (${formatKgFR(nextWeight)} kg), pic RIR 0.`);
          } else {
            ruleReason = "Consolidation au cran actuel (RIR 1)";
          }
        } else {
          if (allHitMax) {
            nextWeight = snapToEquipment(ex.equip, baseW, "up");
            nextRir = 2;
            nextTargetReps = ex.minReps;
            pctChange = baseW > 0 ? Math.round(((nextWeight - baseW) / baseW) * 1000) / 10 : 0;
            ruleReason = `Haut de fourchette (${ex.maxReps}r) validé → ${formatKgFR(nextWeight)} kg & RIR 2`;
            strengths.push(`${ex.shortName} : plafond ${ex.maxReps} reps franchi (${formatKgFR(nextWeight)} kg).`);
          } else {
            ruleReason = `Maintien RIR 0 (viser ${ex.maxReps} reps sur toutes séries)`;
          }
        }
      }
    }

    if (!transitionText) {
      transitionText = `${loadLabel(presc.weight)} → ${loadLabel(nextWeight)}`;
    }

    state.prescriptions[exId] = {
      weight: nextWeight,
      targetRir: nextRir,
      targetReps: nextTargetReps
    };

    const deltaPct = (bestE1RM > 0 && prevLast > 0)
      ? Math.round(((bestE1RM - prevLast) / prevLast) * 1000) / 10
      : 0;

    exSummaries.push({
      exId,
      status,
      sets: sets.map(s => ({ weight: s.weight, reps: s.reps, rir: s.rir, done: s.done })),
      bestE1RM,
      prevE1RM: prevLast,
      deltaPct,
      unit: ex.type === "isometric" ? "idx" : "kg"
    });

    adjustments.push({
      exId,
      name: ex.shortName,
      oldWeight: presc.weight,
      newWeight: nextWeight,
      oldRir: presc.targetRir,
      newRir: nextRir,
      pctChange,
      status,
      reason: ruleReason,
      transitionText,
      isBodyweight: ex.equip === "pdc_kb10" && nextWeight === 0
    });
  });

  // Strict 3-lock session quality evaluation ("peak" | "optimal" | "suboptimal")
  const hasSuboptimalFlag = siPain >= 4 || exSummaries.some(e =>
    e.status === "ABANDON" || e.status === "Partiel" || e.status === "Échec"
  );

  let quality = "optimal";
  if (hasSuboptimalFlag) {
    quality = "suboptimal";
  } else {
    const evaluated = exSummaries.filter(e => e.prevE1RM > 0 && e.bestE1RM > 0);
    const improved = evaluated.filter(e => e.deltaPct > 0).length;
    const avgDelta = evaluated.length
      ? evaluated.reduce((acc, e) => acc + e.deltaPct, 0) / evaluated.length
      : 0;

    const lock1Progress = evaluated.length > 0 && ((improved / evaluated.length) >= 0.5 || avgDelta >= 2.5);
    const lock2RirRespected = countDoneSetsAll > 0 && (sumActualRir / countDoneSetsAll) >= (sumPrescribedRir / countDoneSetsAll) - 0.001;
    const lock3ClinicalClean = siPain <= 1 && !exSummaries.some(e => e.status === "ABANDON") && !isDeload;

    if (lock1Progress && lock2RirRespected && lock3ClinicalClean) {
      quality = "peak";
      strengths.unshift("Pic de forme validé (3 verrous) : surcompensation e1RM réelle, RIR respecté et SI ≤ 1/10.");
    }
  }

  if (!strengths.length && totalHardSets > 0) {
    strengths.push(`Séance complète (${totalHardSets} séries effectives à RIR ≤ 3) avec densité maîtrisée.`);
  }
  if (rpe >= 9) {
    suboptimals.push(`RPE global élevé (${rpe}/10) : surveiller la récupération SNC.`);
  }

  const logEntry = {
    id: "sess_" + Date.now(),
    date: todayStr,
    workoutCode: active.workoutCode,
    title: workout.title,
    mesocycle: state.cycle.mesocycle,
    week: state.cycle.week,
    phase: state.cycle.phase,
    durationSec: totalSec,
    timeSplit: { activePct, restPct, transPct },
    densityScore,
    totalHardSets,
    rpe: Number(rpe),
    siPain: Number(siPain),
    siAction,
    quality,
    strengths: strengths.slice(0, 4),
    suboptimals: suboptimals.slice(0, 4),
    exercises: exSummaries,
    adjustments
  };

  state.history.push(logEntry);

  if (state.cycle.phase === "deload") {
    state.cycle.deloadSessionsDone = (state.cycle.deloadSessionsDone || 0) + 1;
    if (state.cycle.deloadSessionsDone >= 4) {
      state.cycle.mesocycle += 1;
      state.cycle.week = 1;
      state.cycle.phase = "accumulation";
      state.cycle.accumulationSessions = 0;
      state.cycle.deloadSessionsDone = 0;
      state.cycle.dismissedSignalSignature = "";
      Object.keys(state.prescriptions).forEach(k => { state.prescriptions[k].targetRir = 2; });
      logEntry.cycleTransition = `Décharge terminée ! Passage automatique en Mésocycle ${state.cycle.mesocycle} — Semaine 1 (RIR 2).`;
    }
  } else {
    state.cycle.accumulationSessions = (state.cycle.accumulationSessions || 0) + 1;
    state.cycle.week = Math.floor(state.cycle.accumulationSessions / 4) + 1;
  }

  const evalSig = evaluateMesocycleSignals(state);
  state.cycle.lastSignals = evalSig;
  if (evalSig.triggered && state.cycle.dismissedSignalSignature) {
    state.cycle.repromptReason = (evalSig.signature === state.cycle.dismissedSignalSignature)
      ? "Signal persistant" : "Nouveau signal";
    state.cycle.bannerHiddenUntilNextSession = false;
  } else {
    state.cycle.repromptReason = "";
    state.cycle.bannerHiddenUntilNextSession = false;
  }

  state.activeSession = null;
  return logEntry;
}

function applyCalibrationToProgram(state) {
  const res = state.calibration.results;
  const chest1RM = res.ua_chest?.e1rm || 85;
  const lat1RM   = res.ua_lat_tri?.e1rm || 80;
  const sh1RM    = res.ub_sh_press?.e1rm || 60;
  const row1RM   = res.ub_lm_row?.e1rm || 45;
  const gob1RM   = res.la_goblet?.e1rm || 50;
  const rdl1RM   = res.lb_rdl?.e1rm || 65;

  const deriveLoad = (exId, e1rm, pct, pain) => {
    const safety = Number(pain) >= 4 ? 0.85 : 1.0;
    return snapToEquipment(EXERCISES[exId].equip, e1rm * pct * safety, "nearest");
  };

  const pChest = res.ua_chest?.pain || 0;
  const pLat   = res.ua_lat_tri?.pain || 0;
  const pSh    = res.ub_sh_press?.pain || 0;
  const pRow   = res.ub_lm_row?.pain || 0;
  const pGob   = res.la_goblet?.pain || 0;
  const pRdl   = res.lb_rdl?.pain || 0;

  const derived = {
    ua_chest:       deriveLoad("ua_chest",       chest1RM,      0.70, pChest),
    ua_lat_tri:     deriveLoad("ua_lat_tri",     lat1RM,        0.70, pLat),
    ua_lm_press:    deriveLoad("ua_lm_press",    sh1RM * 0.45,  0.70, pSh),
    ua_lat_wide:    deriveLoad("ua_lat_wide",    lat1RM * 0.85, 0.68, pLat),
    ua_tri:         deriveLoad("ua_tri",         chest1RM * 0.22, 0.65, pChest),
    la_goblet:      deriveLoad("la_goblet",      gob1RM,        0.70, pGob),
    la_split:       0,
    la_pallof:      snapToEquipment("matrix_cable_1", 5.67, "nearest"),
    ub_sh_press:    deriveLoad("ub_sh_press",    sh1RM,         0.70, pSh),
    ub_lm_row:      deriveLoad("ub_lm_row",      row1RM,        0.70, pRow),
    ub_fly:         deriveLoad("ub_fly",         chest1RM * 0.16, 0.70, pChest),
    ub_facepull:    deriveLoad("ub_facepull",    lat1RM * 0.18, 0.68, pLat),
    ub_lat_raise:   deriveLoad("ub_lat_raise",   sh1RM * 0.12,  0.65, pSh),
    ub_curl:        deriveLoad("ub_curl",        lat1RM * 0.16, 0.68, pLat),
    lb_rdl:         deriveLoad("lb_rdl",         rdl1RM,        0.70, pRdl),
    lb_pullthrough: deriveLoad("lb_pullthrough", rdl1RM * 0.30, 0.68, pRdl),
    lb_carry:       10
  };

  const today = getEffectiveToday(state);
  Object.keys(EXERCISES).forEach(id => {
    state.prescriptions[id] = { weight: derived[id], targetRir: 2, targetReps: EXERCISES[id].minReps };
  });
  Object.keys(res).forEach(id => {
    if (!state.e1rmHistory[id]) state.e1rmHistory[id] = [];
    state.e1rmHistory[id].push({ date: today, value: res[id].e1rm });
  });

  state.clinical.siAlertActive = [pGob, pRdl].some(p => Number(p) >= 4);
  state.calibration.active = false;
  state.calibration.completed = true;
  state.cycle = {
    mesocycle: 1, week: 1, phase: "accumulation",
    accumulationSessions: 0, deloadSessionsDone: 0,
    dismissedSignalSignature: "", bannerHiddenUntilNextSession: false,
    repromptReason: "", lastSignals: { triggered: false, signals: [], signature: "" }
  };
}

/* ========================================================================
   9. MIGRATION (v0.4.8 / v0.5.0 -> v0.5.1) & DEMO WEEK 2 STATE
   ======================================================================== */
function migrateStateIfNeeded(st) {
  if (!st || !st.profile) return createDemoWeek2State();
  const idMap = { la_lunge: "la_split", lb_bridge: "lb_pullthrough" };

  if (!st.prescriptions) st.prescriptions = {};
  if (!st.e1rmHistory) st.e1rmHistory = {};
  if (!st.clinical) st.clinical = { siAlertActive: false };
  if (!st.calibration) st.calibration = { active: false, completed: true, doneUpper: true, doneLower: true, results: {} };
  if (!st.mcgill) st.mcgill = {};

  Object.keys(idMap).forEach(oldId => {
    const newId = idMap[oldId];
    if (st.prescriptions[oldId] && !st.prescriptions[newId]) st.prescriptions[newId] = st.prescriptions[oldId];
    delete st.prescriptions[oldId];
    if (st.e1rmHistory[oldId] && !st.e1rmHistory[newId]) st.e1rmHistory[newId] = st.e1rmHistory[oldId];
    delete st.e1rmHistory[oldId];
  });
  delete st.prescriptions.ub_shrug;

  const defaults = {
    ua_chest: 60.5, ua_lat_tri: 60, ua_lm_press: 25, ua_lat_wide: 50, ua_tri: 12.48,
    la_goblet: 35, la_split: 0, la_pallof: 5.67,
    ub_sh_press: 42.8, ub_lm_row: 30, ub_fly: 10.21, ub_facepull: 10.21, ub_lat_raise: 5.67, ub_curl: 10.21,
    lb_rdl: 45, lb_pullthrough: 14.75, lb_carry: 10
  };

  Object.keys(EXERCISES).forEach(id => {
    const ex = EXERCISES[id];
    if (!st.prescriptions[id]) {
      st.prescriptions[id] = { weight: defaults[id], targetRir: 2, targetReps: ex.minReps };
    } else {
      st.prescriptions[id].weight = snapToEquipment(ex.equip, st.prescriptions[id].weight, "nearest");
      if (typeof st.prescriptions[id].targetRir !== "number") st.prescriptions[id].targetRir = 2;
      if (!st.prescriptions[id].targetReps) st.prescriptions[id].targetReps = ex.minReps;
    }
  });

  if (Array.isArray(st.history)) {
    st.history.forEach(sess => {
      (sess.exercises || []).forEach(e => { if (idMap[e.exId]) e.exId = idMap[e.exId]; });
      (sess.adjustments || []).forEach(a => { if (idMap[a.exId]) a.exId = idMap[a.exId]; });
    });
  }

  if (st.activeSession && st.version !== APP_VERSION) {
    st.activeSession = null;
  }

  st.version = APP_VERSION;
  return st;
}

function createDemoWeek2State() {
  const realToday = toISODate(new Date());
  const thisMon = getMondayOfWeek(realToday);
  const prevMon = addDays(thisMon, -7);

  const dW1UA = prevMon;
  const dW1LA = addDays(prevMon, 1);
  const dW1UB = addDays(prevMon, 3);
  const dW1LB = addDays(prevMon, 4);
  const dW2UA = thisMon;
  const dW2LA = addDays(thisMon, 1);

  const mkSets = (n, w, reps, rir) => Array.from({ length: n }, () => ({ weight: w, reps, rir, done: true }));

  const makeDemoSession = (id, date, code, week, rpe, siPain, hardSets, quality, exList) => ({
    id, date, workoutCode: code, title: WORKOUTS[code].title,
    mesocycle: 1, week, phase: "accumulation",
    durationSec: 2040,
    timeSplit: { activePct: 29, restPct: 58, transPct: 13 },
    densityScore: 79,
    totalHardSets: hardSets,
    rpe, siPain, siAction: null,
    quality,
    strengths: quality === "peak"
      ? ["Pic de forme validé (3 verrous) : surcompensation e1RM réelle, RIR respecté et SI ≤ 1/10.", "Volume effectif cible atteint (RIR ≤ 3)."]
      : ["Progression propre sur crans matériels réels.", "Volume effectif cible atteint (RIR ≤ 3)."],
    suboptimals: siPain >= 3 ? ["Légère raideur SI en fin de séance : poursuivre McGill."] : [],
    exercises: exList,
    adjustments: exList.map(e => {
      const ex = EXERCISES[e.exId];
      const oldW = e.sets[0].weight;
      const upW = (ex.equip === "matrix_chest" || ex.equip === "matrix_shoulder" || ex.equip === "matrix_cable_1")
        ? snapToEquipment(ex.equip, oldW, "up") : oldW;
      const pct = (oldW > 0 && upW !== oldW) ? Math.round(((upW - oldW) / oldW) * 1000) / 10 : 0;
      return {
        exId: e.exId, name: ex.shortName, oldWeight: oldW, newWeight: upW,
        oldRir: week === 1 ? 2 : 1, newRir: week === 1 ? 1 : 0,
        pctChange: pct, status: e.status || "OK",
        reason: pct > 0 ? `Double Prog. → ${formatKgFR(upW)} kg` : "Progression répétitions / durée",
        transitionText: ex.equip === "pdc_kb10" && oldW === 0
          ? `11r → 12r @ PDC` : `${formatKgFR(oldW)} kg → ${formatKgFR(upW)} kg`,
        isBodyweight: ex.equip === "pdc_kb10" && upW === 0
      };
    })
  });

  const history = [
    makeDemoSession("demo_w1_ua", dW1UA, "UA", 1, 7, 1, 18, "optimal", [
      { exId: "ua_chest",    status: "OK", sets: mkSets(4, 58.1, 9, 2),   bestE1RM: 80.5, prevE1RM: 78.0, deltaPct: 3.2, unit: "kg" },
      { exId: "ua_lat_tri",  status: "OK", sets: mkSets(4, 60, 9, 2),     bestE1RM: 83.1, prevE1RM: 80.0, deltaPct: 3.9, unit: "kg" },
      { exId: "ua_lm_press", status: "OK", sets: mkSets(3, 25, 9, 2),     bestE1RM: 34.6, prevE1RM: 33.0, deltaPct: 4.8, unit: "kg" },
      { exId: "ua_lat_wide", status: "OK", sets: mkSets(3, 50, 10, 2),    bestE1RM: 72.0, prevE1RM: 70.0, deltaPct: 2.9, unit: "kg" },
      { exId: "ua_tri",      status: "OK", sets: mkSets(4, 12.48, 12, 2), bestE1RM: 19.5, prevE1RM: 18.5, deltaPct: 5.4, unit: "kg" }
    ]),
    makeDemoSession("demo_w1_la", dW1LA, "LA", 1, 7, 2, 11, "optimal", [
      { exId: "la_goblet", status: "OK", sets: mkSets(4, 35, 9, 2),    bestE1RM: 48.5, prevE1RM: 46.5, deltaPct: 4.3, unit: "kg" },
      { exId: "la_split",  status: "OK", sets: mkSets(4, 0, 11, 2),    bestE1RM: 107.3, prevE1RM: 103.0, deltaPct: 4.2, unit: "kg" },
      { exId: "la_pallof", status: "OK", sets: mkSets(3, 5.67, 20, 2), bestE1RM: 7.6, prevE1RM: 7.0, deltaPct: 8.6, unit: "idx" }
    ]),
    makeDemoSession("demo_w1_ub", dW1UB, "UB", 1, 8, 1, 22, "peak", [
      { exId: "ub_sh_press",  status: "OK", sets: mkSets(4, 40.5, 9, 2),   bestE1RM: 56.1, prevE1RM: 54.0, deltaPct: 3.9, unit: "kg" },
      { exId: "ub_lm_row",    status: "OK", sets: mkSets(4, 30, 9, 2),     bestE1RM: 41.6, prevE1RM: 40.0, deltaPct: 4.0, unit: "kg" },
      { exId: "ub_fly",       status: "OK", sets: mkSets(4, 10.21, 10, 2), bestE1RM: 14.7, prevE1RM: 14.0, deltaPct: 5.0, unit: "kg" },
      { exId: "ub_facepull",  status: "OK", sets: mkSets(4, 10.21, 13, 2), bestE1RM: 16.7, prevE1RM: 15.8, deltaPct: 5.7, unit: "kg" },
      { exId: "ub_lat_raise", status: "OK", sets: mkSets(3, 5.67, 13, 2),  bestE1RM: 9.3, prevE1RM: 8.8, deltaPct: 5.7, unit: "kg" },
      { exId: "ub_curl",      status: "OK", sets: mkSets(3, 10.21, 11, 2), bestE1RM: 15.3, prevE1RM: 14.5, deltaPct: 5.5, unit: "kg" }
    ]),
    makeDemoSession("demo_w1_lb", dW1LB, "LB", 1, 8, 2, 11, "optimal", [
      { exId: "lb_rdl",         status: "OK", sets: mkSets(4, 45, 9, 2),     bestE1RM: 62.3, prevE1RM: 60.0, deltaPct: 3.8, unit: "kg" },
      { exId: "lb_pullthrough", status: "OK", sets: mkSets(4, 14.75, 13, 2), bestE1RM: 24.1, prevE1RM: 22.8, deltaPct: 5.7, unit: "kg" },
      { exId: "lb_carry",       status: "OK", sets: mkSets(3, 10, 30, 2),    bestE1RM: 20.0, prevE1RM: 19.0, deltaPct: 5.3, unit: "idx" }
    ])
  ];

  if (dW2UA <= realToday) {
    history.push(makeDemoSession("demo_w2_ua", dW2UA, "UA", 2, 8, 1, 18, "peak", [
      { exId: "ua_chest",    status: "OK", sets: mkSets(4, 60.5, 9, 1),   bestE1RM: 83.8, prevE1RM: 80.5, deltaPct: 4.1, unit: "kg" },
      { exId: "ua_lat_tri",  status: "OK", sets: mkSets(4, 60, 10, 1),    bestE1RM: 85.4, prevE1RM: 83.1, deltaPct: 2.8, unit: "kg" },
      { exId: "ua_lm_press", status: "OK", sets: mkSets(3, 25, 10, 1),    bestE1RM: 35.8, prevE1RM: 34.6, deltaPct: 3.5, unit: "kg" },
      { exId: "ua_lat_wide", status: "OK", sets: mkSets(3, 50, 11, 1),    bestE1RM: 74.2, prevE1RM: 72.0, deltaPct: 3.1, unit: "kg" },
      { exId: "ua_tri",      status: "OK", sets: mkSets(4, 14.75, 12, 1), bestE1RM: 22.1, prevE1RM: 19.5, deltaPct: 13.3, unit: "kg" }
    ]));
  }
  if (dW2LA <= realToday) {
    history.push(makeDemoSession("demo_w2_la", dW2LA, "LA", 2, 7, 1, 11, "optimal", [
      { exId: "la_goblet", status: "OK", sets: mkSets(4, 35, 10, 1),   bestE1RM: 50.2, prevE1RM: 48.5, deltaPct: 3.5, unit: "kg" },
      { exId: "la_split",  status: "OK", sets: mkSets(4, 0, 12, 1),    bestE1RM: 111.0, prevE1RM: 107.3, deltaPct: 3.4, unit: "kg" },
      { exId: "la_pallof", status: "OK", sets: mkSets(3, 5.67, 25, 1), bestE1RM: 9.5, prevE1RM: 7.6, deltaPct: 25.0, unit: "idx" }
    ]));
  }

  const d0 = addDays(prevMon, -4);
  const e1rmHistory = {
    ua_chest:       [{ date: d0, value: 78.0 }, { date: dW1UA, value: 80.5 }, ...(dW2UA <= realToday ? [{ date: dW2UA, value: 83.8 }] : [])],
    ua_lat_tri:     [{ date: d0, value: 80.0 }, { date: dW1UA, value: 83.1 }, ...(dW2UA <= realToday ? [{ date: dW2UA, value: 85.4 }] : [])],
    ua_lm_press:    [{ date: d0, value: 33.0 }, { date: dW1UA, value: 34.6 }, ...(dW2UA <= realToday ? [{ date: dW2UA, value: 35.8 }] : [])],
    ua_lat_wide:    [{ date: d0, value: 70.0 }, { date: dW1UA, value: 72.0 }, ...(dW2UA <= realToday ? [{ date: dW2UA, value: 74.2 }] : [])],
    ua_tri:         [{ date: d0, value: 18.5 }, { date: dW1UA, value: 19.5 }, ...(dW2UA <= realToday ? [{ date: dW2UA, value: 22.1 }] : [])],
    la_goblet:      [{ date: d0, value: 46.5 }, { date: dW1LA, value: 48.5 }, ...(dW2LA <= realToday ? [{ date: dW2LA, value: 50.2 }] : [])],
    la_split:       [{ date: d0, value: 103.0 }, { date: dW1LA, value: 107.3 }, ...(dW2LA <= realToday ? [{ date: dW2LA, value: 111.0 }] : [])],
    la_pallof:      [{ date: d0, value: 7.0 }, { date: dW1LA, value: 7.6 }, ...(dW2LA <= realToday ? [{ date: dW2LA, value: 9.5 }] : [])],
    ub_sh_press:    [{ date: d0, value: 54.0 }, { date: dW1UB, value: 56.1 }],
    ub_lm_row:      [{ date: d0, value: 40.0 }, { date: dW1UB, value: 41.6 }],
    ub_fly:         [{ date: d0, value: 14.0 }, { date: dW1UB, value: 14.7 }],
    ub_facepull:    [{ date: d0, value: 15.8 }, { date: dW1UB, value: 16.7 }],
    ub_lat_raise:   [{ date: d0, value: 8.8 }, { date: dW1UB, value: 9.3 }],
    ub_curl:        [{ date: d0, value: 14.5 }, { date: dW1UB, value: 15.3 }],
    lb_rdl:         [{ date: d0, value: 60.0 }, { date: dW1LB, value: 62.3 }],
    lb_pullthrough: [{ date: d0, value: 22.8 }, { date: dW1LB, value: 24.1 }],
    lb_carry:       [{ date: d0, value: 19.0 }, { date: dW1LB, value: 20.0 }]
  };

  const prescriptions = {
    ua_chest:       { weight: 62.8,  targetRir: 0, targetReps: 8 },
    ua_lat_tri:     { weight: 60,    targetRir: 0, targetReps: 11 },
    ua_lm_press:    { weight: 25,    targetRir: 0, targetReps: 11 },
    ua_lat_wide:    { weight: 50,    targetRir: 0, targetReps: 12 },
    ua_tri:         { weight: 17.02, targetRir: 0, targetReps: 12 },
    la_goblet:      { weight: 35,    targetRir: 0, targetReps: 11 },
    la_split:       { weight: 0,     targetRir: 0, targetReps: 13 },
    la_pallof:      { weight: 5.67,  targetRir: 1, targetReps: 30 },
    ub_sh_press:    { weight: 42.8,  targetRir: 1, targetReps: 9 },
    ub_lm_row:      { weight: 30,    targetRir: 1, targetReps: 10 },
    ub_fly:         { weight: 12.48, targetRir: 1, targetReps: 10 },
    ub_facepull:    { weight: 12.48, targetRir: 1, targetReps: 12 },
    ub_lat_raise:   { weight: 7.94,  targetRir: 1, targetReps: 12 },
    ub_curl:        { weight: 12.48, targetRir: 1, targetReps: 10 },
    lb_rdl:         { weight: 45,    targetRir: 1, targetReps: 10 },
    lb_pullthrough: { weight: 17.02, targetRir: 1, targetReps: 12 },
    lb_carry:       { weight: 10,    targetRir: 1, targetReps: 35 }
  };

  return {
    version: APP_VERSION,
    profile: {
      sex: "Homme", age: 47, heightCm: 194, weightKg: 110.0, bodyFatPct: 27.5, deficitKcal: -450,
      weighIns: [
        { date: prevMon, weightKg: 110.6, bodyFatPct: 27.8, proteinG: calcProteinTarget(110.6, 27.8) },
        { date: thisMon, weightKg: 110.0, bodyFatPct: 27.5, proteinG: calcProteinTarget(110.0, 27.5) }
      ]
    },
    clinical: { siAlertActive: false },
    calibration: { active: false, completed: true, doneUpper: true, doneLower: true, results: {} },
    cycle: {
      mesocycle: 1, week: 2, phase: "accumulation",
      accumulationSessions: history.length, deloadSessionsDone: 0,
      dismissedSignalSignature: "", bannerHiddenUntilNextSession: false,
      repromptReason: "", lastSignals: { triggered: false, signals: [], signature: "" }
    },
    prescriptions,
    e1rmHistory,
    history,
    mcgill: {},
    simDayOffset: 0,
    activeSession: null
  };
}
