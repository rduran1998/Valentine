"use strict";

const $ = (s) => document.querySelector(s);

const els = {
  herName: $("#herName"),
  signature: $("#signature"),

  startCard: $("#startCard"),
  letterCard: $("#letterCard"),
  memoriesCard: $("#memoriesCard"),
  reasonsCard: $("#reasonsCard"),
  askCard: $("#askCard"),
  yayCard: $("#yayCard"),

  startBtn: $("#startBtn"),
  customizeBtn: $("#customizeBtn"),

  letterText: $("#letterText"),
  skipTypingBtn: $("#skipTypingBtn"),
  toMemoriesBtn: $("#toMemoriesBtn"),

  memoriesGrid: $("#memoriesGrid"),
  toReasonsBtn: $("#toReasonsBtn"),

  reasonsWrap: $("#reasonsWrap"),
  toAskBtn: $("#toAskBtn"),

  yesBtn: $("#yesBtn"),
  noBtn: $("#noBtn"),
  tinyHint: $("#tinyHint"),

  finalLine: $("#finalLine"),
  replayBtn: $("#replayBtn"),
  copyLinkBtn: $("#copyLinkBtn"),

  toast: $("#toast"),
  butterfliesLayer: $("#butterflies")
};

// ✅ Customize these to make it *hers*
const CONFIG = {
  herNameDefault: "my love",
  yourSignature: "— (your name)",

  letter: [
    "I don’t know how to say this in a way that’s big enough…",
    "but I’ll try anyway.",
    "",
    "Being with you feels like coming home.",
    "You make ordinary days softer, brighter, and somehow more possible.",
    "",
    "I love the little things — the way you exist in the world,",
    "the way you care, the way you make me want to be better",
    "without ever asking me to stop being me.",
    "",
    "I made this because you matter to me. A lot.",
    "",
    "And I have one small question…"
  ].join("\n"),

  memories: [
    { title: "The first time I knew", text: "I remember thinking: I want to keep choosing her." },
    { title: "A tiny moment", text: "Even something simple felt special because it was with you." },
    { title: "Your smile", text: "The kind that makes the world feel quieter—in the best way." },
    { title: "When you supported me", text: "I carry that with me. You make me feel seen." },
    { title: "A favorite day", text: "Not because it was perfect, but because it was ours." },
    { title: "What I want more of", text: "More mornings, more jokes, more you, more us." }
  ],

  reasons: [
    { label: "your laugh", reveal: "because it makes me laugh too" },
    { label: "your kindness", reveal: "because you make people feel safe" },
    { label: "how you care", reveal: "because you show up with your whole heart" },
    { label: "your eyes", reveal: "because they feel like a universe" },
    { label: "your mind", reveal: "because you’re brilliant in quiet ways" },
    { label: "the way you love", reveal: "because loving you feels right" }
  ],

  finalLine: "Happy Valentine’s Day. I choose you. ❤️"
};

const state = {
  herName: CONFIG.herNameDefault,
  typingOn: true,
  typingTimer: null
};

function showToast(msg){
  els.toast.textContent = msg;
  els.toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => els.toast.classList.remove("show"), 1600);
}

function show(el){
  el.classList.remove("hidden");
  el.scrollIntoView({ behavior:"smooth", block:"start" });
}
function hide(el){ el.classList.add("hidden"); }

function setNames(){
  els.herName.textContent = state.herName;
  els.signature.textContent = CONFIG.yourSignature;
}

function typeText(el, text, speed=18){
  clearInterval(state.typingTimer);
  if(!state.typingOn){
    el.textContent = text;
    return;
  }
  el.textContent = "";
  let i = 0;
  state.typingTimer = setInterval(() => {
    i++;
    el.textContent = text.slice(0, i);
    if(i >= text.length) clearInterval(state.typingTimer);
  }, speed);
}

/* 💖 Hearts burst */
function spawnHearts(count=14){
  for(let i=0; i<count; i++){
    const h = document.createElement("div");
    h.style.position = "fixed";
    h.style.left = `${Math.random() * 100}%`;
    h.style.top = `-20px`;
    h.style.width = `${10 + Math.random()*14}px`;
    h.style.height = h.style.width;
    h.style.background = "rgba(255,77,109,.75)";
    h.style.transform = "rotate(45deg)";
    h.style.pointerEvents = "none";
    h.style.zIndex = "6";
    h.style.filter = "drop-shadow(0 10px 14px rgba(255,77,109,.25))";

    const before = document.createElement("span");
    const after = document.createElement("span");
    [before, after].forEach(s => {
      s.style.position = "absolute";
      s.style.width = "100%";
      s.style.height = "100%";
      s.style.borderRadius = "50%";
      s.style.background = "rgba(255,77,109,.75)";
      h.appendChild(s);
    });
    before.style.left = "-50%";
    after.style.top = "-50%";

    document.body.appendChild(h);

    const dur = 1800 + Math.random()*2200;
    const drift = (Math.random()*2 - 1) * 120;
    const start = performance.now();

    function anim(t){
      const p = Math.min(1, (t - start)/dur);
      const y = -20 + p * (window.innerHeight + 80);
      const dx = drift * Math.sin(p * Math.PI);
      h.style.transform = `translate(${dx}px, ${y}px) rotate(45deg)`;
      h.style.opacity = `${1 - p}`;
      if(p < 1) requestAnimationFrame(anim);
      else h.remove();
    }
    requestAnimationFrame(anim);
  }
}

/* 🦋 Butterflies */
function createButterfly(){
  const layer = els.butterfliesLayer;
  if(!layer) return;

  const b = document.createElement("div");
  b.className = "butterfly";

  const body = document.createElement("div");
  body.className = "body";
  b.appendChild(body);

  // start slightly offscreen to the left
  const startX = -0.25 * window.innerWidth;
  const endX = 1.25 * window.innerWidth;

  // avoid the sunflower field: pick a band in the top ~65% of viewport
  const baseY = Math.random() * (window.innerHeight * 0.65) + 10;

  // wavy flight parameters
  const amp = 20 + Math.random() * 70;         // vertical amplitude
  const freq = 1 + Math.random() * 2.5;        // wave frequency
  const tilt = (Math.random()*2 - 1) * 10;     // gentle rotate

  // size/speed
  const scale = 0.8 + Math.random() * 1.6;
  const duration = 6500 + Math.random() * 8000;

  // tint
  const tints = [
    "rgba(255,143,171,.86)",  // pink
    "rgba(203,166,255,.86)",  // lavender
    "rgba(255,193,140,.84)",  // peach
    "rgba(160,220,255,.78)"   // sky
  ];
  b.style.setProperty("--tint", tints[Math.floor(Math.random()*tints.length)]);
  b.style.opacity = `${0.65 + Math.random()*0.35}`;
  b.style.filter = "drop-shadow(0 10px 14px rgba(0,0,0,.25))";

  layer.appendChild(b);

  const startT = performance.now();
  function step(t){
    const p = Math.min(1, (t - startT) / duration);
    const x = startX + (endX - startX) * p;
    const y = baseY + Math.sin(p * Math.PI * 2 * freq) * amp;

    b.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${tilt + Math.sin(p*10)*6}deg)`;

    if(p < 1) requestAnimationFrame(step);
    else b.remove();
  }
  requestAnimationFrame(step);
}

function startButterflies(){
  // initial drift
  for(let i=0;i<4;i++) setTimeout(createButterfly, i*500);

  // continuous
  setInterval(() => {
    createButterfly();
    if(Math.random() < 0.45) createButterfly();
  }, 1700);
}

/* UI builders */
function buildMemories(){
  els.memoriesGrid.innerHTML = "";
  CONFIG.memories.forEach((m) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tile";
    btn.innerHTML = `
      <span class="spark"></span>
      <h3>${m.title}</h3>
      <p>Tap to open</p>
    `;
    btn.addEventListener("click", () => {
      showToast(m.text);
      btn.querySelector("p").textContent = "Opened ❤️";
      spawnHearts(6);
    });
    els.memoriesGrid.appendChild(btn);
  });
}

function buildReasons(){
  els.reasonsWrap.innerHTML = "";
  CONFIG.reasons.forEach((r) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = r.label;

    chip.addEventListener("click", () => {
      chip.classList.add("revealed");
      chip.textContent = `${r.label} — ${r.reveal}`;
      spawnHearts(7);
      // bonus butterflies sometimes
      if(Math.random() < 0.45) createButterfly();
    }, { once: true });

    els.reasonsWrap.appendChild(chip);
  });
}

/* flow */
function personalize(){
  const her = prompt("Her name / nickname:", state.herName);
  if(her && her.trim()) state.herName = her.trim();

  const sig = prompt("Your sign-off (e.g. — Alex):", CONFIG.yourSignature);
  if(sig && sig.trim()) CONFIG.yourSignature = sig.trim();

  setNames();
  showToast(`Okay ❤️`);
}

function noButtonNudge(){
  const moves = [
    {x: 12, y: -6}, {x: -18, y: 4}, {x: 14, y: 10}, {x: -10, y: -10}
  ];
  let i = 0;
  els.noBtn.addEventListener("click", () => {
    const m = moves[i % moves.length];
    els.noBtn.style.transform = `translate(${m.x}px, ${m.y}px)`;
    els.tinyHint.textContent = "Hehe… try the other one 😇";
    i++;
    spawnHearts(4);
  });
}

function copyLink(){
  navigator.clipboard.writeText(location.href)
    .then(() => showToast("Link copied 💌"))
    .catch(() => showToast("Couldn’t copy—share the URL from your address bar"));
}

function init(){
  setNames();
  buildMemories();
  buildReasons();
  noButtonNudge();
  startButterflies();

  els.customizeBtn.addEventListener("click", personalize);

  els.startBtn.addEventListener("click", () => {
    hide(els.startCard);
    show(els.letterCard);
    typeText(els.letterText, CONFIG.letter);
    spawnHearts(10);
  });

  els.skipTypingBtn.addEventListener("click", () => {
    state.typingOn = false;
    typeText(els.letterText, CONFIG.letter);
    showToast("❤️");
  });

  els.toMemoriesBtn.addEventListener("click", () => {
    hide(els.letterCard);
    show(els.memoriesCard);
  });

  els.toReasonsBtn.addEventListener("click", () => {
    hide(els.memoriesCard);
    show(els.reasonsCard);
  });

  els.toAskBtn.addEventListener("click", () => {
    hide(els.reasonsCard);
    show(els.askCard);
  });

  els.yesBtn.addEventListener("click", () => {
    hide(els.askCard);
    show(els.yayCard);
    els.finalLine.textContent = CONFIG.finalLine;

    spawnHearts(26);
    for(let i=0;i<6;i++) setTimeout(createButterfly, i*240);
  });

  els.replayBtn.addEventListener("click", () => location.reload());
  els.copyLinkBtn.addEventListener("click", copyLink);
}

init();
