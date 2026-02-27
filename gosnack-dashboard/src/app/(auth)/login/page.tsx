import LoginForm from "@/components/forms/login-form"
import { CardHeader } from "@/components/ui/card"
import { LOGIN_TEXTS } from "@/constants/texts/login.texts"
import { Metadata } from "next"

/**
 * Metadados da página de login.
 */
export const metadata: Metadata = {
  title: LOGIN_TEXTS.metadata.title,
}

/**
 * Página de login.
 */
export default function LoginPage() {
  return (
    <main className="space-y-3">
      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-2 text-center px-0">
        <h1 className="text-2xl font-bold">{LOGIN_TEXTS.header.title}</h1>
        <p className="text-muted-foreground text-base">{LOGIN_TEXTS.header.subtitle}</p>
      </CardHeader>

      {/* Formulário de login */}
      <LoginForm />
    </main>
  )
}
