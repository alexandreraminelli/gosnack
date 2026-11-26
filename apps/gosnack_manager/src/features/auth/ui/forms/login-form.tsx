"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import LoadingSpinner from "@/core/components/shared/feedback/loading-spinner";
import { Button } from "@/ui/primitives/button";
import { Field, FieldGroup, FieldLabel } from "@/ui/primitives/field";
import { Input } from "@/ui/primitives/input";
import { toast } from "@/ui/primitives/toast";
import { createClient } from "@/core/supabase/client";
import { cn } from "@/core/lib/utils";
import { safeNextPath } from "@/core/lib/safe-next-path";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/ui/primitives/alert";
import { HugeiconsIcon } from "@hugeicons/react";
import { ICONS } from "@/core/constants/icons";
import { useSupabaseAuthErrorMessage } from "@/features/auth/hooks/use-supabase-auth-error-message";
import PasswordInput from "@/features/auth/ui/password-input";

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

  // Estados dos fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado do formulário
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const getErrorMessage = useSupabaseAuthErrorMessage();

  /**
   * Handle para lidar com a submissão do formulário de login.
   *
   * @param e Evento de submissão do formulário.
   */
  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault(); // Evita o comportamento padrão de submissão do formulário
    const supabase = createClient(); // Cria uma instância do cliente Supabase
    setIsLoading(true); // Indica que o formulário está em processo de submissão
    setError(null); // Limpar erros anteriores

    try {
      // Tenta realizar o login com o Supabase usando email e senha
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      // Se houver um erro, lança uma exceção para ser capturada no bloco catch
      if (error) throw error;

      // Notificação de tudo certo
      toast.add({
        type: "success",
        title: texts("auth.login.success.title"),
        description: texts("auth.login.success.message"),
      });

      const next = new URLSearchParams(window.location.search).get("next"); // Obtém o parâmetro "next" da URL, se existir
      // TODO: Ir pra página de dashboard
      router.push(safeNextPath(next, "/protected"));
    } catch (error) {
      const { title, description } = getErrorMessage(error);
      // Exibir notificação de erro
      toast.add({
        type: "error",
        title,
        description,
      });
      // Erro para o Alert
      setError(description);
    } finally {
      setIsLoading(false); // Indicar fim do carregamento
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Alert Erro */}
      {error && (
        <Alert variant="destructive">
          <HugeiconsIcon icon={ICONS.feedback.error} />
          <AlertTitle>{texts("auth.login.error.title")}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleLogin}>
        <FieldGroup>
          {/* Campo E-mail */}
          <Field>
            <FieldLabel htmlFor={emailId}>{texts("auth.fields.email.label")}</FieldLabel>
            <Input id={emailId} type="email" placeholder={texts("auth.fields.email.placeholder")} required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>

          {/* Campo de Senha */}
          {/* TODO: Criar componente de ocultar/exibir senha */}
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor={passwordId}>{texts("auth.fields.password.label")}</FieldLabel>
              {/* Botão de esqueceu a senha */}
              <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                {texts("auth.forgotPassword.label")}
              </Link>
            </div>
            <PasswordInput id={passwordId} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>

          {/* Botão de login */}
          <Field>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
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
