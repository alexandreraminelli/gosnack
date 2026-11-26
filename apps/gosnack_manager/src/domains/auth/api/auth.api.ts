import { mapAuthError } from "@/domains/auth/mappers/auth-error.mapper";
import { LoginInput } from "@/domains/auth/schemas/login.schema";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Executa o login com email e senha usando o Supabase Auth.
 *
 * @param supabase - Instância do cliente Supabase.
 * @param param1 - Objeto contendo email e senha.
 * @returns Um objeto contendo o erro, caso exista, mapeado para um código de erro amigável.
 */
export async function signInWithPassword(supabase: SupabaseClient, { email, password }: LoginInput) {
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
