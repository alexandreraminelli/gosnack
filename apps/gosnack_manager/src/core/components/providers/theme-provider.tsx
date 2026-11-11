"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Provedor de tema para a aplicação.
 * Permite alternar entre os temas claro e escuro.
 *
 * @see https://ui.shadcn.com/docs/dark-mode/next
 */
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Desestrutura as propriedades do provedor de tema e passa para o componente NextThemesProvider.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
