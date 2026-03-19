"use server"

import { userService } from "@/features/user-management/services/user.service"
import { UserInsert, UserProfile } from "@/types/user.types"

/**
 * Server Action para criar um novo usuário no sistema.
 */
export async function createUserAction(input: UserInsert): Promise<UserProfile> {
  return userService.create(input)
}
