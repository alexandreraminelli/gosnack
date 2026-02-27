"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ICONS } from "@/constants/icons"
import { LOGIN_TEXTS } from "@/constants/texts/login.texts"
import { loginSchema } from "@/lib/validations/login.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

/**
 * Tipagem dos dados do formulário de login.
 */
type LoginFormData = z.infer<typeof loginSchema>

/**
 * IDs do formulário e dos campos.
 */
const FORM_IDS = {
  email: "email-field",
  password: "password-field",
} as const

/**
 * Formulário de login.
 */
export default function LoginForm() {
  /**
   * Instância do React Hook Form para o formulário de login.
   */
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), // Zod como resolvedor de validação
    defaultValues: {
      email: "",
      password: "",
    },
  })

  /**
   * Função executada ao submeter o formulário de login.
   */
  function onSubmit(data: LoginFormData) {
    // TODO: Implementar login
    console.log("Dados do formulário de login:", data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CardContent className="px-0">
        <FieldGroup>
          {/* Email Field */}
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{LOGIN_TEXTS.fields.email}</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="email" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password Field */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{LOGIN_TEXTS.fields.password}</FieldLabel>
                <Input {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="current-password" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0">
        <Button size="lg" className="w-full" type="submit">
          <HugeiconsIcon icon={ICONS.auth.login} />
          {LOGIN_TEXTS.submit}
        </Button>
      </CardFooter>
    </form>
  )
}
