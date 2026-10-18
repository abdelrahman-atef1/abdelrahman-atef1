// Renders README.md to preview/index.html (images embedded as data URIs, opens standalone).
// Run: node scripts/render-preview.mjs   Tiny GitHub-like markdown subset; no dependencies.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mime = { ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png" };
const inline = (s) =>
  s.replace(/`([^`]+)`/g, "<code>$1</code>")
   .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
   .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
const cells = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
const lines = readFileSync(join(root, "README.md"), "utf8").split(/\r?\n/);
const out = []; let i = 0;
while (i < lines.length) {
  const l = lines[i];
  if (!l.trim()) { i++; continue; }
  if (/^<table/.test(l)) { // raw html table block, pass through
    while (i < lines.length) { out.push(lines[i]); if (/<\/table>/.test(lines[i++])) break; }
    continue;
  }
  if (/^---+$/.test(l)) { out.push("<hr>"); i++; continue; }
  let m;
  if ((m = l.match(/^(#{1,6}) (.*)/))) { out.push(`<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`); i++; continue; }
  if (l.startsWith("|")) {
    const head = cells(l); i += 2; const rows = [];
    while (i < lines.length && lines[i].startsWith("|")) rows.push(cells(lines[i++]));
    out.push("<table><tr>" + head.map((h) => `<th>${inline(h)}</th>`).join("") + "</tr>" +
      rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</table>");
    continue;
  }
  if (/^- /.test(l)) {
    const items = [];
    while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2));
    out.push("<ul>" + items.map((x) => `<li>${inline(x)}</li>`).join("") + "</ul>"); continue;
  }
  if (/^<(div|\/div)/.test(l.trim()) && !/[a-z]/i.test(l.replace(/<[^>]*>/g, ""))) { out.push(l); i++; continue; }
  const buf = [];
  while (i < lines.length && lines[i].trim() && !/^(#|\||- |---|<table)/.test(lines[i])) buf.push(lines[i++]);
  out.push(/^<(div|\/div)/.test(buf[0]) && buf.length === 1 ? inline(buf[0]) : "<p>" + inline(buf.join("\n")) + "</p>");
}
let html = out.join("\n").replace(/src="(assets\/[^"]+)"/g, (_, p) =>
  `src="data:${mime[extname(p)]};base64,${readFileSync(join(root, p)).toString("base64")}"`);
const css = `body{background:#0d1117;color:#e6edf3;font:16px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:900px;margin:0 auto;padding:32px 24px}
a{color:#4493f8}h2{border-bottom:1px solid #30363d;padding-bottom:.3em;margin-top:28px}hr{border:0;border-top:1px solid #30363d}
table{border-collapse:collapse;margin:12px 0;display:block;overflow:auto}td,th{border:1px solid #30363d;padding:6px 13px;text-align:left}
code{background:#6e768166;padding:.2em .4em;border-radius:6px;font-size:85%}img{max-width:100%}`;
mkdirSync(join(root, "preview"), { recursive: true });
writeFileSync(join(root, "preview", "index.html"),
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>README preview</title><style>${css}</style><body>${html}`);
console.log("preview/index.html", Math.round(html.length / 1024) + " KB");
