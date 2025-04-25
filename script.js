// Väntfunktion
function sleep(ms) { return new Promise(res => setTimeout(res, ms)); }

// Initiera countdown
function updateCountdown() {
  const el = document.getElementById("countdown"),
        target = new Date("2025-05-01T00:00:00");
  (function tick(){
    const diff = target - new Date();
    if (diff <= 0) { el.textContent = "The day has arrived!"; return; }
    const d = Math.floor(diff/864e5),
          h = Math.floor(diff/36e5 %24),
          m = Math.floor(diff/6e4 %60),
          s = Math.floor(diff/1e3 %60);
    el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    setTimeout(tick,1000);
  })();
}

async function startSequence(){
  // Dölj startknapp
  document.getElementById("start-button").style.display = "none";

  // 1) Intro-text
  document.getElementById("start-text").classList.remove("hidden");
  await sleep(3000);

  // 2) Logga + musik (observera att BG-musiken redan är spelad i klick-hanteraren)
  document.querySelector("h1").classList.remove("hidden");

  // 3) Extra fördröjning innan crawl
  await sleep(5000);

  // 4) Visa crawl-text
  const titles = document.getElementById("titles");
  titles.classList.remove("hidden");

  // 5) Vänta tills det återstår 4s
  const crawlDuration = 25000; // totala crawltiden
  const offset        = 9000;  // dra igång stjärnor+planet 9s tidigt
  await sleep(crawlDuration - offset); // väntar 21s

  // 6) Stjärnor + planet
  document.body.classList.add("falling");
  const planet = document.getElementById("planet-effect");
  planet.classList.remove("hidden");
  planet.classList.add("active-planet");

  // 7) Slutför crawlen
  await sleep(offset);
  titles.style.display = "none";

  // 8) Finala element
  await sleep(5000);
  document.getElementById("final-elements").classList.remove("hidden");

  // 9) Visa ljussabeln på SLUTET
  document.getElementById("interactive-saber").classList.remove("hidden");
}

// Kör countdown direkt
updateCountdown();

// Klick på start-knappen: spela musiken OMEDDELBART, sen kör enter‐sekvensen
document.getElementById("start-button").addEventListener("click",()=>{
  const bg = document.getElementById("bgMusic");
  bg.play().catch(()=>{});   // play kopplat till användarklick → inga blockeringar
  // dina befintliga hamburger-knappar
  document.querySelectorAll(".hamburger-btn").forEach(btn=>btn.addEventListener("click",()=>{
    new Audio(`assets/${btn.dataset.sound}`).play().catch(()=>{});
  }));
  startSequence();
});

// ----- Interaktiv ljussabel efter finalen -----
const saberEl = document.getElementById('interactive-saber');
const saberSound = document.getElementById('saber-toggle-sound');

// Klicka på ljussabeln för att tända/släcka
saberEl.addEventListener('click', () => {
  const isOn = saberEl.classList.toggle('on');
  saberSound.currentTime = 0;
  saberSound.play().catch(() => {});
  if (isOn) {
    const colors = ['blue', 'red', 'green'];
    const pick = colors[Math.floor(Math.random() * colors.length)];
    saberEl.classList.remove('blue','red','green');
    saberEl.classList.add(pick);
  }
});

// ===== Mobil-feng-shui för knapparna =====
function simplifyButtonsForMobile() {
  if (window.innerWidth > 480) return;
  document.querySelectorAll(".hamburger-btn").forEach(btn => {
    const spans = btn.querySelectorAll("span");
    const letter = spans[0]?.textContent || "";
    const label  = spans[2]?.textContent || "";
    btn.innerHTML = `
      <span class="mobile-letter">${letter}</span>
      <span class="mobile-label">${label}</span>
    `;
  });
}

window.addEventListener("load",    simplifyButtonsForMobile);
window.addEventListener("resize",  simplifyButtonsForMobile);
