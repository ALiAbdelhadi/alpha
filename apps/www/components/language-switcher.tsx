"use client"

/**
 * Language Switcher Components
 * 
 * Wrapper components that use the unified LanguageSwitcherBase.
 * Maintains backward compatibility while eliminating code duplication.
 */

import { LanguageSwitcherBase } from "./base/language-switcher-base"

export function LanguageChanger() {
  return <LanguageSwitcherBase variant="default" />
}

export function LanguageChangerCompact() {
  return <LanguageSwitcherBase variant="compact" />
}

export function LanguageChangerToggle() {
  return <LanguageSwitcherBase variant="toggle" />
}