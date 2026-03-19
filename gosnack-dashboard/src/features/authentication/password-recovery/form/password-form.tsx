"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import PasswordInput from "@/components/shared/fields/password-input"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ICONS } from "@/constants/icons"
import { SET_PASSWORD_TEXTS } from "@/constants/texts/auth/set-password.texts"
import { passwordSchema } from "@/features/authentication/password-recovery/schemas/password.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { Controller, Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"

/**
 * Tipagem dos dados do formulário de definição de senha.
 */
type PasswordFormData = z.infer<typeof passwordSchema>

/**
 * Formulário para definir uma nova senha para a conta.
 *
 * Usado para funcionalidades como:
 * - Definir senha após criação de conta por um admin
 * - Redefinir senha
 */
export default function PasswordForm() {
  // Hooks
  const router = useRouter()

  /**
   * Instância do React Hook Form para o formulário de definir senha.
   */
  const form = useForm<PasswordFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(passwordSchema as any) as Resolver<PasswordFormData>,

    // Valores padrão
    defaultValues: {
      password: "",
    },
  })

  /**
   * Função executada ao submeter o formulário de definir senha.
   */
  async function onSubmit(data: PasswordFormData) {
    // TODO: Implementar função
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CardContent className="px-0">
        <FieldGroup>
          {/* Password Field */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                {/* Label Password */}
                <FieldLabel htmlFor={field.name}>{SET_PASSWORD_TEXTS.label}</FieldLabel>

                {/* Input Password */}
                <PasswordInput id={field.name} aria-invalid={fieldState.invalid} autoComplete="new-password" {...field} />

                {/* Error Password */}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0">
        {/* Submit Button */}
        <Button size="lg" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.auth.password.icon} />}
          <span>{SET_PASSWORD_TEXTS.submit}</span>
        </Button>
      </CardFooter>
    </form>
  )
}
