import { mapAuthError } from "@/domains/auth/mappers/auth-error.mapper";
import { LoginInput } from "@/domains/auth/schemas/login.schema";
import { SignUpInput } from "@/domains/auth/schemas/sign-up.schema";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Executa o login com email e senha usando o Supabase Auth.
 *
 * @param supabase - Instância do cliente Supabase.
 * @param param1 - Objeto contendo email e senha.
 * @returns Um objeto contendo o erro, caso exista, mapeado para um código de erro amigável.
 */
export async function signInWithPassword(supabase: SupabaseClient, { email, password }: LoginInput): Promise<{ error: string | null }> {
  // Executar login no Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // Se houver erro
  if (error) {
    // Mostrar erro no terminal no modo dev
    if (process.env.NODE_ENV === "development") console.error("[auth]", error);
    return { error: mapAuthError(error) };
  }

  return { error: null }; // Sucesso
}

/**
 * Executa o cadastro com email e senha usando o Supabase Auth.
 */
export async function signUpWithPassword(supabase: SupabaseClient, { email, password }: SignUpInput): Promise<{ error: string | null }> {
  // Executar cadastro no Supabase Auth
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  // Se houver erro
  if (error) {
    // Mostrar erro no terminal dev
    if (process.env.NODE_ENV === "development") console.error("[auth]", error);
    return { error: mapAuthError(error) };
  }

  return { error: null }; // Sucesso
}
