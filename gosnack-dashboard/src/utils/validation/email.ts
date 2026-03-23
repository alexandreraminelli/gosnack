import { APP_CONFIG } from "@/config/app.config"
import { UserRole } from "@/types/user.types"

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
 * Verifica se o e-mail é aceito para o papel do usuário.
 *
 * - **Admin, manager e employee:** aceitam apenas e-mails institucionais ou e-mails de desenvolvimento.
 * - **Customers:** qualquer e-mail, institucional ou não.
 */
export function isAllowedEmailForRole(email: string, role: UserRole): boolean {
  const workerRoles: UserRole[] = ["admin", "manager", "employee"]

  if (workerRoles.includes(role)) {
    // Conta de trabalho: apenas e-mail institucional ou e-mail de desenvolvimento
    return isInstitutionalEmail(email) || isDevEmail(email)
  }
  // Conta de cliente: qualquer e-mail é aceito
  return true
}

/**
 * Verifica se um e-mail deve ser criado sem enviar convite por e-mail, ou seja, se o e-mail for institucional fictício e não for de desenvolvimento.
 */
export function shouldSkipInvite(email: string): boolean {
  return isFictionalEmail(email) && !isDevEmail(email)
}
