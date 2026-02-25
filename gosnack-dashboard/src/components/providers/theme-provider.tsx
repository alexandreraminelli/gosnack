"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Provedor de tema para o aplicativo.
 * Permite alternar entre os temas claro e escuro.
 */
export function ThemeProvider(
  { children, ...props }: React.ComponentProps<typeof NextThemesProvider>, // props
) {
  // Desestrutura as propriedades do provedor de tema e passa para o componente NextThemesProvider.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
