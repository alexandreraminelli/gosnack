"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import PasswordInput from "@/components/shared/fields/password-input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { ICONS } from "@/constants/icons"
import { SET_PASSWORD_TEXTS } from "@/constants/texts/auth/set-password.texts"
import { ERROR_TEXTS } from "@/constants/texts/error.texts"
import { passwordSchema } from "@/features/authentication/password-recovery/schemas/password.schema"
import { createClient } from "@/lib/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
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

  // State do token
  const [tokenReady, setTokenReady] = useState(false)
  const [tokenInvalid, setTokenInvalid] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    /**
     * Hash da URL, usado para obter o token de recuperação/definição de senha.
     *
     * O token é necessário para validar a solicitação de definição de senha, garantindo que apenas usuários autorizados possam definir uma nova senha para a conta.
     */
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : ""
    /**
     * Parâmetros da URL, usados para extrair o token de recuperação/definição de senha do hash da URL.
     */
    const params = new URLSearchParams(hash)

    const access_token = params.get("access_token")
    const refresh_token = params.get("refresh_token")
    const type = params.get("type")

    async function consumeToken() {
      if (type !== "invite" || !access_token || !refresh_token) {
        setTokenInvalid(true)
        setTokenReady(true)
        return
      }

      // Iniciar sessão no Supabase Auth com o token no hash da URL
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      })

      if (error) {
        // Tratar erros
        setTokenInvalid(true)
        toast.error(ERROR_TEXTS.invalidLink.title)
      } else {
        // Remover hash da URL após consumir o token
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
      }

      setTokenReady(true) // Indicar que o token foi processado, independentemente do resultado
    }

    consumeToken() // Consumir o token ao montar o componente
  }, [])

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
    // Verificar se o token foi consumido
    if (!tokenReady || tokenInvalid) {
      toast.error(ERROR_TEXTS.invalidLink.title)
      return
    }

    // TODO: Implementar função
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <CardContent className="px-0">
        {/* Alert de token inválido */}
        {tokenReady && tokenInvalid && (
          <Alert variant="destructive" className="border-destructive my-6">
            {/* Ícone */}
            <HugeiconsIcon icon={ICONS.feedback.error} />

            <AlertTitle>{ERROR_TEXTS.invalidLink.title}</AlertTitle>
            <AlertDescription>{ERROR_TEXTS.invalidLink.description}</AlertDescription>
          </Alert>
        )}

        <FieldGroup>
          {/* Password Field */}
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} aria-disabled={!tokenReady || tokenInvalid}>
                {/* Label Password */}
                <FieldLabel htmlFor={field.name}>{SET_PASSWORD_TEXTS.label}</FieldLabel>

                {/* Input Password */}
                <PasswordInput id={field.name} aria-invalid={fieldState.invalid} disabled={!tokenReady || tokenInvalid} autoComplete="new-password" {...field} />

                {/* Error Password */}
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>

      <CardFooter className="px-0">
        {/* Submit Button */}
        <Button size="lg" className="w-full" disabled={form.formState.isSubmitting || !tokenReady || tokenInvalid}>
          {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.auth.password.icon} />}
          <span>{SET_PASSWORD_TEXTS.submit}</span>
        </Button>
      </CardFooter>
    </form>
  )
}
