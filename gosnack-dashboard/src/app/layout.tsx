import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SITE } from "@/constants/site"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

/**
 * Fonte Geist Sans do Google Fonts
 * Usada para a maioria dos textos da aplicação.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

/**
 * Fonte Geist Mono do Google Fonts.
 * Usada para textos monoespaçados, como código ou tabelas.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

/**
 * Metadados globais da aplicação web do GoSnack Dashboard.
 */
export const metadata: Metadata = {
  title: {
    template: SITE.title.template,
    default: SITE.title.default,
  },
  description: SITE.description,
}

/**
 * Layout raiz da aplicação web. Envolve todas as páginas e componentes,
 * fornecendo a estrutura HTML básica, estilos CSS, fontes e provedores.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR" // idioma da aplicação
      suppressHydrationWarning // suprime avisos de hidratação do React
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      {/* Provedor de tema */}
      <ThemeProvider
        attribute="class" // usar classes CSS para controlar o tema
        defaultTheme="system" // padrão: corresponder ao tema do SO
        enableSystem // detecção automática do tema do SO
        disableTransitionOnChange // desabilitar animações (evitar flashes e tornar mudança mais suave)
      >
        <body className="antialiased">
          {/* Conteúdo aninhado */}
          {children}

          {/* Notificações do sonner */}
          <Toaster position="top-right" richColors />
        </body>
      </ThemeProvider>
    </html>
  )
}
