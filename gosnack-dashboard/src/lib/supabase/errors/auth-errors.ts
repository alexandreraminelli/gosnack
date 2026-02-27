/**
 * Mapeamento dos códigos de erro de autenticação do Supabase para mensagens
 * de erro em português amigáveis ao usuário.
 *
 * Fonte: https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // Login
  invalid_credentials: "E-mail ou senha incorretos.",
  email_not_confirmed: "Confirme seu e-mail antes de entrar.",
  user_not_found: "Nenhuma conta encontrada com esse e-mail.",
  user_banned: "Sua conta foi suspensa. Entre em contato com o suporte.",

  // Rate limits
  too_many_requests: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  over_request_rate_limit: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",

  // Recuperação de senha
  otp_expired: "O link de recuperação expirou. Solicite um novo.",

  // Genérico
  unexpected_failure: "Ocorreu um erro inesperado. Tente novamente.",
} as const

/**
 * Retorna uma mensagem de erro legível pro usuário para um código de erro
 * do Supabase Auth.
 *
 * Fonte: https://supabase.com/docs/guides/auth/debugging/error-codes#auth-error-codes-table
 *
 * @param code O código de erro retornado pelo Supabase Auth. `error.code`
 * @param fallback Mensagem de erro genérica a ser usada caso o código não seja
 * reconhecido.
 *
 */
export function getAuthErrorMessage(code: string | undefined, fallback: string): string {
  if (!code) return fallback
  return AUTH_ERROR_MESSAGES[code] || fallback
}
