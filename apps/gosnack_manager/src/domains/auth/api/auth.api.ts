import { mapAuthError } from "@/domains/auth/mappers/auth-error.mapper";
import { LoginInput } from "@/domains/auth/schemas/login.schema";
import { SignUpInput } from "@/domains/auth/schemas/sign-up.schema";
import { AuthErrorCode } from "@/domains/auth/types/auth-error";
import { AuthError, SupabaseClient } from "@supabase/supabase-js";

/**
 * Resultado padrão das operações de autenticação.
 */
type AuthResult = { error: AuthErrorCode | null };

/**
 * Converter erro do Supabase Auth, se houver, em um resultado serializável.
 *
 * No modo dev, mostra o erro original no terminal.
 */
function toResult(error: AuthError | null): AuthResult {
  if (!error) return { error: null }; // Sucesso

  // Log no terminal:
  if (process.env.NODE_ENV === "development") console.error("[auth]", error);

  return { error: mapAuthError(error) };
}

/**
 * Executa o login com email e senha usando o Supabase Auth.
 *
 * @param supabase - Instância do cliente Supabase.
 * @param param1 - Objeto contendo email e senha.
 * @returns Um objeto contendo o erro, caso exista, mapeado para um código de erro amigável.
 */
export async function signInWithPassword(supabase: SupabaseClient, { email, password }: LoginInput): Promise<AuthResult> {
  // Executar login no Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  return toResult(error); // Retornar resultado
}

/**
 * Executa o cadastro com email e senha usando o Supabase Auth.
 *
 * @param emailRedirectTo - URL de destino do link de confirmação enviado por email.
 */
export async function signUpWithPassword(supabase: SupabaseClient, { email, password }: SignUpInput, emailRedirectTo?: string): Promise<AuthResult> {
  // Executar cadastro no Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo },
  });

  return toResult(error); // Retornar resultado
}

/**
 * Enviar e-mail de redefinição de senha.
 *
 * @param redirectTo - URL de destino do link de redefinição enviado por email.
 */
export async function forgotPassword(supabase: SupabaseClient, { email, redirectTo }: { email: string; redirectTo: string }): Promise<AuthResult> {
  // Executar ação de redefinição de senha com Supabase
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  return toResult(error); // Retornar resultado
}

/**
 * Atualiza a senha do usuário autenticado (sessão de recuperação ou sessão ativa).
 */
export async function updatePassword(supabase: SupabaseClient, { password }: { password: string }): Promise<AuthResult> {
  // Executar ação de atualização de senha com Supabase
  const { error } = await supabase.auth.updateUser({ password });

  return toResult(error); // Retornar resultado
}

/**
 * Encerrar a sessão atual do usuário.
 */
export async function signOut(supabase: SupabaseClient): Promise<AuthResult> {
  // Executar logout no Supabase Auth
  const { error } = await supabase.auth.signOut();

  return toResult(error); // Retornar resultado
}
