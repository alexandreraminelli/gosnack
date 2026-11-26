import { mapAuthError } from "@/domains/auth/mappers/auth-error.mapper";
import { LoginInput } from "@/domains/auth/schemas/login.schema";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 *
 */
export async function signInWithPassword(supabase: SupabaseClient, { email, password }: LoginInput) {
  // Executar login no Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  // Retornar erro se houver
  return { error: error ? mapAuthError(error) : null };
}
