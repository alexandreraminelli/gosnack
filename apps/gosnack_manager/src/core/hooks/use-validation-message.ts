"use client";

import { useTranslations } from "next-intl";

/**
 * Converte um código de validação do zod em mensagem traduzida.
 */
export function useValidationMessage() {
  const text = useTranslations("core.validation");

  return (code?: string): string | undefined => {
    if (!code) return undefined;
    return text.has(code as never) ? text(code as never) : text("invalid" as never);
  };
}
