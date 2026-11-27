"use server";

import { ROUTES } from "@/core/constants/navigation/routes";
import { safeNextPath } from "@/core/lib/safe-next-path";
import { createClient } from "@/core/supabase/server";
import { AuthErrorCode, signUpSchema, signUpWithPassword } from "@/domains/auth";
import z from "zod";

/**
 * Tipagem para os erros de campo do formulário de cadastro.
 */
export type SignUpFieldErrors = Partial<Record<keyof typeof signUpSchema.shape, string>>;

/**
 * Estado do cadastro.
 */
export type SignUpState =
  | { status: "idle"; email: string } // Estado inicial
  | { status: "invalid"; email: string; fieldErrors: SignUpFieldErrors } // Estado de validação inválida
  | { status: "success"; email: string; redirectTo: string } // Estado de sucesso
  | { status: "error"; email: string; code: AuthErrorCode }; // Estado de erro

/**
 * Ação de cadastro.
 *
 * @param _prevState Estado anterior do cadastro.
 * @param formData Dados do formulário de cadastro.
 * @returns Novo estado do cadastro.
 */
export async function signUpAction(_prevState: SignUpState, formData: FormData): Promise<SignUpState> {
  // Não fazer nada se não estiver em modo dev
  if (process.env.NODE_ENV !== "development") return { status: "idle", email: "" };

  // Extrair dados do formulário
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = formData.get("next");

  // Validar formulário
  const parsed = signUpSchema.safeParse({ email, password });
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "invalid",
      email,
      fieldErrors: {
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      },
    };
  }

  // Executar cadastro com Supabase
  const supabase = await createClient();
  const { error } = await signUpWithPassword(supabase, parsed.data);

  // Verificar se houve erro
  if (error) return { status: "error", email, code: error };

  // Sucesso
  return {
    status: "success",
    email,
    redirectTo: safeNextPath(typeof next === "string" && next ? next : null, ROUTES.home),
  };
}
