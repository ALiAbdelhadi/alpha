const fs = require("fs");
const path = require("path");

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory() && e.name !== "node_modules" && e.name !== ".next")
      walk(p, acc);
    else if (e.isFile() && e.name.endsWith(".tsx")) acc.push(p);
  }
  return acc;
}

const root = path.join(__dirname, "..");
const files = walk(root);

const reps = [
  [
    /font-mono text-xs text-primary\/50 uppercase tracking-\[0\.25em\]/g,
    "ds-watermark-label",
  ],
  [
    /font-mono text-xs uppercase text-muted-foreground\/70 tracking-\[0\.25em\]/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs text-muted-foreground\/70 tracking-\[0\.2em\]/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs text-primary\/20 tracking-\[0\.2em\]/g,
    "ds-watermark-label tracking-[0.2em]",
  ],
  [
    /font-mono text-xs text-primary\/30 tracking-widest/g,
    "ds-watermark-label tracking-widest",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-primary\/20/g,
    "ds-watermark-label",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-foreground\/40 mb-4/g,
    "ds-kicker text-foreground/40 mb-4",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-foreground\/40 mb-3/g,
    "ds-kicker text-foreground/40 mb-3",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-muted-foreground\/60 mb-6 block/g,
    "ds-kicker text-muted-foreground/60 mb-6 block",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.2em\] text-primary\/40/g,
    "ds-kicker",
  ],
  [
    /Label className="font-mono text-xs uppercase tracking-\[0\.18em\] text-primary\/40 mb-2 block"/g,
    'Label className="ds-form-label"',
  ],
  [
    /Label className="font-mono text-xs uppercase tracking-\[0\.18em\] text-primary\/40 mb-2 flex items-center gap-1\.5"/g,
    'Label className="ds-form-label flex items-center gap-1.5"',
  ],
  [
    /Label className="font-mono text-xs text-primary\/40 uppercase tracking-\[0\.18em\] mb-2 block"/g,
    'Label className="ds-form-label"',
  ],
  [
    /className="mt-1\.5 font-mono text-xs text-muted-foreground\/70 uppercase tracking-\[0\.15em\]"/g,
    'className="ds-form-hint"',
  ],
  [
    /className="text-center font-mono text-xs text-muted-foreground\/70 uppercase tracking-\[0\.15em\]"/g,
    'className="ds-form-hint text-center"',
  ],
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const o = s;
  for (const [re, to] of reps) s = s.replace(re, to);
  if (s !== o) fs.writeFileSync(f, s);
}

console.log("ds-unify-typography-2: done");
