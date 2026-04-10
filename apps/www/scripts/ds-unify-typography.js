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
    /font-mono text-\[13px\] leading-\[1\.8\] text-muted-foreground max-w-\[320px\]/g,
    "ds-lede",
  ],
  [
    /font-mono text-\[13px\] leading-\[1\.8\] text-muted-foreground ltr:text-right rtl:text-left md:block/g,
    "ds-lede ltr:text-right rtl:text-left md:block",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-muted-foreground\/70/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.2em\] text-muted-foreground\/70/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.2em\] text-primary\/35/g,
    "ds-kicker text-foreground/35",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.15em\] text-primary\/35/g,
    "ds-kicker text-foreground/35",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.15em\] text-primary\/40/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.25em\] text-primary\/40/g,
    "ds-kicker",
  ],
  [
    /font-mono text-xs uppercase tracking-\[0\.3em\] whitespace-nowrap text-muted-foreground\/70/g,
    "ds-kicker whitespace-nowrap",
  ],
  [/font-serif italic text-muted-foreground/g, "ds-headline-accent"],
  [/italic font-serif text-muted-foreground/g, "ds-headline-accent"],
  [
    /group mb-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-\[0\.18em\] text-primary\/40 hover:text-primary\/70 transition-colors duration-300/g,
    "ds-back-link mb-12",
  ],
  [
    /group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-\[0\.2em\] text-primary\/40 hover:text-primary\/70 transition-colors duration-300/g,
    "ds-back-link mb-10",
  ],
  [
    /group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-\[0\.18em\] text-primary\/40 hover:text-primary\/70 transition-colors duration-300/g,
    "ds-back-link gap-3",
  ],
  [
    /group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-\[0\.18em\] text-primary\/40 hover:text-primary\/70 transition-colors duration-300/g,
    "ds-back-link",
  ],
];

for (const f of files) {
  let s = fs.readFileSync(f, "utf8");
  const o = s;
  for (const [re, to] of reps) s = s.replace(re, to);
  if (s !== o) fs.writeFileSync(f, s);
}

console.log("ds-unify-typography: updated", files.length, "files scanned");
