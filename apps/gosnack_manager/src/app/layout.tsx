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
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-br" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
