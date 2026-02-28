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
import { Controller, type Resolver, useForm } from "react-hook-form"
import { z } from "zod/v4"
import { toast } from "sonner"
import { signInUser } from "@/services/auth"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/navigation/routes"
import PasswordInput from "@/components/shared/fields/password-input"
import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"

/**
 * Tipagem dos dados do formulário de login.
 */
type LoginFormData = z.infer<typeof loginSchema>

/**
 * Formulário de login.
 */
export default function LoginForm() {
  const router = useRouter()

  /**
   * Instância do React Hook Form para o formulário de login.
   */
  const form = useForm<LoginFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginSchema as any) as Resolver<LoginFormData>,
    defaultValues: {
      email: "",
      password: "",
    },
  })

  /**
   * Função executada ao submeter o formulário de login.
   */
  async function onSubmit(data: LoginFormData) {
    const result = await signInUser(data)

    if (result.success) {
      // Login bem-sucedido
      toast.success(LOGIN_TEXTS.result.success)
      router.push(ROUTES.home)
    } else {
      // Erro no login
      toast.error(LOGIN_TEXTS.result.error.message, {
        description: result.message,
      })
    }
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
                <PasswordInput {...field} id={field.name} aria-invalid={fieldState.invalid} autoComplete="current-password" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0">
        <Button size="lg" disabled={form.formState.isSubmitting} className="w-full" type="submit" onClick={() => console.log("Botão clicado")}>
          {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.auth.login} />}
          {LOGIN_TEXTS.submit}
        </Button>
      </CardFooter>
    </form>
  )
}
