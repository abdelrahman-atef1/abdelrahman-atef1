// Builds assets/github-stats.svg from the public GitHub API. No dependencies, no secrets beyond the
// workflow's own GITHUB_TOKEN (optional: only raises the rate limit). Output is committed inside this repo.
import fs from 'node:fs';

const USER = 'abdelrahman-atef1';
const headers = { 'User-Agent': 'profile-stats', Accept: 'application/vnd.github+json' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function get(url) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}

const user = await get(`https://api.github.com/users/${USER}`);
let repos = [];
for (let page = 1; page <= 5; page++) {
  const batch = await get(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&page=${page}`);
  repos = repos.concat(batch);
  if (batch.length < 100) break;
}
const own = repos.filter((r) => !r.fork);
const langs = {};
for (const r of own) if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
const topLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 4);
const since = new Date(user.created_at).getUTCFullYear();

const years = new Date().getUTCFullYear() - since;
const cells = [
  [String(years), 'years on GitHub'],
  [String(own.length), 'public repositories'],
  [topLangs.length ? topLangs[0][0] : '-', 'most-used language'],
  [String(user.followers), 'followers'],
];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const F = 'font-family="Segoe UI, Helvetica, Arial, sans-serif"';
const card = (i, [n, label]) => {
  const x = i * 300;
  return `<rect x="${x}" y="0" width="282" height="120" rx="14" fill="#0f172a"/>
<text x="${x + 141}" y="66" text-anchor="middle" ${F} font-size="52" font-weight="800" fill="url(#n)">${esc(n)}</text>
<text x="${x + 141}" y="98" text-anchor="middle" ${F} font-size="17" fill="#e2e8f0">${esc(label)}</text>`;
};
const langLine = topLangs.map(([l, c]) => `${l} ${c}`).join('   ·   ');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1182" height="160" viewBox="0 0 1182 160" role="img" aria-label="GitHub: ${own.length} public repositories, ${user.followers} followers, ${years} years">
<defs><linearGradient id="n" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5eead4"/><stop offset="1" stop-color="#60a5fa"/></linearGradient></defs>
${cells.map((c, i) => card(i, c)).join('\n')}
<text x="591" y="148" text-anchor="middle" ${F} font-size="14" fill="#64748b">Own repositories by language: ${esc(langLine)}</text>
</svg>
`;
fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync('assets/github-stats.svg', svg);
console.log(cells.map((c) => c.join(' ')).join(' | '), '|', langLine);
