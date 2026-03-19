import { UserInsert, UserProfile, UserRow } from "@/types/user.types"
import { adminClient } from "@/lib/supabase/admin"
import { COLUMNS, TABLES } from "@/lib/supabase/schema"
import { mapRowToUserProfile } from "@/utils/mappers/profile.mapper"
import env from "@/lib/env"
import { ROUTES } from "@/constants/navigation/routes"

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

  /**
   * Cria um novo usuário no sistema.
   *
   * @see https://supabase.com/docs/reference/javascript/auth-admin-inviteuserbyemail
   */
  async create(input: UserInsert): Promise<UserProfile> {
    // Convidar usuário por e-mail pro Supabase Auth
    const { data: authData, error: authError } = await adminClient.auth.admin.inviteUserByEmail(
      input.email, // e-mail onde o convite será enviado
      {
        data: {
          // Metadados do usuário
          first_name: input.firstName,
          last_name: input.lastName,
          role: input.role,
        },
        // Link de redirecionamento após o usuário aceitar o convite e criar a senha
        redirectTo: `${env.appUrl}/${ROUTES.auth.setPassword}`,
      },
    )
    if (authError) throw authError // lançar erro

    // Inserir perfil na tabela `users`
    const { data: profileRow, error: dbError } = await adminClient
      .from(TABLES.users)
      .upsert({
        id: authData.user.id, // UID do usuário no Supabase Auth
        email: input.email,
        first_name: input.firstName,
        last_name: input.lastName,
        role: input.role,
        is_active: true,
      } as UserRow)
      .select()
      .single()
      .overrideTypes<UserRow, { merge: false }>()
    if (dbError) throw dbError // lançar erro

    return mapRowToUserProfile(profileRow as UserRow)
  },
}
