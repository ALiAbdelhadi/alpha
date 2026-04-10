import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

async function* walk(dir) {
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) yield* walk(p);
    else if (name.name.endsWith(".tsx")) yield p;
  }
}

const SECTION_PAD = "pt-[var(--section-y-top)] pb-[var(--section-y-bottom)]";
const KICKER =
  "font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";

const META =
  "font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";
const BODY_LG =
  "text-[clamp(1.0625rem,1.05vw,1.125rem)] leading-[1.75]";
const BODY_SEC =
  "text-[clamp(0.9375rem,0.98vw,1rem)] leading-[1.7]";
const DS_LEDE =
  "text-[clamp(0.9375rem,0.98vw,1rem)] text-muted-foreground max-w-sm leading-relaxed md:max-w-xs lg:max-w-[20rem]";
const DS_HEADLINE_ACCENT =
  "font-serif italic font-light text-foreground/45 rtl:font-sans rtl:not-italic rtl:font-bold";
const DS_BACK =
  "inline-flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-foreground font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";
const DS_FORM_LABEL =
  "mb-2 block text-muted-foreground font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";
const DS_FORM_HINT =
  "mt-1.5 text-muted-foreground/80 font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";
const DS_WATERMARK =
  "font-mono text-xs leading-normal tracking-[0.22em] uppercase text-foreground/20 rtl:font-sans rtl:normal-case rtl:tracking-normal";
const DS_PAIN =
  "font-mono leading-normal uppercase text-2xl tracking-widest text-muted-foreground tabular-nums rtl:tracking-normal";
const DISPLAY_H1 =
  "text-[clamp(3rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.03em]";
const DISPLAY_H2 =
  "text-[clamp(2.125rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em]";
const DISPLAY_H3 =
  "text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.018em]";
const METRIC_VAL =
  "text-[clamp(22px,2.8vw,34px)] tracking-[-0.03em] tabular-nums";
const MONO_UP =
  "font-mono text-xs leading-normal tracking-[0.22em] uppercase rtl:font-sans rtl:normal-case rtl:tracking-normal";
const SURF_CARD = "rounded-md border border-border bg-card p-5 md:p-6";
const SURF_PANEL =
  "rounded-md border border-border bg-card/80 p-6 backdrop-blur-sm";
const SURF_LINK =
  "block rounded-md border border-border bg-card p-6 transition-colors hover:bg-muted/40";
const FONT_DISP_SER =
  "font-serif italic font-light rtl:font-sans rtl:not-italic rtl:font-bold";
const TEXT_DISP_ITAL = "text-foreground/45";

function migrateContent(s) {
  let t = s.replace(/\bsection-padding\b/g, SECTION_PAD);
  t = t.replace(/ds-kicker text-s-muted/g, `${KICKER} text-s-muted`);
  t = t.replace(/ds-kicker text-foreground\/40/g, `${KICKER} text-foreground/40`);
  t = t.replace(/ds-kicker text-foreground\/35/g, `${KICKER} text-foreground/35`);
  t = t.replace(/ds-kicker text-muted-foreground\/60/g, `${KICKER} text-muted-foreground/60`);
  t = t.replace(/\bds-kicker\b/g, `${KICKER} text-muted-foreground/70`);

  t = t.replace(/\bmono-uppercase\b/g, MONO_UP);
  t = t.replace(/\bmeta-eyebrow\b/g, META);
  t = t.replace(/\bdisplay-h1\b/g, DISPLAY_H1);
  t = t.replace(/\bdisplay-h2\b/g, DISPLAY_H2);
  t = t.replace(/\bdisplay-h3\b/g, DISPLAY_H3);
  t = t.replace(/\bbody-copy\b/g, BODY_LG);
  t = t.replace(/\bbody-lg\b/g, BODY_LG);
  t = t.replace(/\bbody-secondary\b/g, BODY_SEC);
  t = t.replace(/\bds-lede\b/g, DS_LEDE);
  t = t.replace(/\bds-headline-accent\b/g, DS_HEADLINE_ACCENT);
  t = t.replace(/\bds-back-link\b/g, DS_BACK);
  t = t.replace(/\bds-form-label\b/g, DS_FORM_LABEL);
  t = t.replace(/\bds-form-hint\b/g, DS_FORM_HINT);
  t = t.replace(/\bds-watermark-label\b/g, DS_WATERMARK);
  t = t.replace(/\bds-pain-index\b/g, DS_PAIN);
  
  t = t.replace(/\bmetric-value\b/g, METRIC_VAL);
  t = t.replace(/\bsurface-card\b/g, SURF_CARD);
  t = t.replace(/\bsurface-panel\b/g, SURF_PANEL);
  t = t.replace(/\bsurface-link-card\b/g, SURF_LINK);
  t = t.replace(/\bfont-display-serif\b/g, FONT_DISP_SER);
  t = t.replace(/\btext-display-italic\b/g, TEXT_DISP_ITAL);
  t = t.replace(/\bhero-title\b/g, `font-sans font-light text-foreground ${DISPLAY_H1}`);
  t = t.replace(/\bhero-copy\b/g, `text-muted-foreground ${BODY_LG}`);
  t = t.replace(/\bsection-title\b/g, `font-sans font-normal text-foreground ${DISPLAY_H2}`);
  t = t.replace(/\bsection-copy\b/g, `text-muted-foreground ${BODY_LG}`);
  t = t.replace(/\bsection-kicker\b/g, `${META} text-muted-foreground`);

  

  return t;
}

let count = 0;
for await (const file of walk(join(ROOT, "app"))) {
  const s = await readFile(file, "utf8");
  const n = migrateContent(s);
  if (n !== s) {
    await writeFile(file, n, "utf8");
    count++;
  }
}
for await (const file of walk(join(ROOT, "components"))) {
  const s = await readFile(file, "utf8");
  const n = migrateContent(s);
  if (n !== s) {
    await writeFile(file, n, "utf8");
    count++;
  }
}
console.log("files touched:", count);
