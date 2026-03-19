import { ErrorWithCode } from "@/lib/supabase/errors/error.types"

/**
 * Códigos de erro do Supabase Auth.
 *
 * @see https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
 */
export const AUTH_ERROR_CODES = {
  // Login
  invalidCredentials: "invalid_credentials",
  emailNotConfirmed: "email_not_confirmed",
  userNotFound: "user_not_found",
  userBanned: "user_banned",

  // Criar usuário por admin
  emailExists: "email_exists",
  userAlreadyExists: "user_already_exists",

  // Criar ou recuperar senha
  weakPassword: "weak_password",
  otpExpired: "otp_expired",

  // Rate limits
  tooManyRequests: "too_many_requests",
  overRequestRateLimit: "over_request_rate_limit",

  // Genérico
  unexpectedFailure: "unexpected_failure",
}

/**
 * Tipo que representa os códigos de erro do Supabase Auth, baseado no objeto `AUTH_ERROR_CODES`.
 */
type AuthErrorCode = (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES]

/**
 * Set dos códigos de erro do Supabase Auth para validação rápida.
 */
const AUTH_ERROR_CODE_SET = new Set<AuthErrorCode>(Object.values(AUTH_ERROR_CODES) as AuthErrorCode[])

/**
 * Mapeamento dos códigos de erro de autenticação do Supabase para mensagens
 * de erro em português amigáveis ao usuário.
 *
 * @see https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
 */
const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
  // Login
  [AUTH_ERROR_CODES.invalidCredentials]: "E-mail ou senha incorretos.",
  [AUTH_ERROR_CODES.emailNotConfirmed]: "Confirme seu e-mail antes de entrar.",
  [AUTH_ERROR_CODES.userNotFound]: "Nenhuma conta encontrada com esse e-mail.",
  [AUTH_ERROR_CODES.userBanned]: "Sua conta foi suspensa. Entre em contato com o suporte.",

  // Criar usuário por admin
  [AUTH_ERROR_CODES.emailExists]: "Já existe um usuário com esse e-mail.",
  [AUTH_ERROR_CODES.userAlreadyExists]: "Já existe um usuário com esse e-mail.",

  // Criar ou recuperar senha
  [AUTH_ERROR_CODES.weakPassword]: "A senha não atende aos requisitos de segurança.",
  [AUTH_ERROR_CODES.otpExpired]: "O link de recuperação expirou. Solicite um novo.",

  // Rate limits
  [AUTH_ERROR_CODES.tooManyRequests]: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  [AUTH_ERROR_CODES.overRequestRateLimit]: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",

  // Genérico
  [AUTH_ERROR_CODES.unexpectedFailure]: "Ocorreu um erro inesperado. Tente novamente.",
} as const

/**
 * Verifica se o código de erro pertence ao Supabase Auth.
 */
export function isAuthErrorCode(code: string | undefined): code is AuthErrorCode {
  return !!code && AUTH_ERROR_CODE_SET.has(code as AuthErrorCode)
}

/**
 * Retorna uma mensagem de erro legível pro usuário para um código de erro
 * do Supabase Auth.
 *
 * @see https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
 *
 * @param code O código de erro retornado pelo Supabase Auth. `error.code`
 * @param fallback Mensagem de erro genérica a ser usada caso o código não seja
 * reconhecido.
 *
 */
export function getAuthErrorMessage(error: ErrorWithCode, fallback: string): string {
  const code = error?.code
  if (!code) return fallback
  return AUTH_ERROR_MESSAGES[code] ?? fallback
}
