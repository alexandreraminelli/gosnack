import { UserProfile, UserRow } from "@/types/user.types"
import { adminClient } from "@/lib/supabase/admin"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"
import { mapRowToUserProfile } from "@/utils/mappers/profile.mapper"

/**
 * Serviço para gerenciamento de usuários, incluindo listagem, criação,
 * atualização e desativação de usuários.
 *
 * Utiliza o cliente de administração do Supabase para realizar as operações.
 */
export const userService = {
  /**
   * Lista todos os usuários do sistema.
   */
  async listAll(): Promise<UserProfile[]> {
    const { data, error } = await adminClient.from(TABLES.users).select().order(COLUMNS.users.updatedAt, { ascending: false }).overrideTypes<UserRow[], { merge: false }>()

    if (error) throw error

    return data.map(mapRowToUserProfile)
  },
}
