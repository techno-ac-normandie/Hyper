"use strict";

// HYPERTROPHY.OS — Module 3/3 : Rendu UI, Modales, Événements & Bootstrap

/* ========================================================================
   10. BIOMECHANICAL 2-FRAME SVGS & E1RM CHART SVG
   ======================================================================== */
function renderBiomechSVG(type) {
  const b = `stroke="#E5E5EA" stroke-width="2.5" stroke-linecap="round" fill="none"`;
  const a = `stroke="#0A84FF" stroke-width="2.6" stroke-linecap="round" fill="none"`;
  const g = `stroke="#30D158" stroke-width="2.6" stroke-linecap="round" fill="none"`;
  let fA = "", fB = "";

  switch (type) {
    case "chestpress":
      fA = `<line x1="14" y1="48" x2="54" y2="48" stroke="#555" stroke-width="3"/><circle cx="22" cy="40" r="4" fill="#E5E5EA"/><line x1="26" y1="43" x2="48" y2="43" ${b}/><path d="M32 43 L28 32 L36 32" ${a}/>`;
      fB = `<line x1="14" y1="48" x2="54" y2="48" stroke="#555" stroke-width="3"/><circle cx="22" cy="40" r="4" fill="#E5E5EA"/><line x1="26" y1="43" x2="48" y2="43" ${b}/><line x1="32" y1="43" x2="32" y2="18" ${g}/>`;
      break;
    case "latpull":
      fA = `<line x1="18" y1="10" x2="50" y2="10" stroke="#FF9F0A" stroke-width="2.5"/><circle cx="34" cy="28" r="4.5" fill="#E5E5EA"/><line x1="34" y1="33" x2="34" y2="54" ${b}/><path d="M34 36 L22 14 M34 36 L46 14" ${a}/>`;
      fB = `<line x1="20" y1="32" x2="48" y2="32" stroke="#30D158" stroke-width="2.5"/><circle cx="34" cy="26" r="4.5" fill="#E5E5EA"/><line x1="34" y1="31" x2="34" y2="54" ${b}/><path d="M34 35 L22 40 L24 32 M34 35 L46 40 L44 32" ${g}/>`;
      break;
    case "shoulderpress":
      fA = `<line x1="22" y1="22" x2="22" y2="56" stroke="#555" stroke-width="3"/><circle cx="30" cy="24" r="4.5" fill="#E5E5EA"/><line x1="28" y1="29" x2="28" y2="52" ${b}/><path d="M28 33 L38 35 L40 24" ${a}/>`;
      fB = `<line x1="22" y1="22" x2="22" y2="56" stroke="#555" stroke-width="3"/><circle cx="30" cy="24" r="4.5" fill="#E5E5EA"/><line x1="28" y1="29" x2="28" y2="52" ${b}/><line x1="28" y1="33" x2="36" y2="10" ${g}/>`;
      break;
    case "landmine_press":
      fA = `<circle cx="12" cy="58" r="3" fill="#FF9F0A"/><line x1="12" y1="58" x2="36" y2="32" stroke="#FF9F0A" stroke-width="2"/><circle cx="42" cy="22" r="4" fill="#E5E5EA"/><path d="M42 26 L42 46 L52 58 M42 46 L32 58" ${b}/><line x1="42" y1="31" x2="36" y2="32" ${a}/>`;
      fB = `<circle cx="12" cy="58" r="3" fill="#FF9F0A"/><line x1="12" y1="58" x2="28" y2="14" stroke="#30D158" stroke-width="2"/><circle cx="42" cy="22" r="4" fill="#E5E5EA"/><path d="M42 26 L42 46 L52 58 M42 46 L32 58" ${b}/><line x1="42" y1="31" x2="28" y2="14" ${g}/>`;
      break;
    case "landmine_row":
      fA = `<line x1="14" y1="42" x2="34" y2="42" stroke="#555" stroke-width="3"/><circle cx="34" cy="26" r="4" fill="#E5E5EA"/><path d="M36 29 L52 38 L52 58 M38 31 L28 42" ${b}/><line x1="42" y1="34" x2="40" y2="52" ${a}/>`;
      fB = `<line x1="14" y1="42" x2="34" y2="42" stroke="#555" stroke-width="3"/><circle cx="34" cy="26" r="4" fill="#E5E5EA"/><path d="M36 29 L52 38 L52 58 M38 31 L28 42" ${b}/><path d="M42 34 L48 26 L42 38" ${g}/>`;
      break;
    case "incline_fly":
      fA = `<line x1="18" y1="54" x2="46" y2="30" stroke="#555" stroke-width="3"/><circle cx="42" cy="24" r="4" fill="#E5E5EA"/><line x1="10" y1="58" x2="20" y2="34" stroke="#FF9F0A" stroke-width="1.5"/><line x1="58" y1="58" x2="54" y2="34" stroke="#FF9F0A" stroke-width="1.5"/><path d="M36 32 L20 34 M36 32 L54 34" ${a}/>`;
      fB = `<line x1="18" y1="54" x2="46" y2="30" stroke="#555" stroke-width="3"/><circle cx="42" cy="24" r="4" fill="#E5E5EA"/><line x1="10" y1="58" x2="36" y2="16" stroke="#30D158" stroke-width="1.5"/><line x1="58" y1="58" x2="38" y2="16" stroke="#30D158" stroke-width="1.5"/><line x1="36" y1="32" x2="37" y2="16" ${g}/>`;
      break;
    case "facepull":
      fA = `<circle cx="12" cy="18" r="3" fill="#FF9F0A"/><line x1="12" y1="18" x2="32" y2="22" stroke="#FF9F0A" stroke-width="1.8"/><circle cx="48" cy="20" r="4" fill="#E5E5EA"/><line x1="48" y1="24" x2="48" y2="58" ${b}/><line x1="48" y1="28" x2="32" y2="22" ${a}/>`;
      fB = `<circle cx="12" cy="18" r="3" fill="#FF9F0A"/><line x1="12" y1="18" x2="42" y2="18" stroke="#30D158" stroke-width="1.8"/><circle cx="48" cy="20" r="4" fill="#E5E5EA"/><line x1="48" y1="24" x2="48" y2="58" ${b}/><path d="M48 28 L55 24 L42 18" ${g}/>`;
      break;
    case "overhead_tri":
      fA = `<circle cx="14" cy="18" r="3" fill="#FF9F0A"/><line x1="14" y1="18" x2="35" y2="24" stroke="#FF9F0A" stroke-width="1.8"/><circle cx="44" cy="24" r="4" fill="#E5E5EA"/><line x1="42" y1="28" x2="38" y2="58" ${b}/><path d="M42 30 L45 18 L35 24" ${a}/>`;
      fB = `<circle cx="14" cy="18" r="3" fill="#FF9F0A"/><line x1="14" y1="18" x2="56" y2="12" stroke="#30D158" stroke-width="1.8"/><circle cx="44" cy="24" r="4" fill="#E5E5EA"/><line x1="42" y1="28" x2="38" y2="58" ${b}/><line x1="42" y1="30" x2="56" y2="12" ${g}/>`;
      break;
    case "goblet":
    case "lunge":
      fA = `<circle cx="34" cy="16" r="4" fill="#E5E5EA"/><line x1="34" y1="20" x2="34" y2="40" ${b}/><path d="M34 40 L26 58 M34 40 L44 58" ${b}/><circle cx="28" cy="28" r="3.5" fill="#FF9F0A"/>`;
      fB = `<circle cx="34" cy="28" r="4" fill="#E5E5EA"/><line x1="34" y1="32" x2="36" y2="46" ${b}/><path d="M36 46 L24 48 L26 58 M36 46 L46 58" ${g}/><circle cx="28" cy="36" r="3.5" fill="#30D158"/>`;
      break;
    case "rdl":
      fA = `<circle cx="38" cy="17" r="4" fill="#E5E5EA"/><line x1="38" y1="21" x2="38" y2="41" ${b}/><path d="M38 41 L35 58 M38 41 L46 56" ${b}/><line x1="38" y1="26" x2="35" y2="44" ${a}/>`;
      fB = `<circle cx="52" cy="28" r="4" fill="#E5E5EA"/><line x1="48" y1="31" x2="32" y2="39" ${b}/><path d="M32 39 L35 58 M32 39 L24 56" ${b}/><line x1="45" y1="33" x2="45" y2="52" ${g}/>`;
      break;
    case "pullthrough":
      fA = `<circle cx="12" cy="56" r="3" fill="#FF9F0A"/><line x1="12" y1="56" x2="38" y2="44" stroke="#FF9F0A" stroke-width="1.8"/><circle cx="52" cy="28" r="4" fill="#E5E5EA"/><path d="M48 31 L34 39 L38 58 M34 39 L44 58" ${b}/><line x1="45" y1="34" x2="38" y2="44" ${a}/>`;
      fB = `<circle cx="12" cy="56" r="3" fill="#FF9F0A"/><line x1="12" y1="56" x2="44" y2="40" stroke="#30D158" stroke-width="1.8"/><circle cx="42" cy="17" r="4" fill="#E5E5EA"/><path d="M42 21 L42 41 L39 58 M42 41 L46 58" ${b}/><line x1="42" y1="27" x2="44" y2="40" ${g}/>`;
      break;
    default:
      fA = `<circle cx="34" cy="18" r="4" fill="#E5E5EA"/><line x1="34" y1="22" x2="34" y2="44" ${b}/><path d="M34 44 L28 58 M34 44 L40 58" ${b}/><path d="M34 28 L26 38 M34 28 L42 38" ${a}/>`;
      fB = `<circle cx="34" cy="18" r="4" fill="#E5E5EA"/><line x1="34" y1="22" x2="34" y2="44" ${b}/><path d="M34 44 L28 58 M34 44 L40 58" ${b}/><path d="M34 28 L18 28 M34 28 L50 28" ${g}/>`;
  }

  return `
    <div class="bio-svg-box" title="Départ ↔ Contraction">
      <svg viewBox="0 0 68 68" class="svg-frame-a">${fA}<text x="34" y="65" font-size="7" fill="#A1A1A6" text-anchor="middle">DÉPART</text></svg>
      <svg viewBox="0 0 68 68" class="svg-frame-b">${fB}<text x="34" y="65" font-size="7" fill="#30D158" text-anchor="middle">CONTRACTION</text></svg>
    </div>
  `;
}

function renderE1RMChartSVG(points, unit) {
  if (!points || !points.length) {
    return `<div class="text-xs text-muted" style="padding:14px 0;text-align:center;">Pas encore d'historique e1RM.</div>`;
  }
  const last = points[points.length - 1].value;
  const proj1 = Math.round(last * 1.028 * 10) / 10;
  const proj2 = Math.round(proj1 * 1.025 * 10) / 10;
  const allVals = [...points.map(p => p.value), proj1, proj2];
  const minV = Math.min(...allVals) * 0.94;
  const maxV = Math.max(...allVals) * 1.05;
  const span = Math.max(1, maxV - minV);

  const W = 340, H = 128, padL = 18, padR = 18, padT = 22, padB = 22;
  const totalPts = points.length + 2;
  const xAt = (i) => padL + (i / Math.max(1, totalPts - 1)) * (W - padL - padR);
  const yAt = (v) => H - padB - ((v - minV) / span) * (H - padT - padB);

  const histCoords = points.map((p, i) => ({ x: xAt(i), y: yAt(p.value), v: p.value, lbl: formatShortDate(p.date) }));
  const projCoords = [
    histCoords[histCoords.length - 1],
    { x: xAt(points.length), y: yAt(proj1), v: proj1, lbl: "N+1" },
    { x: xAt(points.length + 1), y: yAt(proj2), v: proj2, lbl: "N+2" }
  ];

  const histLine = histCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const projLine = projCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");

  return `
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">
      <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <polyline fill="none" stroke="#0A84FF" stroke-width="2.5" stroke-linejoin="round" points="${histLine}"/>
      <polyline fill="none" stroke="#FF9F0A" stroke-width="2" stroke-dasharray="5,4" points="${projLine}"/>
      ${histCoords.map(c => `
        <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.6" fill="#0A84FF"/>
        <text x="${c.x.toFixed(1)}" y="${(c.y - 7).toFixed(1)}" fill="#FFFFFF" font-size="9" font-weight="700" text-anchor="middle">${c.v}</text>
        <text x="${c.x.toFixed(1)}" y="${H - 6}" fill="#A1A1A6" font-size="8" text-anchor="middle">${c.lbl}</text>
      `).join("")}
      ${projCoords.slice(1).map(c => `
        <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="3.2" fill="#FF9F0A"/>
        <text x="${c.x.toFixed(1)}" y="${(c.y - 7).toFixed(1)}" fill="#FF9F0A" font-size="9" font-weight="700" text-anchor="middle">${c.v}</text>
        <text x="${c.x.toFixed(1)}" y="${H - 6}" fill="#FF9F0A" font-size="8" text-anchor="middle">${c.lbl}</text>
      `).join("")}
    </svg>
    <div class="text-xs text-muted" style="display:flex;justify-content:space-between;margin-top:2px;">
      <span><strong style="color:#0A84FF;">●</strong> Historique réel (${unit})</span>
      <span><strong style="color:#FF9F0A;">---</strong> Projection Markov</span>
    </div>
  `;
}

/* ========================================================================
   11. STATE, NAVIGATION, REST TIMER & SESSION LAUNCH
   ======================================================================== */
let STATE = null;
let VIEW = { name: "dashboard", param: null };
let CAL_MONTH = new Date();
let PENDING_IMPORT_DATA = null;
let TICKER = null;
let TOAST_TIMER = null;

function showToast(msg) {
  const root = document.getElementById("toast-root");
  root.innerHTML = `<div class="toast">${escapeHtml(msg)}</div>`;
  clearTimeout(TOAST_TIMER);
  TOAST_TIMER = setTimeout(() => { root.innerHTML = ""; }, 2800);
}

function saveAndRender(preserveScroll) {
  const y = window.scrollY;
  DB.scheduleSave(STATE);
  render();
  if (preserveScroll) window.scrollTo(0, y);
}

function startRestTimer(seconds, label) {
  if (!STATE.activeSession || !seconds || seconds <= 0) return;
  Sound.ensure();
  STATE.activeSession.restTimer = {
    endAt: Date.now() + seconds * 1000,
    totalSec: seconds,
    label: label || "Repos",
    lastBeepSec: null
  };
  STATE.activeSession.totalRestSec = (STATE.activeSession.totalRestSec || 0) + seconds;
  DB.scheduleSave(STATE);
  renderFloatingTimer();
}

function adjustRestTimer(deltaSec) {
  if (!STATE.activeSession || !STATE.activeSession.restTimer) return;
  const rt = STATE.activeSession.restTimer;
  const rem = Math.max(0, Math.ceil((rt.endAt - Date.now()) / 1000)) + deltaSec;
  if (rem <= 0) {
    STATE.activeSession.restTimer = null;
  } else {
    rt.endAt = Date.now() + rem * 1000;
    rt.lastBeepSec = null;
  }
  DB.scheduleSave(STATE);
  renderFloatingTimer();
}

function startTicker() {
  if (TICKER) clearInterval(TICKER);
  TICKER = setInterval(() => {
    if (!STATE || !STATE.activeSession) return;
    const elapsedEl = document.getElementById("session-elapsed-live");
    if (elapsedEl) {
      elapsedEl.textContent = formatMMSS((Date.now() - STATE.activeSession.startedAt) / 1000);
    }
    const stickyElapsed = document.getElementById("sticky-resume-timer");
    if (stickyElapsed) {
      stickyElapsed.textContent = formatMMSS((Date.now() - STATE.activeSession.startedAt) / 1000);
    }

    const rt = STATE.activeSession.restTimer;
    if (rt) {
      const rem = Math.ceil((rt.endAt - Date.now()) / 1000);
      if (rem <= 5 && rem >= 1 && rt.lastBeepSec !== rem) {
        rt.lastBeepSec = rem;
        Sound.tick();
      }
      if (rem <= 0) {
        Sound.done();
        STATE.activeSession.restTimer = null;
        DB.scheduleSave(STATE);
        renderFloatingTimer();
      } else {
        renderFloatingTimer();
      }
    }
  }, 250);
}

function requestStartWorkout(workoutCode) {
  if (STATE.activeSession) openActiveGuardModal(workoutCode);
  else startRegularWorkout(workoutCode);
}

function startRegularWorkout(workoutCode) {
  Sound.ensure();
  const wk = WORKOUTS[workoutCode];
  const setsFlat = [];
  wk.blocks.forEach(blk => {
    blk.exIds.forEach(exId => {
      const ex = EXERCISES[exId];
      const nSets = getEffectiveTargetSets(ex, STATE);
      const presc = STATE.prescriptions[exId] || { weight: snapToEquipment(ex.equip, 20), targetRir: ex.defaultRir, targetReps: ex.minReps };
      const targetRir = getEffectiveTargetRir(ex, STATE);
      const startReps = presc.targetReps || ex.minReps;
      for (let i = 0; i < nSets; i++) {
        setsFlat.push({
          uid: `${exId}_${i}_${Date.now().toString(36).slice(-3)}`,
          blockId: blk.id,
          exId,
          setIndex: i,
          weight: snapToEquipment(ex.equip, presc.weight, "nearest"),
          reps: startReps,
          rir: targetRir,
          done: false
        });
      }
    });
  });

  STATE.activeSession = {
    mode: "workout",
    workoutCode,
    title: wk.title,
    startedAt: Date.now(),
    totalRestSec: 0,
    restTimer: null,
    setsFlat
  };
  VIEW = { name: "workout", param: null };
  DB.scheduleSave(STATE);
  render();
  window.scrollTo(0, 0);
}

function startCalibrationSession(calCode) {
  Sound.ensure();
  const cal = CALIBRATION_SESSIONS[calCode];
  const steps = [];
  cal.exIds.forEach(exId => {
    const ex = EXERCISES[exId];
    const baseW = (STATE.prescriptions[exId]?.weight) || snapToEquipment(ex.equip, 40);
    steps.push({
      uid: `${exId}_w1`, exId, kind: "warmup1", label: "Échauffement 1 (~50%)",
      weight: snapToEquipment(ex.equip, baseW * 0.5), reps: 10, pain: 0, done: false
    });
    steps.push({
      uid: `${exId}_w2`, exId, kind: "warmup2", label: "Échauffement 2 (~75%)",
      weight: snapToEquipment(ex.equip, baseW * 0.75), reps: 6, pain: 0, done: false
    });
    steps.push({
      uid: `${exId}_top`, exId, kind: "topset", label: "TOP SET (6–10 reps, RIR 0 tech)",
      weight: snapToEquipment(ex.equip, baseW), reps: 8, pain: 0, done: false
    });
  });

  STATE.activeSession = {
    mode: "calibration",
    workoutCode: calCode,
    title: cal.title,
    startedAt: Date.now(),
    totalRestSec: 0,
    restTimer: null,
    steps
  };
  VIEW = { name: "workout", param: null };
  DB.scheduleSave(STATE);
  render();
  window.scrollTo(0, 0);
}

/* ========================================================================
   12. UI RENDERERS
   ======================================================================== */
function getStatusMeta(quality) {
  if (quality === "peak") return { label: "Pic de forme", badgeCls: "badge-cyan", barCls: "peak" };
  if (quality === "suboptimal") return { label: "Sous-opt. / SI", badgeCls: "badge-orange", barCls: "suboptimal" };
  return { label: "Optimal", badgeCls: "badge-green", barCls: "optimal" };
}

function renderHeader() {
  const badges = [];
  if (STATE.calibration.active) badges.push(`<span class="badge badge-purple">CALIBRATION</span>`);
  if (STATE.clinical.siAlertActive) badges.push(`<span class="badge badge-red">SI -15%</span>`);
  if (STATE.cycle.phase === "deload") badges.push(`<span class="badge badge-orange">DELOAD ${STATE.cycle.deloadSessionsDone}/4</span>`);

  const isSubView = VIEW.name !== "dashboard";
  return `
    <header class="top-header">
      <div class="brand-col">
        <div class="brand-row">
          ${isSubView ? `<button class="pill-btn" data-action="go-dashboard">← Accueil</button>` : `<span class="brand-title">HYPERTROPHY.OS</span>`}
          <span class="badge badge-gray">v${APP_VERSION}</span>
        </div>
        ${badges.length ? `<div class="brand-row">${badges.join("")}</div>` : ""}
      </div>
      <div class="header-actions">
        <button class="pill-btn" data-action="open-mcgill">McGill</button>
        <button class="pill-btn" data-action="open-data">Données</button>
      </div>
    </header>
  `;
}

function renderFloatingTimer() {
  const root = document.getElementById("floating-timer-root");
  if (!STATE || !STATE.activeSession || !STATE.activeSession.restTimer) {
    root.innerHTML = "";
    return;
  }
  const rt = STATE.activeSession.restTimer;
  const rem = Math.max(0, Math.ceil((rt.endAt - Date.now()) / 1000));
  const urgent = rem <= 10;
  const outsideWorkout = VIEW.name !== "workout";

  root.innerHTML = `
    <div class="floating-timer ${urgent ? "urgent" : ""}">
      <div class="ft-top">
        <div class="ft-digits tabular">${formatMMSS(rem)}</div>
        <div class="ft-meta">
          <div class="text-xs fw-700" style="color:${urgent ? "var(--orange)" : "var(--blue)"};text-transform:uppercase;">Repos actif</div>
          <div class="text-xs text-muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Suivant : ${escapeHtml(rt.label)}</div>
        </div>
      </div>
      <div class="ft-controls ${outsideWorkout ? "cols-4" : "cols-3"}">
        <button class="ft-btn" data-action="timer-adjust" data-delta="-15">−15s</button>
        <button class="ft-btn" data-action="timer-adjust" data-delta="15">+15s</button>
        <button class="ft-btn accent" data-action="timer-skip">Passer</button>
        ${outsideWorkout ? `<button class="ft-btn" data-action="resume-workout">← Séance</button>` : ""}
      </div>
    </div>
  `;
}

function getWeeklyHardSetsByMuscle(state, todayStr) {
  const mon = getMondayOfWeek(todayStr);
  const sun = addDays(mon, 6);
  const counts = {};
  Object.keys(MUSCLE_GROUPS).forEach(k => { counts[k] = 0; });

  (state.history || []).forEach(sess => {
    if (sess.date >= mon && sess.date <= sun) {
      (sess.exercises || []).forEach(exLog => {
        const ex = EXERCISES[exLog.exId];
        if (!ex) return;
        const valid = (exLog.sets || []).filter(s => s.done && Number(s.rir) <= 3).length;
        counts[ex.muscle] = (counts[ex.muscle] || 0) + valid;
      });
    }
  });
  return counts;
}

function renderMesocycleBanner() {
  const sig = STATE.cycle.lastSignals;
  if (!sig || !sig.triggered || STATE.cycle.phase === "deload" || STATE.cycle.bannerHiddenUntilNextSession) {
    return "";
  }
  return `
    <div class="banner banner-orange">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
        <strong style="font-size:13px;color:var(--orange);">⚡ Fin de Mésocycle suggérée</strong>
        ${STATE.cycle.repromptReason ? `<span class="badge badge-orange">${escapeHtml(STATE.cycle.repromptReason)}</span>` : ""}
      </div>
      <div class="text-xs" style="display:flex;flex-direction:column;gap:3px;">
        ${sig.signals.map(s => `<div>• ${escapeHtml(s.text)}</div>`).join("")}
      </div>
      <div class="btn-row">
        <button class="btn btn-orange btn-sm btn-flex" data-action="start-deload">Terminer &amp; Décharger (-35%)</button>
        <button class="btn btn-secondary btn-sm btn-flex" data-action="defer-deload">Continuer / Plus tard</button>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const todayStr = getEffectiveToday(STATE);
  const p = STATE.profile;
  const prot = calcProteinTarget(p.weightKg, p.bodyFatPct);
  const weeklySets = getWeeklyHardSetsByMuscle(STATE, todayStr);
  const mcgillToday = STATE.mcgill[todayStr] || [false, false, false, false, false];
  const mcgillCount = mcgillToday.filter(Boolean).length;

  const renderMuscleCard = (key) => {
    const mg = MUSCLE_GROUPS[key];
    const done = weeklySets[key] || 0;
    const pct = Math.min(100, Math.round((done / mg.targetSets) * 100));
    const refEx = EXERCISES[mg.refEx];
    const hist = STATE.e1rmHistory[mg.refEx] || [];
    const curE1 = hist.length ? hist[hist.length - 1].value : 0;
    const prevE1 = hist.length >= 2 ? hist[hist.length - 2].value : 0;
    const diffPct = (curE1 > 0 && prevE1 > 0) ? Math.round(((curE1 - prevE1) / prevE1) * 1000) / 10 : 0;
    const badgeCls = diffPct > 0 ? "badge-green" : diffPct < 0 ? "badge-red" : "badge-gray";
    const diffTxt = diffPct > 0 ? `+${diffPct}%` : `${diffPct}%`;
    const unit = refEx.type === "isometric" ? "idx" : "kg";

    return `
      <div class="muscle-card" data-action="open-muscle" data-muscle="${escapeHtml(key)}">
        <div class="mc-line1">
          <span class="mc-name">${escapeHtml(key)}</span>
          <span class="badge ${badgeCls} tabular">${diffTxt}</span>
        </div>
        <div class="mc-line2">
          <div class="prog-track"><div class="prog-fill ${done >= mg.targetSets ? "complete" : ""}" style="width:${pct}%"></div></div>
          <span class="mc-ratio tabular">${done}/${mg.targetSets}</span>
        </div>
        <div class="mc-line3">
          <span class="mc-ref">${escapeHtml(refEx.shortName)}</span>
          <span class="tabular fw-700" style="color:var(--text);">${curE1 ? `${curE1} ${unit}` : "—"}</span>
        </div>
      </div>
    `;
  };

  const faceKeys = Object.keys(MUSCLE_GROUPS).filter(k => MUSCLE_GROUPS[k].side === "face");
  const dosKeys = Object.keys(MUSCLE_GROUPS).filter(k => MUSCLE_GROUPS[k].side === "dos");

  const weekMon = getMondayOfWeek(todayStr);
  const sched = computeWeekSchedule(weekMon, STATE, todayStr);
  const todayCode = sched[todayStr];

  let stickyBtn = "";
  if (STATE.activeSession) {
    const elap = formatMMSS((Date.now() - STATE.activeSession.startedAt) / 1000);
    stickyBtn = `<button class="btn btn-green" data-action="resume-workout">▶ Reprendre : ${escapeHtml(STATE.activeSession.title)} <span id="sticky-resume-timer" class="tabular">${elap}</span></button>`;
  } else if (STATE.calibration.active) {
    const nextCal = !STATE.calibration.doneUpper ? "CAL_U" : "CAL_L";
    stickyBtn = `<button class="btn btn-primary" data-action="start-calibration" data-cal="${nextCal}">🎯 Démarrer : ${escapeHtml(CALIBRATION_SESSIONS[nextCal].title)}</button>`;
  } else if (todayCode) {
    stickyBtn = `<button class="btn btn-primary" data-action="start-workout" data-code="${todayCode}">Démarrer : ${todayCode} — ${escapeHtml(WORKOUTS[todayCode].title)}</button>`;
  } else {
    stickyBtn = `<button class="btn btn-secondary" data-action="go-calendar">Pas d'entraînement prévu aujourd'hui</button>`;
  }

  return `
    <main class="content">
      ${STATE.calibration.active ? `
        <div class="banner banner-purple">
          <strong style="font-size:13px;color:var(--purple);">🎯 Protocole de Calibration Sub-Maximale actif</strong>
          <div class="text-xs text-muted">
            Upper (${STATE.calibration.doneUpper ? "✓ Fait" : "À faire"}) · Lower (${STATE.calibration.doneLower ? "✓ Fait" : "À faire"}). Calcule automatiquement vos charges Semaine 1.
          </div>
          <div class="btn-row">
            <button class="btn btn-primary btn-sm btn-flex" data-action="start-calibration" data-cal="CAL_U">Test Upper</button>
            <button class="btn btn-primary btn-sm btn-flex" data-action="start-calibration" data-cal="CAL_L">Test Lower</button>
          </div>
        </div>
      ` : ""}

      ${renderMesocycleBanner()}

      <div class="card card-clickable" data-action="open-biometry">
        <div class="section-title" style="margin-bottom:2px;">
          <span>Biométrie &amp; Recomposition</span>
          <span class="badge badge-blue">M${STATE.cycle.mesocycle} · S${STATE.cycle.week}</span>
        </div>
        <div class="text-xs text-muted">${p.age} ans · ${p.heightCm} cm · Appuyer pour pesée à jeun</div>
        <div class="bio-grid tabular">
          <div class="bio-cell">
            <div class="bio-val">${p.weightKg.toFixed(1)}</div>
            <div class="bio-lbl">Poids (kg)</div>
          </div>
          <div class="bio-cell">
            <div class="bio-val">${p.bodyFatPct.toFixed(1)}%</div>
            <div class="bio-lbl">BodyFat</div>
          </div>
          <div class="bio-cell">
            <div class="bio-val" style="color:var(--green);">${prot}g</div>
            <div class="bio-lbl">Prot./j</div>
          </div>
          <div class="bio-cell">
            <div class="bio-val" style="color:var(--orange);">${p.deficitKcal}</div>
            <div class="bio-lbl">kcal/j</div>
          </div>
        </div>
      </div>

      <div class="card card-clickable" data-action="open-mcgill" style="padding:11px 14px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div class="fw-700" style="font-size:13px;">Protocole Mobilité &amp; SI (McGill)</div>
          <div class="text-xs text-muted">10–15 min hors-séance · Protection L5-S1</div>
        </div>
        <span class="badge ${mcgillCount === 5 ? "badge-green" : "badge-blue"} tabular">${mcgillCount}/5</span>
      </div>

      <div>
        <div class="section-title">
          <span>Volume Hebdomadaire (Hard Sets RIR ≤ 3)</span>
          <span class="text-xs text-muted">Face / Dos</span>
        </div>
        <div class="muscle-columns">
          <div class="muscle-col">
            <div class="text-xs fw-700 text-muted" style="text-align:center;">FACE</div>
            ${faceKeys.map(renderMuscleCard).join("")}
          </div>
          <div class="muscle-col">
            <div class="text-xs fw-700 text-muted" style="text-align:center;">DOS</div>
            ${dosKeys.map(renderMuscleCard).join("")}
          </div>
        </div>
      </div>
    </main>

    <div class="sticky-bottom">
      ${stickyBtn}
      <button class="link-btn" data-action="go-calendar">📅 Calendrier &amp; Historique (Lancement libre)</button>
    </div>
  `;
}

function renderMuscleDetail(muscleKey) {
  const mg = MUSCLE_GROUPS[muscleKey];
  const exs = Object.values(EXERCISES).filter(e => e.muscle === muscleKey);

  return `
    <main class="content">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:20px;font-weight:800;">${escapeHtml(muscleKey)}</div>
            <div class="text-xs text-muted">Cible hebdomadaire : ${mg.targetSets} séries effectives (RIR ≤ 3)</div>
          </div>
          <span class="badge badge-blue">${exs.length} exo${exs.length > 1 ? "s" : ""}</span>
        </div>
      </div>

      ${exs.map(ex => {
        const presc = STATE.prescriptions[ex.id] || { weight: 0, targetRir: 2, targetReps: ex.minReps };
        const unit = ex.type === "isometric" ? "idx" : "kg";
        const hist = STATE.e1rmHistory[ex.id] || [];
        let lastLogText = "Aucun log enregistré";
        for (let i = STATE.history.length - 1; i >= 0; i--) {
          const found = (STATE.history[i].exercises || []).find(e => e.exId === ex.id);
          if (found) {
            lastLogText = `${formatShortDate(STATE.history[i].date)} : ${formatPerformedSetsSummary(found, ex)} · ${found.bestE1RM ? found.bestE1RM + " " + unit : found.status}`;
            break;
          }
        }
        const nextLoadStr = (ex.equip === "pdc_kb10" && presc.weight === 0) ? "PDC" : `${formatKgFR(presc.weight)} kg`;
        const hwHint = getHardwareHint(ex.equip, presc.weight);
        const targetRange = ex.type === "isometric" ? `${presc.targetReps || ex.minReps}s${ex.unitLabel || ""}` : `${presc.targetReps || ex.minReps}–${ex.maxReps}${ex.unitLabel || ""}`;

        return `
          <div class="card" style="display:flex;flex-direction:column;gap:8px;">
            <div>
              <div class="fw-700" style="font-size:15px;">${escapeHtml(ex.name)}</div>
              <div class="text-xs text-muted">${escapeHtml(ex.equipment)}</div>
            </div>
            <div class="card-elevated" style="display:flex;flex-direction:column;gap:4px;font-size:12px;">
              <div><span class="text-muted">Dernier log :</span> <strong>${escapeHtml(lastLogText)}</strong></div>
              <div>
                <span class="text-muted">Prochaine cible Markov :</span>
                <strong style="color:var(--blue);">${getEffectiveTargetSets(ex, STATE)} × ${escapeHtml(targetRange)} @ ${escapeHtml(nextLoadStr)} (RIR ${getEffectiveTargetRir(ex, STATE)})</strong>
                ${hwHint ? `<span class="badge badge-blue" style="margin-left:4px;">${escapeHtml(hwHint)}</span>` : ""}
              </div>
            </div>
            <div class="text-xs" style="color:#D1D1D6;line-height:1.45;">💡 ${escapeHtml(ex.cue)}</div>
            <div style="background:#0B0B0D;border:1px solid var(--border);border-radius:12px;padding:8px;">
              ${renderE1RMChartSVG(hist, unit)}
            </div>
          </div>
        `;
      }).join("")}
    </main>
  `;
}

function renderCalendarView() {
  const todayStr = getEffectiveToday(STATE);
  const year = CAL_MONTH.getFullYear();
  const month = CAL_MONTH.getMonth();
  const monthLabel = CAL_MONTH.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1, 12, 0, 0);
  const startPad = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const loggedByDate = {};
  (STATE.history || []).forEach(h => { loggedByDate[h.date] = h; });
  const schedMap = getScheduledMapForMonth(year, month, STATE, todayStr);

  let cellsHtml = "";
  for (let i = 0; i < startPad; i++) cellsHtml += `<div class="cal-cell empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const log = loggedByDate[iso];
    const planned = !log ? schedMap[iso] : null;
    const isToday = iso === todayStr;

    let attr = "";
    let codeTxt = "";
    let barCls = "";
    if (log) {
      attr = `data-action="open-history-report" data-id="${escapeHtml(log.id)}"`;
      codeTxt = log.workoutCode;
      barCls = getStatusMeta(log.quality).barCls;
    } else if (planned) {
      attr = `data-action="open-planned-preview" data-code="${planned}" data-date="${iso}"`;
      codeTxt = planned;
      barCls = "scheduled";
    }

    cellsHtml += `
      <div class="cal-cell ${isToday ? "today" : ""} ${(log || planned) ? "clickable" : ""}" ${attr}>
        <span class="tabular">${d}</span>
        <span class="cal-code" style="color:${log ? "#FFFFFF" : planned ? "var(--blue)" : "transparent"};">${codeTxt || "."}</span>
        ${barCls ? `<div class="cal-bar ${barCls}"></div>` : `<div style="height:4px;"></div>`}
      </div>
    `;
  }

  const recentLogs = [...(STATE.history || [])].reverse().slice(0, 6);

  return `
    <main class="content">
      <div class="card">
        <div class="cal-header">
          <button class="pill-btn" data-action="cal-prev">❮</button>
          <strong style="text-transform:capitalize;font-size:15px;">${escapeHtml(monthLabel)}</strong>
          <button class="pill-btn" data-action="cal-next">❯</button>
        </div>
        <div class="cal-weekdays">
          <div class="cal-wd">L</div><div class="cal-wd">M</div><div class="cal-wd">M</div>
          <div class="cal-wd">J</div><div class="cal-wd">V</div><div class="cal-wd">S</div><div class="cal-wd">D</div>
        </div>
        <div class="cal-grid">${cellsHtml}</div>
        <div class="text-xs text-muted" style="display:flex;justify-content:space-between;margin-top:10px;flex-wrap:wrap;gap:6px;">
          <span><strong style="color:var(--cyan);">●</strong> Pic de forme</span>
          <span><strong style="color:var(--green);">●</strong> Optimal</span>
          <span><strong style="color:var(--orange);">●</strong> Sous-opt./SI</span>
          <span><strong style="color:var(--blue);">●</strong> Prévu</span>
        </div>
      </div>

      <div class="card">
        <div class="section-title">
          <span>Lancer une séance libre</span>
          <span class="badge badge-blue">Hors-planning</span>
        </div>
        <div class="free-grid">
          ${["UA", "LA", "UB", "LB"].map(code => {
            const wk = WORKOUTS[code];
            return `
              <button class="free-btn" data-action="start-workout" data-code="${code}">
                <span class="fw-700" style="font-size:14px;color:var(--blue);">${code} — ${escapeHtml(wk.title)}</span>
                <span class="text-xs text-muted">${escapeHtml(wk.subtitle.split("·")[0].trim())}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="card">
        <div class="section-title">
          <span>Simulateur Calendrier Glissant</span>
          <span class="badge badge-gray tabular">Date sim. : ${formatShortDate(todayStr)}</span>
        </div>
        <div class="text-xs text-muted" style="margin-bottom:8px;">
          Simulez des jours manqués pour vérifier le report automatique sur Samedi et Dimanche.
        </div>
        <div class="btn-row">
          <button class="btn btn-secondary btn-sm btn-flex" data-action="sim-day" data-delta="1">+1 jour manqué</button>
          <button class="btn btn-secondary btn-sm btn-flex" data-action="sim-reset">Réinitialiser</button>
        </div>
      </div>

      <div class="card">
        <div class="section-title"><span>Dernières séances archivées</span></div>
        ${recentLogs.length ? recentLogs.map(h => {
          const sm = getStatusMeta(h.quality);
          return `
            <div class="adj-row card-clickable" data-action="open-history-report" data-id="${escapeHtml(h.id)}">
              <div>
                <div class="fw-700" style="font-size:13px;">${escapeHtml(h.workoutCode)} — ${escapeHtml(h.title)}</div>
                <div class="text-xs text-muted">${formatShortDate(h.date)} · ${h.totalHardSets} séries · RPE ${h.rpe} · SI ${h.siPain}/10</div>
              </div>
              <span class="badge ${sm.badgeCls}">${sm.label}</span>
            </div>
          `;
        }).join("") : `<div class="text-xs text-muted">Aucune séance enregistrée.</div>`}
      </div>
    </main>
  `;
}

function renderActiveWorkoutView() {
  const active = STATE.activeSession;
  if (!active) {
    VIEW = { name: "dashboard", param: null };
    return renderDashboard();
  }
  if (active.mode === "calibration") return renderCalibrationView(active);

  const wk = WORKOUTS[active.workoutCode];
  const elapsed = formatMMSS((Date.now() - active.startedAt) / 1000);

  const blocksHtml = wk.blocks.map((blk, blkIdx) => {
    const nextBlk = wk.blocks[blkIdx + 1] || null;
    const exLists = blk.exIds.map(id => active.setsFlat.filter(s => s.exId === id));
    const maxRounds = Math.max(1, ...exLists.map(l => l.length));

    const headersHtml = blk.exIds.map(exId => {
      const ex = EXERCISES[exId];
      return `
        <div class="ex-header-box">
          ${renderBiomechSVG(ex.svgType)}
          <div style="flex:1;min-width:0;">
            <div class="fw-700" style="font-size:13px;">${escapeHtml(ex.name)}</div>
            <div class="text-xs" style="color:var(--blue);margin-top:2px;">${escapeHtml(ex.equipment)}</div>
            <div class="text-xs text-muted" style="margin-top:2px;">${escapeHtml(ex.cue)}</div>
          </div>
        </div>
      `;
    }).join("");

    let roundsHtml = "";
    for (let r = 0; r < maxRounds; r++) {
      const roundSets = blk.exIds.map(exId => {
        const list = active.setsFlat.filter(s => s.exId === exId);
        return list[r] || null;
      }).filter(Boolean);

      const allRoundDone = roundSets.length > 0 && roundSets.every(s => s.done);
      const nextLbl = r + 1 < maxRounds
        ? `Tour ${r + 2}/${maxRounds}`
        : (nextBlk ? nextBlk.label : "Fin de séance");

      const rowsHtml = roundSets.map(s => {
        const ex = EXERCISES[s.exId];
        const isIso = ex.type === "isometric";
        const repStep = isIso ? (ex.stepDur || 5) : 1;
        const displayW = formatStepperWeight(ex.equip, s.weight);
        const hwHint = getHardwareHint(ex.equip, s.weight);

        return `
          <div class="set-card-row">
            <div class="set-top-line">
              <div class="set-ex-label">
                <div>${escapeHtml(ex.shortName)}</div>
                <div class="set-ex-sub">Cible : ${ex.minReps}-${ex.maxReps}${ex.unitLabel || ""} · RIR ${getEffectiveTargetRir(ex, STATE)}</div>
              </div>
              <button type="button" class="check-btn ${s.done ? "checked" : ""}"
                data-action="toggle-set"
                data-uid="${escapeHtml(s.uid)}"
                data-block="${blk.id}"
                data-round="${r}"
                data-max-rounds="${maxRounds}"
                data-rest="${blk.restSec}"
                data-trans="${blk.transitionSec}"
                data-next-label="${escapeHtml(nextLbl)}">
                ${s.done ? "✓" : ""}
              </button>
            </div>
            <div class="set-controls-grid">
              <div class="stepper-col">
                <span class="input-mini-lbl">Poids (kg)</span>
                <div class="stepper-group">
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="weight" data-delta="-1">−</button>
                  <input class="stepper-val" type="text" inputmode="decimal" value="${escapeHtml(displayW)}" data-set-input="${escapeHtml(s.uid)}" data-field="weight" />
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="weight" data-delta="1">+</button>
                </div>
                ${hwHint ? `<div class="hw-hint-badge tabular">${escapeHtml(hwHint)}</div>` : ""}
              </div>
              <div class="stepper-col">
                <span class="input-mini-lbl">${isIso ? "Temps (s)" : "Reps"}</span>
                <div class="stepper-group">
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="reps" data-delta="${-repStep}">−</button>
                  <input class="stepper-val" type="number" step="1" min="0" value="${s.reps}" data-set-input="${escapeHtml(s.uid)}" data-field="reps" />
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="reps" data-delta="${repStep}">+</button>
                </div>
              </div>
              <div class="stepper-col">
                <span class="input-mini-lbl">RIR</span>
                <div class="stepper-group">
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="rir" data-delta="-1">−</button>
                  <input class="stepper-val" type="number" step="1" min="0" max="5" value="${s.rir}" data-set-input="${escapeHtml(s.uid)}" data-field="rir" />
                  <button type="button" class="stepper-btn" data-action="stepper-set" data-uid="${escapeHtml(s.uid)}" data-field="rir" data-delta="1">+</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");

      roundsHtml += `
        <div class="round-card ${allRoundDone ? "round-done" : ""}">
          <div class="round-title">
            <span>${blk.type === "superset" ? `Tour ${r + 1}/${maxRounds}` : `Série ${r + 1}/${maxRounds}`}</span>
            <span class="text-xs text-muted">${allRoundDone ? "✓ Validé" : `Repos ${blk.restSec}s`}</span>
          </div>
          ${rowsHtml}
        </div>
      `;
    }

    return `
      <div class="card">
        <div class="section-title">
          <span>${escapeHtml(blk.label)}</span>
          <span class="badge badge-blue">Repos ${blk.restSec}s</span>
        </div>
        ${headersHtml}
        ${roundsHtml}
        <div class="set-manage-row">
          <button type="button" class="btn btn-secondary btn-sm btn-flex" data-action="remove-block-round" data-block="${blk.id}">− Série</button>
          <button type="button" class="btn btn-secondary btn-sm btn-flex" data-action="add-block-round" data-block="${blk.id}">+ Série</button>
        </div>
      </div>
    `;
  }).join("");

  const doneCount = active.setsFlat.filter(s => s.done).length;
  return `
    <main class="content">
      <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:18px;font-weight:800;">${escapeHtml(active.workoutCode)} — ${escapeHtml(active.title)}</div>
          <div class="text-xs text-muted">${doneCount}/${active.setsFlat.length} séries validées · Persistance auto</div>
        </div>
        <div id="session-elapsed-live" class="tabular fw-700" style="font-size:20px;color:var(--green);">${elapsed}</div>
      </div>

      ${blocksHtml}

      <div class="btn-row" style="margin-top:4px;">
        <button type="button" class="btn btn-red btn-sm btn-flex" data-action="cancel-workout">Annuler séance</button>
        <button type="button" class="btn btn-green btn-flex" data-action="open-finish-modal">Terminer &amp; Bilan</button>
      </div>
    </main>
  `;
}

function renderCalibrationView(active) {
  const cal = CALIBRATION_SESSIONS[active.workoutCode];
  const elapsed = formatMMSS((Date.now() - active.startedAt) / 1000);

  const exCards = cal.exIds.map(exId => {
    const ex = EXERCISES[exId];
    const exSteps = active.steps.filter(st => st.exId === exId);

    return `
      <div class="card">
        <div class="ex-header-box">
          ${renderBiomechSVG(ex.svgType)}
          <div>
            <div class="fw-700" style="font-size:14px;">${escapeHtml(ex.name)}</div>
            <div class="text-xs text-muted">${escapeHtml(ex.equipment)}</div>
          </div>
        </div>
        ${exSteps.map(st => {
          const displayW = formatStepperWeight(ex.equip, st.weight);
          const hwHint = getHardwareHint(ex.equip, st.weight);
          return `
            <div class="set-card-row">
              <div class="set-top-line">
                <div class="set-ex-label">
                  <div style="color:${st.kind === "topset" ? "var(--orange)" : "#FFFFFF"};">${escapeHtml(st.label)}</div>
                </div>
                <button type="button" class="check-btn ${st.done ? "checked" : ""}" data-action="toggle-cal-step" data-uid="${escapeHtml(st.uid)}">
                  ${st.done ? "✓" : ""}
                </button>
              </div>
              <div class="set-controls-grid">
                <div class="stepper-col">
                  <span class="input-mini-lbl">Poids (kg)</span>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="weight" data-delta="-1">−</button>
                    <input class="stepper-val" type="text" inputmode="decimal" value="${escapeHtml(displayW)}" data-cal-input="${escapeHtml(st.uid)}" data-field="weight" />
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="weight" data-delta="1">+</button>
                  </div>
                  ${hwHint ? `<div class="hw-hint-badge tabular">${escapeHtml(hwHint)}</div>` : ""}
                </div>
                <div class="stepper-col">
                  <span class="input-mini-lbl">Reps</span>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="reps" data-delta="-1">−</button>
                    <input class="stepper-val" type="number" step="1" value="${st.reps}" data-cal-input="${escapeHtml(st.uid)}" data-field="reps" />
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="reps" data-delta="1">+</button>
                  </div>
                </div>
                <div class="stepper-col">
                  <span class="input-mini-lbl">Douleur /10</span>
                  <div class="stepper-group">
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="pain" data-delta="-1">−</button>
                    <input class="stepper-val" type="number" step="1" min="0" max="10" value="${st.pain}" data-cal-input="${escapeHtml(st.uid)}" data-field="pain" />
                    <button type="button" class="stepper-btn" data-action="stepper-cal" data-uid="${escapeHtml(st.uid)}" data-field="pain" data-delta="1">+</button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }).join("");

  return `
    <main class="content">
      <div class="card" style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div class="fw-700" style="font-size:16px;color:var(--purple);">${escapeHtml(cal.title)}</div>
          <div class="text-xs text-muted">${escapeHtml(cal.subtitle)}</div>
        </div>
        <div id="session-elapsed-live" class="tabular fw-700" style="font-size:18px;">${elapsed}</div>
      </div>
      ${exCards}
      <div class="btn-row">
        <button type="button" class="btn btn-red btn-sm btn-flex" data-action="cancel-workout">Annuler</button>
        <button type="button" class="btn btn-green btn-flex" data-action="finish-calibration">Valider cette calibration</button>
      </div>
    </main>
  `;
}

function render() {
  const root = document.getElementById("app-root");
  let body = "";
  if (VIEW.name === "dashboard") body = renderDashboard();
  else if (VIEW.name === "muscle") body = renderMuscleDetail(VIEW.param);
  else if (VIEW.name === "calendar") body = renderCalendarView();
  else if (VIEW.name === "workout") body = renderActiveWorkoutView();

  root.innerHTML = renderHeader() + body;
  renderFloatingTimer();
}

/* ========================================================================
   13. MODALS, SLIDERS & BOTTOM SHEETS
   ======================================================================== */
function closeModal() {
  document.getElementById("modal-root").innerHTML = "";
}

function updateClinicalSlidersUI() {
  const rpeInput = document.getElementById("fin-rpe");
  const siInput = document.getElementById("fin-si");
  if (rpeInput) {
    const v = Math.max(1, Math.min(10, parseInt(rpeInput.value, 10) || 7));
    const info = RPE_SCALE[v];
    const pct = ((v - 1) / 9) * 100;
    rpeInput.style.setProperty("--thumb-color", info.color);
    rpeInput.style.background = `linear-gradient(to right, ${info.color} 0%, ${info.color} ${pct}%, #2C2C2E ${pct}%, #2C2C2E 100%)`;
    const valEl = document.getElementById("fin-rpe-val");
    const kwEl = document.getElementById("fin-rpe-kw");
    if (valEl) { valEl.textContent = `${v}/10`; valEl.style.color = info.color; }
    if (kwEl) {
      kwEl.textContent = info.label;
      kwEl.style.color = info.color;
      kwEl.style.background = hexToSoftBg(info.color);
    }
  }
  if (siInput) {
    const v = Math.max(0, Math.min(10, parseInt(siInput.value, 10) || 0));
    const info = SI_SCALE[v];
    const pct = (v / 10) * 100;
    siInput.style.setProperty("--thumb-color", info.color);
    siInput.style.background = `linear-gradient(to right, ${info.color} 0%, ${info.color} ${pct}%, #2C2C2E ${pct}%, #2C2C2E 100%)`;
    const valEl = document.getElementById("fin-si-val");
    const kwEl = document.getElementById("fin-si-kw");
    if (valEl) { valEl.textContent = `${v}/10`; valEl.style.color = info.color; }
    if (kwEl) {
      kwEl.textContent = info.label;
      kwEl.style.color = info.color;
      kwEl.style.background = hexToSoftBg(info.color);
    }
  }
}

function openFinishWorkoutModal() {
  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop centered" data-action="close-backdrop">
      <div class="modal-box">
        <div class="sheet-header">
          <div class="sheet-title">Clôture &amp; Évaluation Clinique</div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>

        <div class="slider-block">
          <div class="slider-head">
            <span class="fw-700 text-sm">RPE Global de la séance</span>
            <span id="fin-rpe-val" class="slider-val-big tabular">7/10</span>
          </div>
          <input id="fin-rpe" class="clinical-range" type="range" min="1" max="10" step="1" value="7" />
          <div class="slider-scale tabular"><span>1</span><span>4</span><span>6</span><span>8</span><span>10</span></div>
          <span id="fin-rpe-kw" class="slider-keyword"></span>
        </div>

        <div class="slider-block">
          <div class="slider-head">
            <span class="fw-700 text-sm">Douleur Lombaire / SI</span>
            <span id="fin-si-val" class="slider-val-big tabular">1/10</span>
          </div>
          <input id="fin-si" class="clinical-range" type="range" min="0" max="10" step="1" value="1" />
          <div class="slider-scale tabular"><span>0</span><span>2</span><span>4 (SI)</span><span>7</span><span>10</span></div>
          <span id="fin-si-kw" class="slider-keyword"></span>
        </div>

        <div class="btn-row">
          <button class="btn btn-secondary btn-sm btn-flex" data-action="close-modal">Retour</button>
          <button class="btn btn-green btn-flex" data-action="confirm-finish-workout">Calculer Markov &amp; Bilan</button>
        </div>
      </div>
    </div>
  `;
  updateClinicalSlidersUI();
}

function openActiveGuardModal(targetCode) {
  const cur = STATE.activeSession;
  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop centered" data-action="close-backdrop">
      <div class="modal-box">
        <div class="sheet-header">
          <div class="sheet-title">⚠️ Séance déjà en cours</div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        <div class="text-sm text-muted">
          La séance <strong>${escapeHtml(cur.title)}</strong> est actuellement active. Souhaitez-vous la reprendre ou l'écraser pour démarrer <strong>${targetCode} — ${escapeHtml(WORKOUTS[targetCode].title)}</strong> ?
        </div>
        <div class="btn-row">
          <button class="btn btn-primary btn-sm btn-flex" data-action="resume-workout">Reprendre en cours</button>
          <button class="btn btn-red btn-sm btn-flex" data-action="force-start-workout" data-code="${targetCode}">Écraser &amp; Lancer</button>
        </div>
      </div>
    </div>
  `;
}

function openPlannedPreviewSheet(code, dateStr) {
  const wk = WORKOUTS[code];
  if (!wk) return;

  const blocksHtml = wk.blocks.map(blk => {
    const exRows = blk.exIds.map(exId => {
      const ex = EXERCISES[exId];
      const nSets = getEffectiveTargetSets(ex, STATE);
      const rir = getEffectiveTargetRir(ex, STATE);
      const presc = STATE.prescriptions[exId] || { weight: 0, targetReps: ex.minReps };
      const loadLabel = (ex.equip === "pdc_kb10" && presc.weight === 0) ? "PDC" : `${formatKgFR(presc.weight)} kg`;
      const hwHint = getHardwareHint(ex.equip, presc.weight);
      const rangeLabel = ex.type === "isometric"
        ? `${presc.targetReps || ex.minReps}s${ex.unitLabel || ""}`
        : `${ex.minReps}-${ex.maxReps}${ex.unitLabel || ""}`;

      return `
        <div style="padding:8px 0;border-top:1px solid rgba(255,255,255,0.06);">
          <div class="fw-700" style="font-size:13px;">${escapeHtml(ex.name)}</div>
          <div class="text-xs tabular" style="color:var(--blue);font-weight:700;margin-top:2px;">
            ${nSets} × ${escapeHtml(rangeLabel)} @ ${escapeHtml(loadLabel)} • RIR ${rir} • Repos ${blk.restSec}s
          </div>
          <div class="text-xs text-muted" style="margin-top:2px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span>${escapeHtml(ex.equipment)}</span>
            ${hwHint ? `<span class="badge badge-blue">${escapeHtml(hwHint)}</span>` : ""}
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="card-elevated">
        <div class="text-xs fw-700" style="color:var(--text-sec);text-transform:uppercase;margin-bottom:4px;">${escapeHtml(blk.label)}</div>
        ${exRows}
      </div>
    `;
  }).join("");

  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop" data-action="close-backdrop">
      <div class="sheet-box">
        <div class="sheet-header">
          <div>
            <div class="sheet-title">Programme prévu : ${code} — ${escapeHtml(wk.title)}</div>
            <div class="text-xs text-muted">${formatShortDate(dateStr)} · ${escapeHtml(wk.subtitle)}</div>
          </div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${STATE.clinical.siAlertActive ? `<span class="badge badge-red">Protection SI -15% &amp; -1 série active</span>` : ""}
          ${STATE.cycle.phase === "deload" ? `<span class="badge badge-orange">Mode DELOAD (-35% volume · RIR 3)</span>` : ""}
        </div>
        ${blocksHtml}
        <button class="btn btn-primary" data-action="start-workout" data-code="${code}">▶ Lancer cette séance maintenant</button>
      </div>
    </div>
  `;
}

function openBiometrySheet() {
  const p = STATE.profile;
  const list = [...(p.weighIns || [])].reverse();
  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop" data-action="close-backdrop">
      <div class="sheet-box">
        <div class="sheet-header">
          <div class="sheet-title">Pesée Hebdomadaire à Jeun</div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        <div class="card-elevated" style="display:flex;flex-direction:column;gap:10px;">
          <div>
            <label class="field-label">Poids à jeun (kg)</label>
            <input id="bio-weight-in" class="text-input tabular" type="number" step="0.1" value="${p.weightKg}" />
          </div>
          <div>
            <label class="field-label">Masse Grasse estimée (%)</label>
            <input id="bio-bf-in" class="text-input tabular" type="number" step="0.1" value="${p.bodyFatPct}" />
          </div>
          <button class="btn btn-primary btn-sm" data-action="save-biometry">Enregistrer &amp; Recalculer Protéines</button>
        </div>
        <div class="section-title" style="margin-bottom:0;"><span>Historique des pesées</span></div>
        <div class="card-elevated">
          ${list.map(w => `
            <div class="adj-row tabular">
              <span class="text-xs text-muted">${formatShortDate(w.date)}</span>
              <span class="fw-700 text-sm">${w.weightKg.toFixed(1)} kg · ${w.bodyFatPct.toFixed(1)}% BF</span>
              <span class="badge badge-green">${w.proteinG} g prot.</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

function openMcGillSheet() {
  const todayStr = getEffectiveToday(STATE);
  const checks = STATE.mcgill[todayStr] || [false, false, false, false, false];
  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop" data-action="close-backdrop">
      <div class="sheet-box">
        <div class="sheet-header">
          <div>
            <div class="sheet-title">Protocole Mobilité McGill</div>
            <div class="text-xs text-muted">Quotidien hors-séance (${formatShortDate(todayStr)}) · 10–15 min</div>
          </div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        ${MCGILL_ITEMS.map((item, idx) => `
          <div class="check-row" data-action="toggle-mcgill" data-idx="${idx}">
            <div class="check-btn ${checks[idx] ? "checked" : ""}" style="width:30px;height:30px;font-size:15px;">${checks[idx] ? "✓" : ""}</div>
            <div>
              <div class="fw-700" style="font-size:13px;">${escapeHtml(item.title)}</div>
              <div class="text-xs text-muted">${escapeHtml(item.sub)}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function openDataModal() {
  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop" data-action="close-backdrop">
      <div class="sheet-box">
        <div class="sheet-header">
          <div>
            <div class="sheet-title">Données &amp; Sauvegardes</div>
            <div class="text-xs text-muted">Persistance 100 % IndexedDB (HypertrophyDB)</div>
          </div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        <button class="btn btn-primary" data-action="export-json">⬇ Exporter Sauvegarde JSON</button>
        <button class="btn btn-secondary" data-action="trigger-import-json">⬆ Importer Sauvegarde JSON (Garde-fou)</button>
        <button class="btn btn-secondary" data-action="activate-calibration">🎯 Lancer le Protocole de Calibration</button>
        <button class="btn btn-red btn-sm" data-action="reset-demo">↺ Restaurer Jeu de Démo Semaine 2</button>
      </div>
    </div>
  `;
}

function openImportGuardModal(parsed) {
  const ver = parsed.version || "Inconnue";
  const count = Array.isArray(parsed.history) ? parsed.history.length : 0;
  const lastDate = count ? formatShortDate(parsed.history[count - 1].date) : "Aucun";
  const bio = parsed.profile ? `${parsed.profile.weightKg} kg · ${parsed.profile.bodyFatPct}% BF` : "Non renseignée";
  const compatible = Boolean(parsed && parsed.profile && parsed.prescriptions && Array.isArray(parsed.history));
  const needsMigration = compatible && ver !== APP_VERSION;

  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop centered" data-action="close-backdrop">
      <div class="modal-box">
        <div class="sheet-header">
          <div class="sheet-title">🛡️ Garde-Fou Import JSON</div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>
        <div class="card-elevated" style="display:flex;flex-direction:column;gap:6px;font-size:13px;">
          <div><span class="text-muted">Version du fichier :</span> <strong>v${escapeHtml(ver)}</strong></div>
          <div><span class="text-muted">Séances archivées :</span> <strong>${count}</strong></div>
          <div><span class="text-muted">Dernier log :</span> <strong>${escapeHtml(lastDate)}</strong></div>
          <div><span class="text-muted">Biométrie :</span> <strong>${escapeHtml(bio)}</strong></div>
          <div>
            <span class="text-muted">Compatibilité :</span>
            <span class="badge ${!compatible ? "badge-red" : needsMigration ? "badge-orange" : "badge-green"}">
              ${!compatible ? "Structure invalide" : needsMigration ? `Migration auto → v${APP_VERSION}` : `Compatible v${APP_VERSION}`}
            </span>
          </div>
        </div>
        <div class="text-xs text-muted">Confirmer l'importation écrasera intégralement la base locale IndexedDB.</div>
        <div class="btn-row">
          <button class="btn btn-secondary btn-sm btn-flex" data-action="close-modal">Annuler</button>
          ${compatible ? `<button class="btn btn-red btn-sm btn-flex" data-action="confirm-import-json">Écraser &amp; Importer</button>` : ""}
        </div>
      </div>
    </div>
  `;
}

function openPostSessionReportSheet(log) {
  if (!log) return;
  const split = log.timeSplit || { activePct: 30, restPct: 55, transPct: 15 };
  const sm = getStatusMeta(log.quality);

  const exRows = (log.exercises || []).map(exLog => {
    const ex = EXERCISES[exLog.exId];
    const summary = formatPerformedSetsSummary(exLog, ex);
    const delta = Number(exLog.deltaPct) || 0;
    const deltaCls = delta > 0 ? "badge-green" : delta < 0 ? "badge-red" : "badge-gray";
    const deltaTxt = exLog.status === "ABANDON" ? "ABANDON" : `${delta > 0 ? "+" : ""}${delta}% e1RM`;

    return `
      <div class="adj-row">
        <div style="min-width:0;">
          <div class="fw-700" style="font-size:13px;">${escapeHtml(ex ? ex.shortName : exLog.exId)}</div>
          <div class="text-xs tabular" style="color:var(--blue);font-weight:700;margin-top:2px;">${escapeHtml(summary)}</div>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          <span class="badge ${exLog.status === "ABANDON" ? "badge-red" : deltaCls} tabular">${deltaTxt}</span>
          ${exLog.bestE1RM ? `<div class="text-xs text-muted tabular" style="margin-top:2px;">${exLog.bestE1RM} ${exLog.unit || "kg"}</div>` : ""}
        </div>
      </div>
    `;
  }).join("");

  const adjRows = (log.adjustments || []).map(a => {
    const pct = Number(a.pctChange) || 0;
    let badgeCls = "badge-gray";
    let badgeTxt = "0%";
    if (a.status === "Partiel") {
      badgeCls = "badge-orange";
      badgeTxt = "Partiel · 0%";
    } else if (pct > 0) {
      badgeCls = "badge-green";
      badgeTxt = `+${pct}%`;
    } else if (pct < 0) {
      badgeCls = "badge-red";
      badgeTxt = `${pct}%`;
    }

    const loadTransition = a.transitionText
      ? a.transitionText
      : (a.isBodyweight ? "PDC → PDC" : `${formatKgFR(a.oldWeight)} kg → ${formatKgFR(a.newWeight)} kg`);

    return `
      <div class="adj-row">
        <div style="min-width:0;">
          <div class="fw-700" style="font-size:13px;">${escapeHtml(a.name)}</div>
          <div class="text-xs tabular" style="color:#E5E5EA;margin-top:2px;">${escapeHtml(loadTransition)} · RIR ${a.newRir}</div>
          <div class="text-xs text-muted" style="margin-top:2px;">${escapeHtml(a.reason)}</div>
        </div>
        <span class="badge ${badgeCls} tabular">${badgeTxt}</span>
      </div>
    `;
  }).join("");

  document.getElementById("modal-root").innerHTML = `
    <div class="modal-backdrop" data-action="close-backdrop">
      <div class="sheet-box">
        <div class="sheet-header">
          <div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <div class="sheet-title">Bilan : ${escapeHtml(log.workoutCode)} — ${escapeHtml(log.title)}</div>
              <span class="badge ${sm.badgeCls}">${sm.label}</span>
            </div>
            <div class="text-xs text-muted">${formatShortDate(log.date)} · M${log.mesocycle} S${log.week} · ${formatMMSS(log.durationSec)}</div>
          </div>
          <button class="close-btn" data-action="close-modal">✕</button>
        </div>

        ${log.cycleTransition ? `<div class="banner banner-blue text-xs fw-700">🎉 ${escapeHtml(log.cycleTransition)}</div>` : ""}
        ${log.siAction ? `<div class="banner banner-orange text-xs fw-700">🩺 ${escapeHtml(log.siAction)}</div>` : ""}

        <div class="card-elevated">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span class="text-xs fw-700 text-muted">RÉPARTITION DU TEMPS (100%)</span>
            <span class="badge badge-blue tabular">Densité ${log.densityScore}/100</span>
          </div>
          <div class="seg-bar">
            <div class="seg-active" style="width:${split.activePct}%"></div>
            <div class="seg-rest" style="width:${split.restPct}%"></div>
            <div class="seg-trans" style="width:${split.transPct}%"></div>
          </div>
          <div class="text-xs tabular" style="display:flex;justify-content:space-between;">
            <span style="color:var(--green);">Actif ${split.activePct}%</span>
            <span style="color:var(--blue);">Repos ${split.restPct}%</span>
            <span style="color:var(--orange);">Trans. ${split.transPct}%</span>
          </div>
        </div>

        <div class="bio-grid tabular" style="margin-top:0;grid-template-columns:repeat(3,1fr);">
          <div class="bio-cell"><div class="bio-val">${log.totalHardSets}</div><div class="bio-lbl">Hard Sets</div></div>
          <div class="bio-cell"><div class="bio-val">${log.rpe}/10</div><div class="bio-lbl">RPE Global</div></div>
          <div class="bio-cell"><div class="bio-val" style="color:${log.siPain >= 4 ? "var(--red)" : "var(--green)"};">${log.siPain}/10</div><div class="bio-lbl">Douleur SI</div></div>
        </div>

        ${(log.strengths && log.strengths.length) ? `
          <div class="card-elevated">
            <div class="text-xs fw-700" style="color:var(--green);margin-bottom:4px;">POINTS FORTS</div>
            ${log.strengths.map(s => `<div class="text-xs" style="margin-bottom:2px;">• ${escapeHtml(s)}</div>`).join("")}
          </div>
        ` : ""}

        ${(log.suboptimals && log.suboptimals.length) ? `
          <div class="card-elevated">
            <div class="text-xs fw-700" style="color:var(--orange);margin-bottom:4px;">POINTS D'ATTENTION</div>
            ${log.suboptimals.map(s => `<div class="text-xs" style="margin-bottom:2px;">• ${escapeHtml(s)}</div>`).join("")}
          </div>
        ` : ""}

        <div class="card-elevated">
          <div class="text-xs fw-700 text-muted" style="margin-bottom:4px;">SÉRIES RÉALISÉES (A × B @ C KG)</div>
          ${exRows}
        </div>

        <div class="card-elevated">
          <div class="text-xs fw-700 text-muted" style="margin-bottom:4px;">AJUSTEMENTS MARKOV (N → N+1)</div>
          ${adjRows}
        </div>

        ${renderMesocycleBanner()}

        <button class="btn btn-primary" data-action="close-modal">Fermer le bilan</button>
      </div>
    </div>
  `;
}

/* ========================================================================
   14. UNIFIED EVENT DELEGATION
   ======================================================================== */
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  switch (action) {
    case "go-dashboard":
      VIEW = { name: "dashboard", param: null };
      render();
      window.scrollTo(0, 0);
      break;

    case "go-calendar":
      VIEW = { name: "calendar", param: null };
      render();
      window.scrollTo(0, 0);
      break;

    case "open-muscle":
      VIEW = { name: "muscle", param: target.dataset.muscle };
      render();
      window.scrollTo(0, 0);
      break;

    case "open-biometry":
      openBiometrySheet();
      break;

    case "save-biometry": {
      const w = parseFloat(document.getElementById("bio-weight-in").value);
      const bf = parseFloat(document.getElementById("bio-bf-in").value);
      if (!isNaN(w) && w > 40 && !isNaN(bf) && bf >= 5 && bf <= 60) {
        STATE.profile.weightKg = Math.round(w * 10) / 10;
        STATE.profile.bodyFatPct = Math.round(bf * 10) / 10;
        const prot = calcProteinTarget(STATE.profile.weightKg, STATE.profile.bodyFatPct);
        STATE.profile.weighIns.push({
          date: getEffectiveToday(STATE),
          weightKg: STATE.profile.weightKg,
          bodyFatPct: STATE.profile.bodyFatPct,
          proteinG: prot
        });
        closeModal();
        saveAndRender(false);
        showToast(`Biométrie mise à jour · Cible protéines : ${prot} g/j`);
      }
      break;
    }

    case "open-mcgill":
      openMcGillSheet();
      break;

    case "toggle-mcgill": {
      const todayStr = getEffectiveToday(STATE);
      const idx = parseInt(target.dataset.idx, 10);
      if (!STATE.mcgill[todayStr]) STATE.mcgill[todayStr] = [false, false, false, false, false];
      STATE.mcgill[todayStr][idx] = !STATE.mcgill[todayStr][idx];
      DB.scheduleSave(STATE);
      openMcGillSheet();
      render();
      break;
    }

    case "open-data":
      openDataModal();
      break;

    case "export-json": {
      const todayStr = getEffectiveToday(STATE);
      const blob = new Blob([JSON.stringify(STATE, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hypertrophy_os_v0_5_1_backup_${todayStr}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("Sauvegarde JSON téléchargée.");
      break;
    }

    case "trigger-import-json":
      document.getElementById("json-file-input").click();
      break;

    case "confirm-import-json":
      if (PENDING_IMPORT_DATA) {
        STATE = migrateStateIfNeeded(PENDING_IMPORT_DATA);
        PENDING_IMPORT_DATA = null;
        closeModal();
        VIEW = { name: "dashboard", param: null };
        DB.writeNow(STATE).then(() => {
          render();
          showToast(`Sauvegarde importée et migrée (v${APP_VERSION}).`);
        });
      }
      break;

    case "activate-calibration":
      STATE.calibration = { active: true, completed: false, doneUpper: false, doneLower: false, results: {} };
      closeModal();
      VIEW = { name: "dashboard", param: null };
      saveAndRender(false);
      showToast("Protocole de Calibration activé.");
      break;

    case "start-calibration":
      closeModal();
      startCalibrationSession(target.dataset.cal);
      break;

    case "reset-demo":
      STATE = createDemoWeek2State();
      closeModal();
      VIEW = { name: "dashboard", param: null };
      DB.writeNow(STATE).then(() => {
        render();
        showToast("Jeu de démonstration Semaine 2 (v0.5.1) restauré.");
      });
      break;

    case "start-workout":
      closeModal();
      requestStartWorkout(target.dataset.code);
      break;

    case "force-start-workout":
      closeModal();
      startRegularWorkout(target.dataset.code);
      break;

    case "resume-workout":
      closeModal();
      VIEW = { name: "workout", param: null };
      render();
      window.scrollTo(0, 0);
      break;

    case "cancel-workout":
      STATE.activeSession = null;
      VIEW = { name: "dashboard", param: null };
      saveAndRender(false);
      showToast("Séance annulée.");
      break;

    case "toggle-set": {
      const active = STATE.activeSession;
      if (!active) return;
      const setObj = active.setsFlat.find(s => s.uid === target.dataset.uid);
      if (!setObj) return;
      setObj.done = !setObj.done;

      if (setObj.done) {
        const wk = WORKOUTS[active.workoutCode];
        const blk = wk.blocks.find(b => b.id === target.dataset.block);
        const rIdx = parseInt(target.dataset.round, 10);
        const maxR = parseInt(target.dataset.maxRounds, 10);
        const roundSets = blk.exIds.map(id => active.setsFlat.filter(s => s.exId === id)[rIdx]).filter(Boolean);
        const roundComplete = roundSets.every(s => s.done);
        if (roundComplete) {
          const isLastRound = rIdx >= maxR - 1;
          const sec = isLastRound ? parseInt(target.dataset.trans, 10) : parseInt(target.dataset.rest, 10);
          if (sec > 0) startRestTimer(sec, target.dataset.nextLabel);
        }
      }
      saveAndRender(true);
      break;
    }

    case "stepper-set": {
      const active = STATE.activeSession;
      if (!active) return;
      const setObj = active.setsFlat.find(s => s.uid === target.dataset.uid);
      if (!setObj) return;
      const ex = EXERCISES[setObj.exId];
      const field = target.dataset.field;
      const delta = parseFloat(target.dataset.delta);
      if (field === "weight") {
        setObj.weight = stepEquipment(ex.equip, setObj.weight, delta > 0 ? 1 : -1);
      } else if (field === "reps") {
        setObj.reps = Math.max(0, Math.round((Number(setObj.reps) || 0) + delta));
      } else if (field === "rir") {
        setObj.rir = Math.max(0, Math.min(5, Math.round((Number(setObj.rir) || 0) + delta)));
      }
      saveAndRender(true);
      break;
    }

    case "add-block-round": {
      const active = STATE.activeSession;
      if (!active) return;
      const blk = WORKOUTS[active.workoutCode].blocks.find(b => b.id === target.dataset.block);
      if (!blk) return;
      blk.exIds.forEach(exId => {
        const list = active.setsFlat.filter(s => s.exId === exId);
        const prev = list[list.length - 1];
        const ex = EXERCISES[exId];
        active.setsFlat.push({
          uid: `${exId}_${list.length}_${Date.now().toString(36).slice(-3)}`,
          blockId: blk.id,
          exId,
          setIndex: list.length,
          weight: prev ? prev.weight : snapToEquipment(ex.equip, 20),
          reps: prev ? prev.reps : ex.minReps,
          rir: prev ? prev.rir : 2,
          done: false
        });
      });
      saveAndRender(true);
      break;
    }

    case "remove-block-round": {
      const active = STATE.activeSession;
      if (!active) return;
      const blk = WORKOUTS[active.workoutCode].blocks.find(b => b.id === target.dataset.block);
      if (!blk) return;
      blk.exIds.forEach(exId => {
        const list = active.setsFlat.filter(s => s.exId === exId);
        if (list.length > 1) {
          const lastUid = list[list.length - 1].uid;
          const idx = active.setsFlat.findIndex(s => s.uid === lastUid);
          if (idx >= 0) active.setsFlat.splice(idx, 1);
        }
      });
      saveAndRender(true);
      break;
    }

    case "toggle-cal-step": {
      const active = STATE.activeSession;
      if (!active) return;
      const st = active.steps.find(x => x.uid === target.dataset.uid);
      if (!st) return;
      st.done = !st.done;
      if (st.done && st.kind !== "topset") startRestTimer(60, "Échauffement / Top Set");
      saveAndRender(true);
      break;
    }

    case "stepper-cal": {
      const active = STATE.activeSession;
      if (!active) return;
      const st = active.steps.find(x => x.uid === target.dataset.uid);
      if (!st) return;
      const ex = EXERCISES[st.exId];
      const field = target.dataset.field;
      const delta = parseFloat(target.dataset.delta);
      if (field === "weight") st.weight = stepEquipment(ex.equip, st.weight, delta > 0 ? 1 : -1);
      else if (field === "reps") st.reps = Math.max(0, Math.round((Number(st.reps) || 0) + delta));
      else if (field === "pain") st.pain = Math.max(0, Math.min(10, Math.round((Number(st.pain) || 0) + delta)));
      saveAndRender(true);
      break;
    }

    case "finish-calibration": {
      const active = STATE.activeSession;
      if (!active || active.mode !== "calibration") return;
      const tops = active.steps.filter(s => s.kind === "topset");
      tops.forEach(t => {
        const ex = EXERCISES[t.exId];
        STATE.calibration.results[t.exId] = {
          weight: t.weight,
          reps: t.reps,
          pain: t.pain,
          e1rm: computeE1RM(t.weight, t.reps, 0, ex, STATE.profile.weightKg)
        };
      });
      if (active.workoutCode === "CAL_U") STATE.calibration.doneUpper = true;
      if (active.workoutCode === "CAL_L") STATE.calibration.doneLower = true;
      STATE.activeSession = null;

      if (STATE.calibration.doneUpper && STATE.calibration.doneLower) {
        applyCalibrationToProgram(STATE);
        showToast("Calibration complète ! Programme M1 Semaine 1 généré.");
      } else {
        showToast("Micro-séance enregistrée. Complétez la seconde partie.");
      }
      VIEW = { name: "dashboard", param: null };
      DB.writeNow(STATE).then(() => render());
      break;
    }

    case "open-finish-modal":
      openFinishWorkoutModal();
      break;

    case "confirm-finish-workout": {
      const rpe = parseInt(document.getElementById("fin-rpe").value, 10) || 7;
      const siPain = parseInt(document.getElementById("fin-si").value, 10) || 0;
      const log = finalizeWorkoutAndApplyMarkov(STATE, STATE.activeSession, rpe, siPain, getEffectiveToday(STATE));
      closeModal();
      VIEW = { name: "dashboard", param: null };
      DB.writeNow(STATE).then(() => {
        render();
        openPostSessionReportSheet(log);
      });
      break;
    }

    case "timer-adjust":
      adjustRestTimer(parseInt(target.dataset.delta, 10));
      break;

    case "timer-skip":
      if (STATE.activeSession) {
        STATE.activeSession.restTimer = null;
        DB.scheduleSave(STATE);
        renderFloatingTimer();
      }
      break;

    case "cal-prev":
      CAL_MONTH = new Date(CAL_MONTH.getFullYear(), CAL_MONTH.getMonth() - 1, 1);
      render();
      break;

    case "cal-next":
      CAL_MONTH = new Date(CAL_MONTH.getFullYear(), CAL_MONTH.getMonth() + 1, 1);
      render();
      break;

    case "sim-day":
      STATE.simDayOffset = (STATE.simDayOffset || 0) + parseInt(target.dataset.delta, 10);
      saveAndRender(true);
      break;

    case "sim-reset":
      STATE.simDayOffset = 0;
      saveAndRender(true);
      break;

    case "open-history-report": {
      const log = (STATE.history || []).find(h => h.id === target.dataset.id);
      if (log) openPostSessionReportSheet(log);
      break;
    }

    case "open-planned-preview":
      openPlannedPreviewSheet(target.dataset.code, target.dataset.date);
      break;

    case "start-deload":
      STATE.cycle.phase = "deload";
      STATE.cycle.deloadSessionsDone = 0;
      STATE.cycle.bannerHiddenUntilNextSession = true;
      closeModal();
      saveAndRender(false);
      showToast("Semaine de Décharge activée (-35% volume · RIR 3 · 4 séances).");
      break;

    case "defer-deload":
      STATE.cycle.dismissedSignalSignature = STATE.cycle.lastSignals?.signature || "";
      STATE.cycle.bannerHiddenUntilNextSession = true;
      closeModal();
      saveAndRender(false);
      showToast("Décharge reportée : réévaluation à la prochaine séance.");
      break;

    case "close-modal":
      closeModal();
      break;

    case "close-backdrop":
      if (e.target === target) closeModal();
      break;
  }
});

// Live slider feedback in Closing Modal
document.addEventListener("input", (e) => {
  if (e.target && (e.target.id === "fin-rpe" || e.target.id === "fin-si")) {
    updateClinicalSlidersUI();
  }
});

// Direct inputs inside Active Workout & Calibration
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.dataset.setInput && STATE && STATE.activeSession) {
    const setObj = STATE.activeSession.setsFlat.find(s => s.uid === el.dataset.setInput);
    if (setObj) {
      const ex = EXERCISES[setObj.exId];
      const raw = String(el.value || "").replace(",", ".").trim();
      const v = raw.toUpperCase() === "PDC" ? 0 : parseFloat(raw);
      if (!isNaN(v)) {
        setObj[el.dataset.field] = el.dataset.field === "weight"
          ? snapToEquipment(ex.equip, Math.max(0, v), "nearest")
          : Math.max(0, Math.round(v));
      }
      saveAndRender(true);
    }
  } else if (el.dataset.calInput && STATE && STATE.activeSession) {
    const st = STATE.activeSession.steps.find(s => s.uid === el.dataset.calInput);
    if (st) {
      const ex = EXERCISES[st.exId];
      const raw = String(el.value || "").replace(",", ".").trim();
      const v = raw.toUpperCase() === "PDC" ? 0 : parseFloat(raw);
      if (!isNaN(v)) {
        st[el.dataset.field] = el.dataset.field === "weight"
          ? snapToEquipment(ex.equip, Math.max(0, v), "nearest")
          : Math.max(0, Math.round(v));
      }
      saveAndRender(true);
    }
  }
});

// JSON Import File Reader
document.getElementById("json-file-input").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  e.target.value = "";
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      PENDING_IMPORT_DATA = JSON.parse(reader.result);
      openImportGuardModal(PENDING_IMPORT_DATA);
    } catch (_) {
      showToast("Erreur : fichier JSON invalide.");
    }
  };
  reader.readAsText(file);
});

/* ========================================================================
   15. BOOTSTRAP
   ======================================================================== */
async function boot() {
  const loaded = await DB.load();
  if (loaded && loaded.profile && loaded.prescriptions) {
    const needsSave = loaded.version !== APP_VERSION;
    STATE = migrateStateIfNeeded(loaded);
    if (needsSave) await DB.writeNow(STATE);
  } else {
    STATE = createDemoWeek2State();
    await DB.writeNow(STATE);
  }
  startTicker();
  render();
}

boot();
