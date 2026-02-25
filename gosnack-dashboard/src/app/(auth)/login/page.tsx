import LoginForm from "@/components/forms/login-form"
import { AUTH_TEXTS } from "@/constants/content/auth"
import { Metadata } from "next"

/**
 * Metadados da página de login.
 */
export const metadata: Metadata = {
  title: AUTH_TEXTS.login.metadata.title,
}

/**
 * Página de login.
 */
export default function LoginPage() {
  return (
    <main>
      {/* Header */}
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{AUTH_TEXTS.login.header.title}</h1>
        <p className="text-muted-foreground text-base">{AUTH_TEXTS.login.header.subtitle}</p>
      </header>

      {/* Formulário de login */}
      <LoginForm />
    </main>
  )
}
