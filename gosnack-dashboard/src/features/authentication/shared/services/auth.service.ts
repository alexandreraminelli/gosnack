import { LOGIN_TEXTS } from "@/constants/texts/auth/login.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { createClient } from "@/lib/supabase/client"
import { getAuthErrorMessage } from "@/lib/supabase/errors/auth-errors"
import { ActionResult } from "@/types"

/**
 * Dados necessários para autenticar um usuário.
 */
interface SignInInput {
  email: string
  password: string
}

/**
 * Autentica o usuário usando e-mail e senha.
 */
export async function signInUser({ email, password }: SignInInput): Promise<ActionResult> {
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const message = getAuthErrorMessage(error.code, LOGIN_TEXTS.result.error.fallback)
    return { success: false, message }
  }
  return { success: true }
}

/**
 * Encerra a sessão do usuário, deslogando-o do sistema.
 */
export async function signOutUser(): Promise<ActionResult> {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    const message = getAuthErrorMessage(error.code, UI_TEXTS.status.error)
    return { success: false, message }
  }
  return { success: true }
}
