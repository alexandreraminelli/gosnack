"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";

import LoadingSpinner from "@/core/components/shared/feedback/loading-spinner";
import { Button } from "@/core/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { toast } from "@/core/components/ui/toast";
import { createClient } from "@/core/lib/supabase/client";
import { cn } from "@/core/lib/utils";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/core/components/ui/alert";
import { HugeiconsIcon } from "@hugeicons/react";

/**
 * Formulário de criação de conta.
 *
 * Permite, em ambiente de desenvolvimento, criar uma conta de usuário para teste.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  // Textos
  const texts = useTranslations("core");

  // IDs dos fields
  const emailId = useId();
  const passwordId = useId();

  // Estados dos fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados do formulário
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  /**
   * Handle para lidar com a submissão do formulário de criação de conta.
   *
   * @param e Evento de submissão do formulário.
   */
  async function handleSignUp(e: React.SubmitEvent) {
    e.preventDefault(); // Evita o comportamento padrão de submissão do formulário

    // Não fazer nada se não estiver em modo dev
    if (process.env.NODE_ENV === "development") return;

    const supabase = createClient(); // Cria uma instância do cliente Supabase
    setIsLoading(true); // Indica que o formulário está em processo de submissão
    setError(null); // Limpar erros anteriores

    try {
      // Realizar login pelo Supabase Auth
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      // Se houver um erro, lança uma exceção para ser capturada pelo bloco catch
      if (error) throw error;

      // Notificação de sucesso
      toast.add({
        type: "success",
        title: texts("auth.signUp.success.title"),
        description: texts("auth.signUp.success.message"),
      });

      // Redirecionamento
      // TODO(navigation): Registrar rota em constante
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      toast.add({
        type: "error",
        // TODO: Mapear códigos de erro do Supabase para mensagens traduzidas
        title: "Erro ao criar uma conta",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido durante o cadastro. Por favor, tente novamente mais tarde.",
      });
      // TODO(auth-error): Exibir alert de erro
      setError(error instanceof Error ? error.message : "An error occurred");
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

      <form onSubmit={handleSignUp}>
        <FieldGroup>
          {/* Campo E-mail */}
          <Field>
            <FieldLabel htmlFor={emailId}>{texts("auth.fields.email.label")}</FieldLabel>
            <Input id={emailId} type="email" placeholder={texts("auth.fields.email.placeholder")} required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>

          {/* Campo de Senha */}
          {/* TODO: Criar componente de ocultar/exibir senha */}
          <Field>
            <FieldLabel htmlFor={passwordId}>{texts("auth.fields.password.label")}</FieldLabel>
            <Input id={passwordId} type="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Field>

          {/* Botão de submissão */}
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
