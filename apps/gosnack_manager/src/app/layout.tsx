import { APP_NAME } from "@/constants/app";
import { ThemeProvider } from "@/core/components/providers/theme-provider";
import "@/core/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
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

/**
 * Metadados globais da aplicação.
 */
export async function generateMetadata(): Promise<Metadata> {
  const texts = await getTranslations("core.metadata");

  return {
    title: {
      template: `%s | ${APP_NAME}`,
      default: APP_NAME,
    },
    description: texts("description"),
  };
}

/* Root Layout -------------------------------------------------------------- */

/**
 * Layout raiz da aplicação.
 * Define a estrutura básica do HTML, estilos globais, e provedores globais.
 */
export default async function RootLayout({ children }: LayoutProps<"/">) {
  /** Idioma da requisição. */
  const locale = await getLocale();

  return (
    <html
      lang={locale} // idioma
      suppressHydrationWarning // suprime avisos de hidratação do React
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Provedor de Internacionalização */}
        <NextIntlClientProvider>
          {/* Provedor de tema (claro e escuro) */}
          <ThemeProvider
            attribute="class" // controle de tema via classes CSS
            defaultTheme="system" // tema padrão
            enableSystem // detecção automática de tema do browser/SO
            disableTransitionOnChange // desabilitar animações ao alternar tema
          >
            {/* Componentes filhos de rotas e layouts */}
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
