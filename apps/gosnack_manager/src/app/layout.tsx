import { ThemeProvider } from "@/core/components/providers/theme-provider";
import "@/core/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

/* Fonts -------------------------------------------------------------------- */

/**
 * Fonte Geist Sans usada para o corpo do texto e títulos.
 * @see https://fonts.google.com/specimen/Geist
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Metadata ----------------------------------------------------------------- */
export const metadata: Metadata = {
  // TODO: Extrair strings de texto para arquivo de internacionalização
  title: {
    template: `%s | GoSnack Manager`,
    default: "GoSnack Manager",
  },
  description: "Plataforma de gestão de lanchonetes escolares do colégio Logoipsum.",
};

/* Root Layout -------------------------------------------------------------- */

/**
 * Layout raiz da aplicação.
 * Define a estrutura básica do HTML, estilos globais, e provedores globais.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-br" // idioma
      suppressHydrationWarning // suprime avisos de hidratação do React
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Provedor de tema claro/escuro */}
        <ThemeProvider
          attribute="class" // controle de tema via classes CSS
          defaultTheme="system" // tema padrão
          enableSystem // detecção automática de tema do browser/SO
          disableTransitionOnChange // desabilitar animações ao alternar tema
        >
          {/* Componentes filhos de rotas e layouts */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
