import { UserProfile, UserRow } from "@/features/authentication/shared/types/user.types"
import { toSelect } from "@/lib/supabase/helpers"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"
import { createClient } from "@/lib/supabase/server"

/**
 * Converte `UserRow` para `UserProfile`, adaptando os campos de snake_case para camelCase.
 */
const mapUserRowToUserProfile = (row: UserRow): UserProfile => ({
  id: row.id,
  email: row.email,
  firstName: row.first_name,
  lastName: row.last_name,
  role: row.role,
  avatarUrl: row.avatar_url,
  isActive: row.is_active,
  updatedAt: row.updated_at,
})

/**
 * Serviço para operações relacionadas ao perfil do usuário, como obtenção e edição de dados da conta.
 */
export const profileService = {
  /**
   * Obter o perfil do usuário.
   */
  async getProfile(userId: string): Promise<UserProfile | null> {
    const supabase = await createClient()

    const { data: userProfile, error } = await supabase
      .from(TABLES.users)
      .select(toSelect([COLUMNS.users.firstName, COLUMNS.users.lastName, COLUMNS.users.role]))
      .eq(COLUMNS.users.id, userId)
      .single<UserRow>()

    if (error) throw error
    return mapUserRowToUserProfile(userProfile)
  },
}
