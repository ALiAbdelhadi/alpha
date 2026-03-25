// lib/motion/utils/splite.ts
// ─────────────────────────────────────────────────────────────
// DOM-safe text splitting utilities.
//
// Arabic-aware: Arabic text is NEVER split by character because
// Arabic letters are contextual glyphs — each letter's shape depends
// on its neighbours. Wrapping a character in an isolated inline-block
// removes that context, producing broken/unreadable rendering.
//
// Strategy per script:
//   Arabic / RTL  → word-level split only (ligatures preserved inside)
//   Latin / other → character-level split (for per-char stagger FX)
//
// Performance:
//   - willChange is NOT set here; managed by the GSAP hook after setup
//   - Spans carry data-script attribute so hooks can suppress blur on AR
// ─────────────────────────────────────────────────────────────

// ── Script detection ──────────────────────────────────────────

/**
 * Returns true if the string contains a dominant proportion of
 * Arabic / Hebrew / RTL characters.
 *
 * We check the Unicode ranges for Arabic (0600-06FF + 0750-077F + FB50-FDFF + FE70-FEFF)
 * and Hebrew (0590-05FF). A string is considered RTL when >30 % of its
 * non-space characters fall in those ranges — handles mixed AR/EN strings.
 */
export function isRTLText(text: string): boolean {
    const rtlRange = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF\u0590-\u05FF]/g
    const stripped = text.replace(/\s/g, "")
    if (!stripped.length) return false
    const rtlCount = (stripped.match(rtlRange) ?? []).length
    return rtlCount / stripped.length > 0.3
}

/**
 * Wraps each character in the element's text nodes with a reveal span.
 * For Latin/neutral scripts only — never call this on Arabic text.
 *
 * Preserves existing child elements (italic spans, links, etc).
 * Returns the created .m-char spans for GSAP targeting.
 */
export function splitIntoChars(element: HTMLElement): Element[] {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Node | null

    while ((node = walker.nextNode())) {
        if ((node as Text).textContent?.trim()) {
            textNodes.push(node as Text)
        }
    }

    for (const textNode of textNodes) {
        const raw = textNode.textContent ?? ""
        if (!raw.trim()) continue

        const fragment = document.createDocumentFragment()

        for (const ch of raw) {
            if (/\s/.test(ch)) {
                // preserve spaces as plain text nodes — do NOT wrap them
                fragment.appendChild(document.createTextNode(ch === " " ? "\u00A0" : ch))
            } else {
                const span = document.createElement("span")
                span.className = "m-char"
                span.dataset.script = "latin"
                // inline-block is safe for Latin — each glyph is independent
                span.style.cssText = "display:inline-block"
                span.textContent = ch
                fragment.appendChild(span)
            }
        }

        textNode.parentNode?.replaceChild(fragment, textNode)
    }

    return Array.from(element.querySelectorAll(".m-char"))
}

/**
 * Wraps each word in the element's text nodes with a reveal span.
 * Preserves existing child elements (italic spans, links, etc).
 *
 * Safe for BOTH Latin and Arabic because the entire word is kept intact
 * inside the span — Arabic ligature formation is preserved within each word.
 *
 * @param element  - Target DOM element
 * @param script   - "arabic" | "latin" — stored as data attribute for hooks
 */
export function splitIntoWords(
    element: HTMLElement,
    script: "arabic" | "latin" = "latin",
): Element[] {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Node | null

    while ((node = walker.nextNode())) {
        textNodes.push(node as Text)
    }

    for (const textNode of textNodes) {
        const raw = textNode.textContent ?? ""
        if (!raw.trim()) continue

        // Split on whitespace boundaries, keeping delimiters
        const parts = raw.split(/(\s+)/)
        const fragment = document.createDocumentFragment()

        for (const part of parts) {
            if (/^\s+$/.test(part)) {
                // real whitespace node — keeps natural spacing
                fragment.appendChild(document.createTextNode(part))
            } else if (part.length > 0) {
                const span = document.createElement("span")
                span.className = "m-word"
                span.dataset.script = script
                span.style.cssText =
                    script === "arabic"
                        ? // For Arabic: inline keeps bidi flow; nowrap prevents mid-word breaks
                        "display:inline;white-space:nowrap"
                        : "display:inline-block;white-space:nowrap"
                span.textContent = part
                fragment.appendChild(span)
            }
        }

        textNode.parentNode?.replaceChild(fragment, textNode)
    }

    return Array.from(element.querySelectorAll(".m-word"))
}

/**
 * Splits element content into line spans using <br /> as delimiter.
 * Preserves inline child elements within each line.
 * Works for both Arabic and Latin — lines are not character-split.
 */
export function splitIntoLines(element: HTMLElement): Element[] {
    const childNodes = Array.from(element.childNodes)
    element.innerHTML = ""

    const createLine = (): HTMLSpanElement => {
        const span = document.createElement("span")
        span.className = "m-line"
        span.style.cssText = "display:block"
        return span
    }

    let currentLine = createLine()

    for (const child of childNodes) {
        if ((child as Element).tagName === "BR") {
            element.appendChild(currentLine)
            currentLine = createLine()
        } else {
            currentLine.appendChild(child.cloneNode(true))
        }
    }

    element.appendChild(currentLine)
    return Array.from(element.querySelectorAll(".m-line"))
}

/**
 * Auto-detects the dominant script in an element's text and applies
 * the safest split strategy:
 *   - Arabic/RTL text  → word split (never char-split, never blur)
 *   - Latin text       → respects caller's preference (char or word)
 *
 * Returns { targets, isRTL, canBlur }
 * `canBlur` is false for RTL — blur on many tiny Arabic spans is both
 * visually poor and GPU-heavy.
 */
export function autoSplit(
    element: HTMLElement,
    preference: "char" | "word" | "line" = "char",
): { targets: Element[]; isRTL: boolean; canBlur: boolean } {
    const text = element.textContent ?? ""
    const rtl = isRTLText(text)

    let targets: Element[]

    if (rtl) {
        // Arabic: always word-level. Never char-split.
        targets = splitIntoWords(element, "arabic")
        return { targets, isRTL: true, canBlur: false }
    }

    switch (preference) {
        case "char":
            targets = splitIntoChars(element)
            break
        case "word":
            targets = splitIntoWords(element, "latin")
            break
        case "line":
            targets = splitIntoLines(element)
            break
    }

    return { targets, isRTL: false, canBlur: true }
}