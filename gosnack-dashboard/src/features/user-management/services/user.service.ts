import "server-only"

import { ROUTES } from "@/constants/navigation/routes"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import env from "@/lib/env"
import { adminClient } from "@/lib/supabase/admin"
import { COLUMNS, TABLES, VIEWS } from "@/lib/supabase/schema"
import { UserInsert, UserProfile, UserRow, UserTableRow } from "@/types/user.types"
import { mapRowToUserProfile } from "@/utils/mappers/profile.mapper"
import { isAllowedEmailForRole, shouldSkipInvite } from "@/utils/validation/email"
import { User } from "@supabase/supabase-js"

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
    const { data, error } = await adminClient
      .from(VIEWS.usersWithEmail)
      .select()
      // ordem alfabética pelo nome
      .order(COLUMNS.users.firstName, { ascending: true })
      .order(COLUMNS.users.lastName, { ascending: true })
      .overrideTypes<UserRow[], { merge: false }>()

    if (error) throw error

    return data.map(mapRowToUserProfile)
  },

  /**
   * Cria um novo usuário no sistema.
   *
   * @see https://supabase.com/docs/reference/javascript/auth-admin-inviteuserbyemail
   */
  async create(input: UserInsert): Promise<UserProfile> {
    // Validar se o e-mail é permitido para o role do usuário selecionado
    if (!isAllowedEmailForRole(input.email, input.role)) {
      throw new Error(USERS_TEXTS.validation.email.domain)
    }

    /** Dados retornados do Supabase Auth */
    let authData: { user: User }

    // Verificar se e-mail é fictício
    if (shouldSkipInvite(input.email)) {
      // Criar usuário diretamente sem convite por e-mail
      const { data, error } = await adminClient.auth.admin.createUser({
        email: input.email,
        email_confirm: true, // marcar e-mail como confirmado
        password: input.password, // senha obrigatória para e-mails fictícios
        user_metadata: {
          first_name: input.firstName,
          last_name: input.lastName,
          role: input.role,
        },
      })
      if (error) throw error
      authData = data
    } else {
      // Convidar usuário por e-mail pro Supabase Auth

      const { data, error } = await adminClient.auth.admin.inviteUserByEmail(
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
      if (error) throw error // lançar erro
      authData = data
    }

    // Inserir perfil na tabela `users`
    const { error: dbError } = await adminClient
      .from(TABLES.users)
      .upsert({
        id: authData.user.id, // UID do usuário no Supabase Auth
        first_name: input.firstName,
        last_name: input.lastName,
        role: input.role,
        is_active: true,
      } as UserTableRow)
      .select()
      .single()
      .overrideTypes<UserRow, { merge: false }>()

    if (dbError) throw dbError // lançar erro

    // Buscar perfil completo com e-mail via view
    const { data: profileRow, error: viewError } = await adminClient.from(VIEWS.usersWithEmail).select().eq(COLUMNS.users.id, authData.user.id).single().overrideTypes<UserRow, { merge: false }>()

    if (viewError) throw viewError

    return mapRowToUserProfile(profileRow as UserRow)
  },
}
