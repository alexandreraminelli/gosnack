import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SET_PASSWORD_TEXTS } from "@/constants/texts/auth/set-password.texts"
import PasswordForm from "@/features/authentication/password-recovery/form/password-form"
import { Metadata } from "next"

/**
 * Metadados da página de definir senha.
 */
export const metadata: Metadata = {
  title: SET_PASSWORD_TEXTS.header.title,
}

/**
 * Página de definir senha após convite para novos usuários.
 */
export default function SetPasswordPage() {
  return (
    <main className="space-y-3">
      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-2 text-center px-0">
        <CardTitle className="text-xl">{SET_PASSWORD_TEXTS.header.title}</CardTitle>
        <CardDescription>{SET_PASSWORD_TEXTS.header.description}</CardDescription>
      </CardHeader>

      {/* Formulário */}
      <PasswordForm />
    </main>
  )
}
