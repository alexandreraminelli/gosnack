"use server";

import appEnvs from "@/core/config/env";
import { ROUTES } from "@/core/constants/navigation/routes";
import { createClient } from "@/core/supabase/server";
import { AuthErrorCode, forgotPassword, forgotPasswordSchema } from "@/domains/auth";
import { headers } from "next/headers";
import z from "zod";

/**
 * Tipagem para os erros de campo do formulário de redefinição de senha.
 */
export type ForgotPasswordFieldErrors = Partial<Record<keyof typeof forgotPasswordSchema.shape, string>>;

/**
 * Estado da redefinição de senha.
 */
export type ForgotPasswordState =
  | { status: "idle"; email: string } // Estado inicial
  | { status: "invalid"; email: string; fieldErrors: ForgotPasswordFieldErrors } // Estado de validação inválida
  | { status: "success"; email: string } // Estado de sucesso
  | { status: "error"; email: string; code: AuthErrorCode }; // Estado de erro

/**
 * Ação de redefinição de senha.
 *
 * @param _prevState Estado anterior da redefinição de senha.
 * @param formData Dados do formulário de redefinição de senha.
 * @returns Novo estado da redefinição de senha.
 */
export async function forgotPasswordAction(_prevState: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> {
  // Extrair dados do formulário
  const email = String(formData.get("email") ?? "");

  // Validar formulário
  const parsed = forgotPasswordSchema.safeParse({ email });
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      status: "invalid",
      email,
      fieldErrors: {
        email: fieldErrors.email?.[0],
      },
    };
  }

  /*
   * URL do link do e-mail: passa pelo "/auth/confirm", que troca o token por uma sessão e depois leva o usuário para a tela de redefinição de senha.
   * Usa a origem da requisição.
   */
  const origin = (await headers()).get("origin") ?? appEnvs.appUrl;
  const redirectTo = `${origin}${ROUTES.auth.confirm}?next=${encodeURIComponent(ROUTES.auth.updatePassword)}`;

  // Executar ação de redefinição de senha com Supabase
  const supabase = await createClient();
  const { error } = await forgotPassword(supabase, { ...parsed.data, redirectTo });

  // Verificar se houve erro
  if (error) return { status: "error", email, code: error };

  // Sucesso
  return {
    status: "success",
    email,
  };
}
