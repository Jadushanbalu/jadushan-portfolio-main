/* =====================================================================
   JADUSHAN BALU — PORTFOLIO
   1) YOUR CONTENT (edit the arrays below)   2) Engine (no need to touch)
   Empty arrays show dashed "ready-to-fill" slots. Paths are relative,
   e.g. "assets/apps/shop.jpg".
   ===================================================================== */

/* ---------- 1. YOUR CONTENT ---------- */

// Mobile apps (9:16). Copy the example object, remove the leading "//".
const APPS = [
  // { title:"App name", overview:"What it does.", thumb:"assets/apps/app1.jpg",
  //   stack:["Flutter","Firebase"], live:"https://…", repo:"https://github.com/…" },
];

// Websites (16:9)
const SITES = [
  // { title:"Site name", overview:"What it does.", thumb:"assets/sites/site1.jpg",
  //   stack:["HTML","CSS","JS"], live:"https://…", repo:"https://github.com/…" },
];

// Reels (9:16). Give a local mp4 in "video" and/or an Instagram "link".
const REELS = [
  { title:"Reel 1", thumb:"assets/reels/r1.jpg", video:"assets/reels/r1.mp4" },
  { title:"Reel 2", thumb:"assets/reels/r2.jpg", video:"assets/reels/r2.mp4" },
  { title:"Reel 3", thumb:"assets/reels/r3.jpg", video:"assets/reels/r3.mp4" },
  { title:"Reel 4", thumb:"assets/reels/r4.jpg", video:"assets/reels/r4.mp4" },
  { title:"Reel 5", thumb:"assets/reels/r5.jpg", video:"assets/reels/r5.mp4" },
  { title:"Reel 6", thumb:"assets/reels/r6.jpg", video:"assets/reels/r6.mp4" },
];

// Cinematic videos (16:9)
const FILMS = [
  { title:"Film 1", thumb:"assets/film/1.1.png", video:"assets/film/1.1.mp4" },
];

// Photography & graphic design. tag: "Photography" or "Graphic Design" (any text works)
const PHOTOS = [
  { title:"Dinemore · Crispy Chicken Burger", src:"assets/photos/p5.jpg", tag:"Graphic Design" },
  { title:"Blendz · This or That",            src:"assets/photos/p4.jpg", tag:"Graphic Design" },
  { title:"Bamba · Find Us",                  src:"assets/photos/p1.jpg", tag:"Graphic Design" },
  { title:"Bamba · Taste & Go",               src:"assets/photos/p2.jpg", tag:"Graphic Design" },
  { title:"Bamba · Weekend",                  src:"assets/photos/p3.jpg", tag:"Graphic Design" },
];

/* ---------- 2. ENGINE ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = t => String(t ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;
gsap.registerPlugin(ScrollTrigger);
const icons = () => window.lucide && lucide.createIcons();

/* ----- Rendering ----- */
const slots = (n, label, h) => Array.from({ length: n }, (_, i) => ({ empty: true, title: `${label} slot ${i + 1}`, h: h?.[i] }));
const tags = a => a?.length ? `<div class="tags">${a.map(t => `<span>${esc(t)}</span>`).join("")}</div>` : "";
const links = o => `<div class="links">${o.live ? `<a href="${esc(o.live)}" target="_blank" rel="noopener"><i data-lucide="external-link"></i>Live</a>` : ""}${o.repo ? `<a class="ghost" href="${esc(o.repo)}" target="_blank" rel="noopener"><i data-lucide="github"></i>Repo</a>` : ""}</div>`;
const thumb = o => o.thumb ? `<img src="${esc(o.thumb)}" alt="${esc(o.title)}" loading="lazy">` : (o.empty ? "Add thumbnail" : "");

function card(o, kind) {
  const ph = o.empty ? " empty" : "";
  const body = `<h4>${esc(o.title)}</h4><p>${esc(o.overview || (o.empty ? "Add overview, tech stack and links in js/main.js" : ""))}</p>${tags(o.stack)}${links(o)}`;
  if (kind === "phone") return `<article class="item phone${ph}"><div class="media">${thumb(o)}</div>${body}</article>`;
  return `<article class="item browser${ph}"><div class="bar"><span></span><span></span><span></span></div><div class="media">${thumb(o)}</div>${body}</article>`;
}
function play(o, i, group) {
  const kind = o.empty ? "" : ` data-g="${group}" data-i="${i}" tabindex="0" role="button"`;
  const inner = o.video && !o.thumb ? `<video src="${esc(o.video)}" muted preload="metadata"></video>` : thumb(o);
  return `<div class="play${o.empty ? " empty ph" : ""}"${kind}${o.h ? ` style="--h:${o.h}px"` : ""}><div class="media">${inner}</div><div class="cap"><span>${esc(o.title)}</span>${o.empty ? "" : `<i data-lucide="${o.video || o.link ? "play" : "maximize-2"}"></i>`}</div></div>`;
}
const fill = (id, list, fn) => { $(id).innerHTML = list.map(fn).join(""); };
const pick = (a, n, l, h) => a.length ? a : slots(n, l, h);
const GROUPS = { reels: REELS, films: FILMS, photos: PHOTOS };
fill("#apps", pick(APPS, 3, "App"), o => card(o, "phone"));
fill("#sites", pick(SITES, 2, "Website"), o => card(o, "browser"));
fill("#reels", pick(REELS, 4, "Reel"), (o, i) => play(o, i, "reels"));
fill("#films", pick(FILMS, 2, "Film"), (o, i) => play(o, i, "films"));
fill("#photos", pick(PHOTOS, 6, "Gallery", [300, 220, 360, 260, 320, 240]), (o, i) => play(o, i, "photos"));
$("#yr").textContent = new Date().getFullYear();

/* ----- Modal (video / photo lightbox) ----- */
const modal = $("#modal"), mbody = $("#mbody");
let lastFocus;
function openModal(g, i) {
  const o = GROUPS[g][i]; if (!o) return;
  lastFocus = document.activeElement;
  let h = "";
  if (o.video) h += `<video src="${esc(o.video)}" controls autoplay playsinline></video>`;
  else if (o.src) h += `<img src="${esc(o.src)}" alt="${esc(o.title)}">`;
  else if (o.thumb) h += `<img src="${esc(o.thumb)}" alt="${esc(o.title)}">`;
  h += `<div class="links"><b>${esc(o.title)}</b>${o.tag ? `<div class="tags"><span>${esc(o.tag)}</span></div>` : ""}${o.link ? `<a href="${esc(o.link)}" target="_blank" rel="noopener"><i data-lucide="instagram"></i>Open original</a>` : ""}</div>`;
  mbody.innerHTML = h; modal.hidden = false; icons();
  if (!reduce) gsap.fromTo(mbody, { scale: .92, opacity: 0 }, { scale: 1, opacity: 1, duration: .35, ease: "power3.out" });
  $("#mx").focus();
}
function closeModal() { modal.hidden = true; mbody.innerHTML = ""; lastFocus?.focus(); }
$("#mx").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
document.addEventListener("click", e => { const p = e.target.closest(".play[data-g]"); if (p) openModal(p.dataset.g, +p.dataset.i); });
document.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".play[data-g]")) { e.preventDefault(); e.target.click(); } });

/* ----- Tabs ----- */
$$(".tabs").forEach(t => t.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  $$("button", t).forEach(x => x.setAttribute("aria-selected", x === b));
  const view = t.closest(".view");
  $$(".panel", view).forEach(p => p.hidden = p.id !== "panel-" + b.dataset.tab);
  const p = $("#panel-" + b.dataset.tab);
  if (!reduce) gsap.from(p.children, { y: 30, opacity: 0, duration: .5, stagger: .06, ease: "power3.out" });
  ScrollTrigger.refresh();
}));

/* ----- View switching + signature transitions ----- */
const fx = $("#fx");
let cur = "home", busy = false;

function enter(v) {
  const el = $(`[data-view=${v}]`);
  el.hidden = false; scrollTo(0, 0);
  $$("nav button").forEach(b => b.classList.toggle("on", b.dataset.go === v));
  icons();
  if (!reduce) {
    if (v === "home") heroIntro();
    else gsap.from(el.querySelectorAll(".topbar,.big,.tabs,.panel:not([hidden]) > *"), { y: 40, opacity: 0, duration: .6, stagger: .07, ease: "power3.out" });
    // Staggered card reveal on scroll
    ScrollTrigger.batch(el.querySelectorAll(".item,.play,.card"), { once: true, start: "top 92%",
      onEnter: b => gsap.fromTo(b, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .08, ease: "power3.out", overwrite: true }) });
  }
  ScrollTrigger.refresh();
}
function swap(v) {
  $(`[data-view=${cur}]`).hidden = true; ScrollTrigger.getAll().forEach(s => s.kill());
  cur = v; enter(v);
}
function go(v) {
  if (busy) return;
  let scrollToContact = v === "contact";
  if (scrollToContact) v = "home";
  if (v === cur) { if (scrollToContact) $("#contact").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); else scrollTo({ top: 0, behavior: "smooth" }); return; }
  const after = () => { if (scrollToContact) $("#contact").scrollIntoView(); };
  const kind = v === "dev" ? "laptop" : v === "edit" ? "lens" : null;
  if (reduce) { swap(v); after(); return; }
  busy = true;
  const done = () => { busy = false; };
  if (!kind) { // quick fade for Home / Dev <-> Edit-free paths
    gsap.timeline({ onComplete: done }).to("main", { opacity: 0, duration: .2 }).add(() => { swap(v); after(); }).to("main", { opacity: 1, duration: .3 });
    return;
  }
  fx.dataset.kind = kind; fx.style.display = "grid";
  const obj = $(".obj." + kind, fx);
  const tl = gsap.timeline({ onComplete: () => { fx.style.display = "none"; gsap.set([fx, obj], { clearProps: "all" }); done(); } });
  tl.fromTo(fx, { opacity: 0 }, { opacity: 1, duration: .15 })
    .fromTo(obj, { scale: .45, y: 60, rotate: kind === "lens" ? -25 : 0, opacity: 0 }, { scale: 1, y: 0, rotate: 0, opacity: 1, duration: .38, ease: "back.out(1.6)" }, 0);
  if (kind === "lens") tl.to($(".blades", fx), { rotate: 60, duration: .3, ease: "power2.inOut" }, .2);
  tl.to(obj, { scale: kind === "lens" ? 16 : 14, duration: .45, ease: "power3.in" }, .45)   // zoom through screen / viewfinder
    .add(() => swap(v), .85)
    .to(fx, { opacity: 0, duration: .22 }, .9);                                           // total ≈ 1.1s
}

function heroIntro() {
  gsap.timeline()
    .fromTo(".photo", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" })
    .from(".photo img,.initials", { scale: 1.3, duration: 1.2, ease: "power3.out" }, 0)
    .from(".glow", { opacity: 0, scale: .6, duration: 1.2 }, 0)
    .from(".title .line span", { yPercent: 110, duration: .9, stagger: .1, ease: "power4.out" }, .3)
    .from(".badge", { opacity: 0, y: 14, duration: .6 }, .8)
    .from(".portal", { y: 50, opacity: 0, duration: .7, stagger: .12, ease: "power3.out" }, .9);
}

document.addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); });

/* ----- Magnetic buttons, portal spotlight, photo parallax, cursor ----- */
if (finePointer && !reduce) {
  document.addEventListener("mousemove", e => {
    const m = e.target.closest?.(".mag");
    $$(".mag").forEach(el => { if (el !== m) gsap.to(el, { x: 0, y: 0, duration: .5, ease: "elastic.out(1,.5)", overwrite: "auto" }); });
    if (m) { const r = m.getBoundingClientRect(); gsap.to(m, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .25, duration: .3, overwrite: "auto" });
      if (m.classList.contains("portal")) { m.style.setProperty("--mx", e.clientX - r.left + "px"); m.style.setProperty("--my", e.clientY - r.top + "px"); } }
    const ph = $(".photo-wrap");
    if (ph && cur === "home") gsap.to(ph, { x: (e.clientX / innerWidth - .5) * 18, y: (e.clientY / innerHeight - .5) * 12, duration: .8, ease: "power2.out" });
  });
  const c = $(".cursor"), mx = gsap.quickTo(c, "x", { duration: .15 }), my = gsap.quickTo(c, "y", { duration: .15 });
  document.body.classList.add("cursor-on");
  addEventListener("mousemove", e => { mx(e.clientX); my(e.clientY); });
  document.addEventListener("mouseover", e => gsap.to(c, { scale: e.target.closest("a,button,.play,input,select,textarea") ? 3 : 1, duration: .25 }));
}

/* ----- Contact form: emails you via Web3Forms, or opens WhatsApp / copies ----- */
const WEB3FORMS_KEY = "2e1bf0de-a912-4d94-9860-1d542441c3bc";
const form = $("#inquiry");
let mode = "mail";
$$("button[type=submit]", form).forEach(b => b.addEventListener("click", () => mode = b.dataset.mode));

form.addEventListener("submit", async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form)), err = $(".err", form);
  err.style.color = "";
  if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || d.message.trim().length < 5) {
    err.textContent = "Enter your name, a valid email and a message of at least 5 characters."; return;
  }
  err.textContent = "";
  const subject = `${d.track} inquiry from ${d.name}`;
  const text = `Hi Jadushan,\n\n${d.message}\n\nTrack: ${d.track}\nName: ${d.name}\nEmail: ${d.email}`;

  if (mode === "mail") {
    err.textContent = "Sending…";
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, name: d.name, email: d.email, track: d.track, message: d.message })
      });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      err.style.color = "#C7FF62"; err.textContent = "Message sent. I will reply to your email soon.";
      form.reset();
    } catch {
      err.textContent = "Could not send. Please use WhatsApp or email directly.";
    }
  } else if (mode === "wa") {
    open(`https://wa.me/94714598220?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  } else {
    try { await navigator.clipboard.writeText(text); err.style.color = "#C7FF62"; err.textContent = "Message copied."; }
    catch { err.textContent = "Copy failed. Select the text and copy it manually."; }
  }
});

/* ----- Boot ----- */
icons(); enter("home");
