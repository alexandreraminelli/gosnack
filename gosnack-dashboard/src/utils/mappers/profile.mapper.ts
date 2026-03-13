import { UserProfile, UserRow } from "@/types/user.types"

/**
 * Converte `UserRow` para `UserProfile`, adaptando os campos de snake_case para camelCase.
 */
export function mapRowToUserProfile(row: UserRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role,
    avatarUrl: row.avatar_url,
    isActive: row.is_active,
    updatedAt: row.updated_at,
  }
}
