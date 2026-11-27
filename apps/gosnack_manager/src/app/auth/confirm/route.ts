import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

import { ROUTES } from "@/core/constants/navigation/routes";
import { safeNextPath } from "@/core/lib/safe-next-path";
import { createClient } from "@/core/supabase/server";
import { mapAuthError } from "@/domains/auth";

/**
 * Rota de confirmação do link enviado por e-mail.
 *
 * Usado para cadastro e recuperação de senha.
 *
 */
export async function GET(request: NextRequest) {
  // Parâmetros da URL
  const { searchParams } = new URL(request.url);
  // O hash do token enviado por e-mail (signup ou recovery)
  const tokenHash = searchParams.get("token_hash");
  // O tipo de OTP enviado por e-mail (signup ou recovery)
  const type = searchParams.get("type") as EmailOtpType | null;
  // Redirecionar o usuário para a URL de redirecionamento especificada ou para a raiz do aplicativo
  const next = safeNextPath(searchParams.get("next"), ROUTES.home);

  // Link sem token ou sem tipo de OTP é inválido
  if (tokenHash || !type) {
    redirect(`${ROUTES.auth.error}?code=invalid_link`);
  }

  // Executar a confirmação no Supabase
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash ?? "" });

  // Link expirado, já usado ou inválido
  if (error) {
    redirect(`${ROUTES.auth.error}?code=${encodeURIComponent(mapAuthError(error))}`);
  }

  // Redirecionar o usuário para a URL de redirecionamento especificada ou para a raiz do aplicativo
  redirect(next);
}
