"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { useCreateUser } from "@/features/user-management/hooks/queries/user.mutations"
import { createUserSchema } from "@/features/user-management/schemas/create-user.schema"
import { getAuthErrorMessage } from "@/lib/supabase/errors/auth-errors"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { USER_ROLES } from "@/types/user.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { AuthError, PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Controller, Resolver, useForm } from "react-hook-form"
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
              description: getAuthErrorMessage(error, USERS_TEXTS.error.create.fallback),
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

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      {/* Campos */}
      <FieldGroup>
        {/* Field Primeiro Nome */}
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Primeiro Nome */}
              <FieldLabel htmlFor={field.name}>{USERS_TEXTS.fields.firstName}</FieldLabel>

              {/* Input Primeiro Nome */}
              <Input id={field.name} type="text" aria-invalid={fieldState.invalid} autoCapitalize="words" autoComplete="given-name" {...field} />

              {/* Erro Primeiro Nome */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field Sobrenome */}
        <Controller
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Sobrenome */}
              <FieldLabel htmlFor={field.name}>{USERS_TEXTS.fields.lastName}</FieldLabel>

              {/* Input Sobrenome */}
              <Input id={field.name} type="text" aria-invalid={fieldState.invalid} autoCapitalize="words" autoComplete="family-name" {...field} />

              {/* Erro Sobrenome */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field E-mail */}
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label E-mail */}
              <FieldLabel htmlFor={field.name}>{USERS_TEXTS.fields.email}</FieldLabel>

              {/* Input E-mail */}
              <Input id={field.name} type="text" aria-invalid={fieldState.invalid} autoComplete="email" {...field} />

              {/* Erro E-mail */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field Role */}
        <Controller
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Role */}
              <FieldLabel htmlFor={field.name}>{USERS_TEXTS.fields.role.label}</FieldLabel>

              {/* Select Role */}
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger aria-invalid={fieldState.invalid} {...field}>
                  <SelectValue placeholder={USERS_TEXTS.fields.role.placeholder} />
                </SelectTrigger>

                {/* Opções de role */}
                <SelectContent position="popper">
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {ENTITIES_TEXTS.roles[role].singular}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Erro Role */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.users.actions.create} />}
        <span>{USERS_TEXTS.actions.create}</span>
      </Button>

      {/* TODO: Alert de e-mail de convite enviado */}
    </form>
  )
}
