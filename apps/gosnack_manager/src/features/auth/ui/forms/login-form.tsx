"use client";

import { useRouter } from "next/navigation";
import { useActionState, useId } from "react";

import { ICONS } from "@/core/constants/icons";
import { cn } from "@/core/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/primitives/alert";
import { Button } from "@/ui/primitives/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";
import { toast } from "@/ui/primitives/toast";
import LoadingSpinner from "@/ui/shared/feedback/loading-spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { loginAction, LoginState } from "../../actions/login.action";
import { useAuthErrorMessage } from "../../hooks/use-auth-error-message";
import PasswordInput from "../password-input";
import { useValidationMessage } from "@/core/hooks/use-validation-message";

/**
 * Estado inicial do formulário de login.
 */
const initialState: LoginState = { status: "idle", email: "" };

/**
 * Formulário de login.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  // Textos
  const texts = useTranslations("core");

  // IDs dos fields
  const emailId = useId();
  const passwordId = useId();

  const router = useRouter(); // Hook do Next.js para navegação
  const getValidationMessage = useValidationMessage();
  const getErrorMessage = useAuthErrorMessage();

  const [state, formAction, isPending] = useActionState(async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
    // Repassar parâmetro next da URL para a action validar
    formData.set("next", new URLSearchParams(window.location.search).get("next") ?? "");

    // Executar action de login
    const result = await loginAction(prevState, formData);

    if (result.status === "success") {
      // Notificação de sucesso
      toast.add({
        type: "success",
        title: texts("auth.login.success.title"),
        description: texts("auth.login.success.message"),
      });
      // Redirecionar para a página de destino
      router.push(result.redirectTo);
    } else if (result.status === "error") {
      // Notificação de erro
      const { title, description } = getErrorMessage(result.code);
      toast.add({
        type: "error",
        title,
        description,
      });
    }

    return result;
  }, initialState);

  // Erros de validação por campo
  const fieldErrors = state.status === "invalid" ? state.fieldErrors : undefined;
  const emailError = getValidationMessage(fieldErrors?.email?.[0]);
  const passwordError = getValidationMessage(fieldErrors?.password?.[0]);

  // Erro para o Alert
  const errorDescription = state.status === "error" ? getErrorMessage(state.code).description : null;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Alert Erro */}
      {errorDescription && (
        <Alert variant="destructive">
          <HugeiconsIcon icon={ICONS.feedback.error} />
          <AlertTitle>{texts("auth.login.error.title")}</AlertTitle>
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      )}

      <form action={formAction}>
        <FieldGroup>
          {/* Campo E-mail */}
          <Field>
            <FieldLabel htmlFor={emailId}>{texts("auth.fields.email.label")}</FieldLabel>
            <Input id={emailId} name="email" type="email" autoComplete="email" placeholder={texts("auth.fields.email.placeholder")} required />
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>

          {/* Campo de Senha */}
          {/* TODO: Criar componente de ocultar/exibir senha */}
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor={passwordId}>{texts("auth.fields.password.label")}</FieldLabel>
              {/* Botão de esqueceu a senha */}
              <Link href="/auth/forgot-password" className="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                {texts("auth.forgotPassword.label")}
              </Link>
            </div>
            <PasswordInput id={passwordId} name="password" required autoComplete="current-password" />
            {passwordError && <FieldError>{passwordError}</FieldError>}
          </Field>

          {/* Botão de login */}
          <Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <LoadingSpinner />
                  <span>{texts("auth.login.submit.loading")}</span>
                </>
              ) : (
                <span>{texts("auth.login.submit.label")}</span>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
