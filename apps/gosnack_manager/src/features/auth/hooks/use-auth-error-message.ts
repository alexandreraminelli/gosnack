"use client";

import { AuthErrorCode } from "@/domains/auth";
import { useTranslations } from "next-intl";

/**
 * Converte um código de erro de autenticação em título e descrição amigáveis
 * para o usuário.
 *
 * Códigos sem tradução serão tratados como "unknown".
 */
export function useAuthErrorMessage() {
  // Mapeamento das mensagens de erro.
  const text = useTranslations("core.supabaseAuthErrorCodes");

  return (code: AuthErrorCode): { title: string; description: string } => {
    // Usar código como chave se houver tradução, caso contrário usar "unknown"
    const key = text.has(`${code}.title` as never) ? code : "unknown";

    return {
      title: text(`${key}.title` as never),
      description: text(`${key}.description` as never),
    };
  };
}
