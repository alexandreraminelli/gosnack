"use client";

import { isAuthApiError, isAuthRetryableFetchError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

/**
 * Converte um código de erro do Supabase em título e des
 */
export function useSupabaseAuthErrorMessage() {
  // Mapeamento das mensagens de erro.
  const text = useTranslations("core.supabaseAuthErrorCodes");

  return (error: unknown): { title: string; description: string } => {
    let key = "unknown"; // padrão para erros desconhecidos

    if (isAuthRetryableFetchError(error)) {
      key = "networkError";
    } else if (
      isAuthApiError(error) && // se é um erro de API do Supabase
      error.code && // se o erro possui um código
      text.has(
        `${error.code}.title` as never, // se existe uma tradução para o código de erro
      )
    ) {
      key = error.code; // usa o código do erro como chave
    }

    // Mostrar console.error no modo dev
    if (process.env.NODE_ENV === "development") {
      console.error("[auth]", error);
    }

    return {
      title: text(`${key}.title` as never),
      description: text(`${key}.description` as never),
    };
  };
}
