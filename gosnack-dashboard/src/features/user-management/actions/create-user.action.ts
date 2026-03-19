"use server"

import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { userService } from "@/features/user-management/services/user.service"
import { getAuthErrorMessage, isAuthErrorCode } from "@/lib/supabase/errors/auth-errors"
import { getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { ErrorWithCode } from "@/lib/supabase/errors/error.types"
import { ActionResult } from "@/types"
import { UserInsert, UserProfile } from "@/types/user.types"

/**
 * Server Action para criar um novo usuário no sistema.
 */
export async function createUserAction(input: UserInsert): Promise<ActionResult<UserProfile>> {
  try {
    const user = await userService.create(input)
    // Sucesso
    return { success: true, data: user }
  } catch (e) {
    // Erro
    const error = e as ErrorWithCode
    const fallback = USERS_TEXTS.error.create.fallback

    const message =
      error?.code && isAuthErrorCode(error.code)
        ? getAuthErrorMessage(error, fallback) // erro do Supabase Auth
        : getDbErrorMessage(error, fallback) // erro do Postgres

    return { success: false, message }
  }
}
