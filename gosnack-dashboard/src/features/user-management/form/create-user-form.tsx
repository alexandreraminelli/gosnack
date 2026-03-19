"use client"

import { ROUTES } from "@/constants/navigation/routes"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { useCreateUser } from "@/features/user-management/hooks/queries/user.mutations"
import { createUserSchema } from "@/features/user-management/schemas/create-user.schema"
import { getAuthErrorMessage } from "@/lib/supabase/errors/auth-errors"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthError, PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Tipagem dos dados do form de criar usuário.
 */
type CreateUserFormData = z.infer<typeof createUserSchema>

/**
 * Formulário de criar usuário.
 */
export default function CreateUserForm() {
  // Hooks
  const router = useRouter()
  const createUserMutation = useCreateUser()

  /**
   * Instância do React Hook Form para o formulário de criar usuário.
   */
  const form = useForm<CreateUserFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createUserSchema as any) as Resolver<CreateUserFormData>,

    // Valores iniciais:
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: undefined,
    },
  })

  /**
   * Função executada ao submeter o formulário de criar usuário.
   */
  async function onSubmit(data: CreateUserFormData) {
    toast.promise(
      // Executar mutation
      createUserMutation.mutateAsync({ ...data }),

      {
        // Carregamento
        loading: USERS_TEXTS.loading.creating,
        // Sucesso
        success: (user) => {
          form.reset() // limpar form

          return {
            message: USERS_TEXTS.success.created.title,
            description: USERS_TEXTS.success.created.description(user.firstName),
            // Botão de ver usuário criado
            action: {
              label: USERS_TEXTS.actions.view,
              onClick: () => router.push(ROUTES.users.details(user.id)),
            },
          }
        },
        // Erro
        error: (error: AuthError | PostgrestError) => {
          if (error instanceof AuthError) {
            // Erro do Supabase Auth
            return {
              message: USERS_TEXTS.error.create.title,
              description: getAuthErrorMessage(error.code, USERS_TEXTS.error.create.fallback),
            }
          } else {
            // Erro do Postgre
            if (error.code === DB_ERROR_CODES.uniqueViolation) {
              // E-mail duplicado
              return {
                message: USERS_TEXTS.error.create.title,
                description: USERS_TEXTS.error.duplicateEmail.description,
              }
            } else {
              // Outro erro do Postgre
              return {
                message: USERS_TEXTS.error.create.title,
                description: getDbErrorMessage(error, USERS_TEXTS.error.create.fallback),
              }
            }
          }
        },
      },
    )
  }

  return <div>TODO: Form de Criar Usuário</div>
}
