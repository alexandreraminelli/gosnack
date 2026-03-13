/**
 * Patterns de expressões regulares (regex) para validação de textos.
 */
export const REGEX_PATTERNS = {
  upper: /[A-Z]/,
  lower: /[a-z]/,
  digit: /\d/,
  specialChar: /[^\w\s]/,
} as const
