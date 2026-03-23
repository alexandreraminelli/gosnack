import { APP_CONFIG } from "@/config/app.config"

/**
 * Verifica se um e-mail pertence ao domínio institucional.
 */
export function isInstitutionalEmail(email: string): boolean {
  return email.toLowerCase().endsWith(APP_CONFIG.email.emailDomain)
}

/**
 * Verifica se o e-mail é fictício, ou seja, se o domínio institucional for marcado como fictício.
 */
export function isFictionalEmail(email: string): boolean {
  return APP_CONFIG.email.isFictitiousDomain && isInstitutionalEmail(email)
}

/**
 * Verifica se um e-mail é um e-mail de desenvolvimento para testes.
 */
export function isDevEmail(email: string): boolean {
  return APP_CONFIG.email.devEmails.some((devEmail) => devEmail.toLowerCase() === email.toLowerCase())
}

/**
 * Verifica se o e-mail é aceito pelo sistema.
 */
export function isAllowedEmail(email: string): boolean {
  return isInstitutionalEmail(email) || isDevEmail(email)
}

/**
 * Verifica se um e-mail deve ser criado sem enviar convite por e-mail, ou seja, se o e-mail for institucional fictício e não for de desenvolvimento.
 */
export function shouldSkipInvite(email: string): boolean {
  return isFictionalEmail(email) && !isDevEmail(email)
}
