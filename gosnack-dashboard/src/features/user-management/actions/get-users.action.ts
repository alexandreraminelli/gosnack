"use server"

import { userService } from "@/features/user-management/services/user.service"
import { UserProfile } from "@/types/user.types"

/**
 * Server Action para listar todos os usuários do sistema.
 */
export async function getUsersAction(): Promise<UserProfile[]> {
  return userService.listAll()
}
