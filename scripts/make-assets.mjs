// Regenerates the shiny SVGs in ../assets (banner, stats, tech, achievement badges, whisper-flow tile).
// Run: node scripts/make-assets.mjs   Pure SVG, self-hosted, no external fonts or images.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const out = (f, s) => writeFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "assets", f), s);
const F = `font-family="Segoe UI, Helvetica, Arial, sans-serif"`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

// ---------- banner ----------
out("banner.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="340" viewBox="0 0 1200 340" role="img" aria-label="Abdelrahman Atef, Senior Flutter Developer">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#070b1a"/><stop offset=".5" stop-color="#0e2146"/><stop offset="1" stop-color="#0a6f66"/></linearGradient>
<linearGradient id="ac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5eead4"/><stop offset=".5" stop-color="#60a5fa"/><stop offset="1" stop-color="#c084fc"/></linearGradient>
<linearGradient id="nm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#bfdbfe"/></linearGradient>
<radialGradient id="g1" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5eead4" stop-opacity=".55"/><stop offset="1" stop-color="#5eead4" stop-opacity="0"/></radialGradient>
<radialGradient id="g2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#a78bfa" stop-opacity=".5"/><stop offset="1" stop-color="#a78bfa" stop-opacity="0"/></radialGradient>
<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
<clipPath id="r"><rect width="1200" height="340" rx="22"/></clipPath>
</defs>
<g clip-path="url(#r)">
<rect width="1200" height="340" fill="url(#bg)"/><rect width="1200" height="340" fill="url(#grid)"/>
<circle cx="1010" cy="60" r="260" fill="url(#g1)"><animate attributeName="cx" values="1010;960;1010" dur="9s" repeatCount="indefinite"/></circle>
<circle cx="140" cy="330" r="240" fill="url(#g2)"><animate attributeName="cx" values="140;200;140" dur="11s" repeatCount="indefinite"/></circle>
<g fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="1.5"><circle cx="1040" cy="90" r="170"/><circle cx="1040" cy="90" r="118"/><circle cx="1040" cy="90" r="66"/></g>
<g transform="translate(1040 90)"><path d="M-26 8 L10 -28 H34 L-2 8 Z" fill="#5eead4" opacity=".9"/><path d="M-26 8 L-2 32 H22 L-2 8 Z" fill="#60a5fa" opacity=".9"/><path d="M-2 8 L10 -4 L34 20 H10 Z" fill="#c084fc" opacity=".7"/></g>
<text x="64" y="86" ${F} font-size="20" font-weight="700" letter-spacing="6" fill="#5eead4">SENIOR FLUTTER DEVELOPER</text>
<text x="62" y="170" ${F} font-size="76" font-weight="800" fill="url(#nm)">Abdelrahman Atef</text>
<rect x="64" y="192" width="170" height="7" rx="3.5" fill="url(#ac)"/>
<text x="64" y="244" ${F} font-size="26" fill="#dbeafe">I ship Flutter apps to production, and back new projects with better services, free.</text>
<rect x="-300" y="0" width="260" height="340" fill="url(#sh)" transform="skewX(-20)"><animate attributeName="x" values="-300;1500" dur="6s" repeatCount="indefinite"/></rect>
</g>
<rect x="1" y="1" width="1198" height="338" rx="21" fill="none" stroke="url(#ac)" stroke-opacity=".7" stroke-width="2"/>
</svg>
`);

// ---------- stats ----------
const cards = [
  ["10", "apps built in total", "(5 in the stores)", "#5eead4", "#38bdf8"],
  ["16", "packages built in total", "(3 on pub.dev)", "#60a5fa", "#818cf8"],
  ["5th", "place, Google hackathon", "Sense More, with my team", "#c084fc", "#f472b6"],
  ["2", "weeks to a working app", "Rayeh, from an empty page", "#fbbf24", "#fb923c"],
];
let sc = "";
cards.forEach(([n, l, s], i) => {
  const x = i * 306;
  sc += `<g transform="translate(${x} 0)">
<rect width="282" height="200" rx="18" fill="url(#cb)"/><rect x="1" y="1" width="280" height="198" rx="17" fill="none" stroke="url(#s${i})" stroke-width="2"/>
<path d="M18 0H264a18 18 0 0 1 18 18V70C190 96 90 96 0 70V18A18 18 0 0 1 18 0Z" fill="#fff" fill-opacity=".07"/>
<rect x="60" y="0" width="162" height="4" rx="2" fill="url(#s${i})"/>
<text x="141" y="102" text-anchor="middle" font-size="88" font-weight="800" fill="url(#s${i})">${n}</text>
<text x="141" y="142" text-anchor="middle" font-size="20" font-weight="600" fill="#f1f5f9">${esc(l)}</text>
<text x="141" y="170" text-anchor="middle" font-size="16" fill="#94a3b8">${esc(s)}</text></g>`;
});
const grads = cards.map(([, , , a, b], i) => `<linearGradient id="s${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`).join("");
out("stats.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="200" viewBox="0 0 1200 200" role="img" aria-label="10 apps built in total (5 in the stores), 16 packages built in total (3 on pub.dev), 5th place at a Google hackathon, Rayeh from an empty page to a working app in 2 weeks">
<defs><linearGradient id="cb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#162039"/><stop offset="1" stop-color="#0a1020"/></linearGradient>${grads}
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g ${F}>${sc}</g></svg>
`);

// ---------- tech pills ----------
const tech = [
  ["Flutter", "#38bdf8"], ["Dart", "#2dd4bf"], ["Firebase", "#fbbf24"], ["BLoC / Cubit", "#60a5fa"], ["GetX", "#a78bfa"],
  ["Clean Architecture", "#34d399"], ["MVVM", "#f472b6"], ["SOLID", "#fb923c"], ["REST", "#38bdf8"], ["WebSockets", "#2dd4bf"],
  ["Google Maps", "#f87171"], ["Stripe", "#818cf8"], ["PayTabs", "#fbbf24"], ["Claude Code", "#fb923c"], ["Cursor", "#e2e8f0"], ["Git", "#f87171"],
];
const pillW = (t) => Math.round(t.length * 9.2 + 56);
const rows = [[], []];
let w0 = 0;
const half = tech.reduce((s, [t]) => s + pillW(t) + 12, 0) / 2;
tech.forEach((p) => { const r = w0 < half ? 0 : 1; rows[r].push(p); if (r === 0) w0 += pillW(p[0]) + 12; });
let tp = "", defs = "";
rows.forEach((row, ri) => {
  const total = row.reduce((s, [t]) => s + pillW(t), 0) + (row.length - 1) * 12;
  let x = (1200 - total) / 2;
  row.forEach(([t, c], i) => {
    const w = pillW(t), id = `p${ri}${i}`;
    defs += `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c}" stop-opacity=".38"/><stop offset="1" stop-color="${c}" stop-opacity=".1"/></linearGradient>`;
    tp += `<g transform="translate(${x.toFixed(1)} ${ri * 56})"><rect width="${w}" height="44" rx="22" fill="#0b1224"/><rect width="${w}" height="44" rx="22" fill="url(#${id})"/>
<rect x="1" y="1" width="${w - 2}" height="42" rx="21" fill="none" stroke="${c}" stroke-opacity=".8" stroke-width="1.5"/>
<path d="M22 1H${w - 22}a21 21 0 0 1 21 14C${w * 0.6} 22 ${w * 0.4} 22 1 15A21 21 0 0 1 22 1Z" fill="#fff" fill-opacity=".14"/>
<circle cx="24" cy="22" r="6" fill="${c}"/><circle cx="22.5" cy="20.5" r="2" fill="#fff" fill-opacity=".7"/>
<text x="40" y="28" font-size="17" font-weight="700" fill="#f8fafc">${esc(t)}</text></g>`;
    x += w + 12;
  });
});
out("tech.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="100" viewBox="0 0 1200 100" role="img" aria-label="Tech: ${tech.map((t) => t[0]).join(", ")}"><defs>${defs}</defs><g ${F}>${tp}</g></svg>
`);

// ---------- compact Upwork strip (one line) ----------
{
  const items = [["Top Rated", "#22c55e"], ["100% Job Success", "#22c55e"], ["5 Stars", "#fbbf24"], ["Rising Talent", "#38bdf8"]];
  let x = 84, g = '<text x="0" y="23" font-size="13" font-weight="800" letter-spacing="2" fill="#94a3b8">UPWORK</text>';
  for (const [t, c] of items) {
    const w = Math.round(t.length * 8.4 + 36);
    g += `<g transform="translate(${x} 0)"><rect width="${w}" height="34" rx="17" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-opacity=".75"/><circle cx="17" cy="17" r="4" fill="${c}"/><text x="30" y="22" font-size="14" font-weight="700" fill="#e2e8f0">${t}</text></g>`;
    x += w + 10;
  }
  out("upwork-strip.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="${x}" height="36" viewBox="0 0 ${x} 36" role="img" aria-label="Upwork: Top Rated, 100% Job Success, 5 Stars, Rising Talent"><g ${F}>${g}</g></svg>
`);
}

// ---------- Whisper Flow tile (no screenshot exists, text-only product) ----------
out("whisper-flow.svg", `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="300" viewBox="0 0 340 300" role="img" aria-label="Whisper Flow, talk and your words appear in any text box">
<defs><linearGradient id="w" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0e2146"/><stop offset="1" stop-color="#0a6f66"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
<rect width="340" height="300" rx="20" fill="url(#w)"/><rect x="1.5" y="1.5" width="337" height="297" rx="18.5" fill="none" stroke="url(#a)" stroke-width="2.5"/>
<path d="M20 0H320a20 20 0 0 1 20 20V90C230 130 110 130 0 90V20A20 20 0 0 1 20 0Z" fill="#fff" fill-opacity=".08"/>
<rect x="148" y="62" width="44" height="86" rx="22" fill="url(#a)"/><path d="M122 120a48 48 0 0 0 96 0M170 168v26M144 196h52" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
<rect x="40" y="238" width="260" height="10" rx="5" fill="url(#a)" fill-opacity=".35"/><rect x="40" y="258" width="170" height="10" rx="5" fill="url(#a)" fill-opacity=".25"/></svg>
`);
console.log("ok");
