import { AUTH_ERROR_CODES, AuthErrorCode } from "@/domains/auth/types/auth-error";
import { isAuthError } from "@supabase/supabase-js";

/**
 * Mapper que converte erros do Supabase Auth em mensagens amigáveis para o
 * usuário.
 */
export function mapAuthError(error: unknown): AuthErrorCode {
  if (
    isAuthError(error) && // Se for erro de autenticação do Supabase
    error.code // Se possui o atributo code
  ) {
    const knownError = AUTH_ERROR_CODES as readonly string[];
    // Retornar código de erro conhecido, caso exista
    if (knownError.includes(error.code)) return error.code as AuthErrorCode;
  }
  return "unknown";
}
