import { toSelect } from "@/lib/supabase/helpers"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"
import { createClient } from "@/lib/supabase/server"
import { UserProfile, UserRole, UserRow } from "@/types/user.types"

/**
 * Obtém o nome do usuário.
 */
export async function getUserDisplayName(userId: string): Promise<Pick<UserProfile, "firstName" | "lastName"> | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from(TABLES.users)
    .select(toSelect([COLUMNS.users.firstName, COLUMNS.users.lastName])) // colunas
    .eq(COLUMNS.users.id, userId)
    .single<Pick<UserRow, "first_name" | "last_name">>()

  return data ? { firstName: data.first_name, lastName: data.last_name } : null
}

/**
 * Obter o papel do usuário no database.
 */
export async function getUserRole(userId: string): Promise<UserRole | null> {
  const supabase = await createClient()

  const { data } = await supabase
    .from(TABLES.users)
    .select(toSelect([COLUMNS.users.role]))
    .eq(COLUMNS.users.id, userId)
    .single<Pick<UserRow, "role">>()

  return data?.role ?? null
}
