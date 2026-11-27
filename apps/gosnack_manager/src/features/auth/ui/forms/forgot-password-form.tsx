"use client";

import { useActionState, useId } from "react";

import { ICONS } from "@/core/constants/icons";
import { ROUTES } from "@/core/constants/navigation/routes";
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
import Link from "next/link";
import { forgotPasswordAction, ForgotPasswordState } from "../../actions/forgot-password.action";
import { useAuthErrorMessage } from "../../hooks/use-auth-error-message";

/**
 * Estado inicial do formulário de recuperação de senha.
 */
const initialState: ForgotPasswordState = {
  status: "idle",
  email: "",
};

/**
 * Formulário de recuperação de senha.
 */
export function ForgotPasswordForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const texts = useTranslations("core"); // Textos

  // IDs dos fields
  const emailId = useId();

  const getValidationMessage = useValidationMessage();
  const getErrorMessage = useAuthErrorMessage();

  const [state, formAction, isPending] = useActionState(async (prevState: ForgotPasswordState, formData: FormData): Promise<ForgotPasswordState> => {
    const result = await forgotPasswordAction(prevState, formData);

    // Em caso de erro do Supabase, exibir mensagem de erro
    if (result.status === "error") {
      const { title, description } = getErrorMessage(result.code);
      toast.add({ type: "error", title, description });
    }

    return result;
  }, initialState);

  // Sucesso: troca o formulário por uma mensagem neutra
  if (state.status === "success") {
    return (
      <div className={cn("flex flex-col gap-6 mt-6", className)} {...props}>
        <Alert>
          <HugeiconsIcon icon={ICONS.feedback.success} />
          <AlertTitle>{texts("auth.forgotPassword.success.title")}</AlertTitle>
          <AlertDescription>{texts("auth.forgotPassword.success.message")}</AlertDescription>
        </Alert>

        <Link href={ROUTES.auth.login} className="text-center text-sm underline underline-offset-4">
          {texts("auth.backToLogin")}
        </Link>
      </div>
    );
  }

  // Erros derivados do estado
  const errorDescription = state.status === "error" ? getErrorMessage(state.code).description : null;
  const emailError = state.status === "invalid" ? getValidationMessage(state.fieldErrors.email) : undefined;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Alert Erro */}
      {errorDescription && (
        <Alert>
          <HugeiconsIcon icon={ICONS.feedback.error} />
          <AlertTitle>{texts("auth.forgotPassword.error.title")}</AlertTitle>
          <AlertDescription>{errorDescription}</AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <form action={formAction}>
        <FieldGroup>
          {/* Campo E-mail */}
          <Field data-invalid={!!emailError}>
            {/* Label */}
            <FieldLabel htmlFor={emailId}>{texts("auth.fields.email.label")}</FieldLabel>
            {/* Input */}
            <Input id={emailId} name="email" type="email" required defaultValue={state.email} aria-invalid={!!emailError} />
            {/* Error */}
            {emailError && <FieldError>{emailError}</FieldError>}
          </Field>

          {/* Botão de Enviar */}
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <LoadingSpinner />
                  <span>{texts("auth.forgotPassword.submit.loading")}</span>
                </>
              ) : (
                <span>{texts("auth.forgotPassword.submit.label")}</span>
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      {/* Voltar para o login */}
      <Link href={ROUTES.auth.login} className="text-center text-sm underline underline-offset-4">
        {texts("auth.backToLogin")}
      </Link>
    </div>
  );
}
