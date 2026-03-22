// lib/motion/utils/split.ts
// ─────────────────────────────────────────────────────────────
// DOM-safe text splitting utilities.
// These operate on actual DOM nodes - NOT innerHTML string replacement -
// so child elements like <em>, <span>, <strong> are preserved intact.
// ─────────────────────────────────────────────────────────────

/**
 * Wraps each word in the element's text nodes with a reveal span.
 * Preserves existing child elements (italic spans, links, etc).
 */
export function splitIntoWords(element: HTMLElement): Element[] {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Node | null

    while ((node = walker.nextNode())) {
        textNodes.push(node as Text)
    }

    for (const textNode of textNodes) {
        const raw = textNode.textContent ?? ""
        if (!raw.trim()) continue

        const parts = raw.split(/(\s+)/)
        const fragment = document.createDocumentFragment()

        for (const part of parts) {
            if (/^\s+$/.test(part)) {
                fragment.appendChild(document.createTextNode(part))
            } else if (part.length > 0) {
                const span = document.createElement("span")
                span.className = "m-word"
                span.style.cssText = "display:inline-block;white-space:nowrap"
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
 */
export function splitIntoLines(element: HTMLElement): Element[] {
    const childNodes = Array.from(element.childNodes)
    element.innerHTML = ""

    const createLine = () => {
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