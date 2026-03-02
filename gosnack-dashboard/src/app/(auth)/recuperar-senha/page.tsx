import { ROUTES } from "@/constants/navigation/routes"
import Link from "next/link"

/**
 * Página de recuperação de senha.
 */
export default function RecoveryPasswordPage() {
  // TODO: Recuperação de senha
  return (
    <div className="flex items-center flex-col gap-5 justify-center w-full">
      <h1 className="text-2xl">Recuperar Senha</h1>
      <Link href={ROUTES.login}>Voltar pro Login</Link>
    </div>
  )
}
