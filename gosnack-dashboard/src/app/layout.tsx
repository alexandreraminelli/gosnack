import { SITE } from "@/constants/site"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

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
    <html lang={SITE.locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
