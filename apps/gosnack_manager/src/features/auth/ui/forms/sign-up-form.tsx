"use client";

import { useActionState, useId } from "react";

import { ICONS } from "@/core/constants/icons";
import { useValidationMessage } from "@/core/hooks/use-validation-message";
import { cn } from "@/core/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/ui/primitives/alert";
import { Button } from "@/ui/primitives/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";
import { toast } from "@/ui/primitives/toast";
import LoadingSpinner from "@/ui/shared/feedback/loading-spinner";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { signUpAction, SignUpState } from "../../actions/sign-up.action";
import { useAuthErrorMessage } from "../../hooks/use-auth-error-message";
import PasswordInput from "../../ui/password-input";

/**
 * Estado inicial do formulário de cadastro.
 */
const initialState: SignUpState = { status: "idle", email: "" };

/**
 * Formulário de criação de conta.
 *
 * Permite, em ambiente de desenvolvimento, criar uma conta de usuário para testes.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  // Textos
  const texts = useTranslations("core");

  // IDs dos fields
  const emailId = useId();
  const passwordId = useId();

  const router = useRouter();

  const getValidationMessage = useValidationMessage();
  const getErrorMessage = useAuthErrorMessage();

  const [state, formAction, isPending] = useActionState(async (prevState: SignUpState, formData: FormData): Promise<SignUpState> => {
    // Repassar parâmetro next da URL para a action validar
    formData.set("next", new URLSearchParams(window.location.search).get("next") ?? "");

    // Executar action de cadastro
    const result = await signUpAction(prevState, formData);

    if (result.status === "success") {
      // Notificação de sucesso
      toast.add({
        type: "success",
        title: texts("auth.signUp.success.title"),
        description: texts("auth.signUp.success.message"),
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

    return result; // Retornar o novo estado do formulário
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
          <AlertTitle>{texts("auth.signUp.error.title")}</AlertTitle>
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      )}

      <form action={formAction}>
        <FieldGroup>
          {/* TODO(Sign-Up): adicionar campos de nome e sobrenome */}

          {/* Campo E-mail */}
          <Field>
            {/* Label */}
            <FieldLabel htmlFor={emailId}>{texts("auth.fields.email.label")}</FieldLabel>
            {/* Input */}
            <Input id={emailId} name="email" type="email" autoComplete="email" placeholder={texts("auth.fields.email.placeholder")} required />
            {/* Error */}
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>

          {/* Campo de Senha */}
          <Field>
            {/* Label */}
            <FieldLabel htmlFor={passwordId}>{texts("auth.fields.password.label")}</FieldLabel>
            {/* Input */}
            <PasswordInput id={passwordId} name="password" autoComplete="new-password" required />
            {/* Label */}
            {passwordError && <FieldError>{passwordError}</FieldError>}
          </Field>

          {/* Botão de submissão */}
          <Field>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <LoadingSpinner />
                  <span>{texts("auth.signUp.submit.loading")}</span>
                </>
              ) : (
                <span>{texts("auth.signUp.submit.label")}</span>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
