import { LOGIN_TEXTS } from "@/constants/texts/login.texts"
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
