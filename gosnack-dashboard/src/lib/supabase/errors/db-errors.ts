import { PostgrestError } from "@supabase/supabase-js"

/**
 * Códigos de erro do PostgreSQL.
 *
 * Fonte: https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
export const DB_ERROR_CODES = {
  uniqueViolation: "23505",
  foreignKeyViolation: "23503",
  notNullViolation: "23502",
  insufficientPrivilege: "42501",
} as const

/**
 * Mapeamento dos códigos de erro do PostgreSQL para mensagens
 * de erro em português amigáveis ao usuário.
 *
 * Fonte: https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
const DB_ERROR_MESSAGES: Record<string, string> = {
  [DB_ERROR_CODES.uniqueViolation]: "Já existe um registro com essas informações.",
  [DB_ERROR_CODES.foreignKeyViolation]: "Este registro está vinculado a outros dados.",
  [DB_ERROR_CODES.notNullViolation]: "Preencha todos os campos obrigatórios.",
  [DB_ERROR_CODES.insufficientPrivilege]: "Você não tem permissão para realizar esta ação.",
}

/**
 * Retorna uma mensagem de erro legível para um erro do Supabase/PostgreSQL.
 *
 * @param error Erro retornado pelo Supabase.
 * @param fallback Mensagem genérica caso o código não seja reconhecido.
 */
export function getDbErrorMessage(error: PostgrestError, fallback: string): string {
  if (!error?.code) return fallback
  return DB_ERROR_MESSAGES[error.code] ?? fallback
}
