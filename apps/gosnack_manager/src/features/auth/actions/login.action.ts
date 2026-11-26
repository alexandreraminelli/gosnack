"use server";

import { safeNextPath } from "@/core/lib/safe-next-path";
import { createClient } from "@/core/supabase/server";
import { AuthErrorCode, loginSchema, signInWithPassword } from "@/domains/auth";

/**
 * Estado do login.
 */
export type LoginState =
  | { status: "idle"; email: string } // Estado inicial
  | { status: "success"; email: string; redirectTo: string } // Estado de sucesso
  | { status: "error"; email: string; code: AuthErrorCode }; // Estado de erro

/**
 * Ação de login.
 * @param _prevState Estado anterior do login.
 * @param formData Dados do formulário de login.
 * @returns Novo estado do login.
 */
export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  // Extrair dados do formulário
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = formData.get("next");

  // Tratar entrada inválida como credencial inválida
  const parsed = loginSchema.safeParse({ email, password });
  if (!parsed.success) {
    return { status: "error", email, code: "invalid_credentials" };
  }

  // Executar login com Supabase
  const supabase = await createClient();
  const { error } = await signInWithPassword(supabase, parsed.data);
  if (error) return { status: "error", email, code: error };

  return {
    status: "success",
    email,
    // TODO: Ir para a página de dashboard
    redirectTo: safeNextPath(typeof next === "string" && next ? next : null, "/protected"),
  };
}
