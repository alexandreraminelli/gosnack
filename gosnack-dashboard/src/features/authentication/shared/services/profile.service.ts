import { COLUMNS, TABLES } from "@/lib/supabase/schema"
import { createClient } from "@/lib/supabase/server"
import { UserProfile, UserRow } from "@/types/user.types"
import { mapRowToUserProfile } from "@/utils/mappers/profile.mapper"

/**
 * Serviço para operações relacionadas ao perfil do usuário, como obtenção e edição de dados da conta.
 */
export const profileService = {
  /**
   * Obter o perfil do usuário.
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    const supabase = await createClient()

    const { data: userProfile, error } = await supabase.from(TABLES.users).select().eq(COLUMNS.users.id, userId).single<UserRow>()

    if (error) throw error
    return mapRowToUserProfile(userProfile)
  },
}
