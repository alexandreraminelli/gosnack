"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/core/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { createClient } from "@/core/lib/supabase/client";
import { cn } from "@/core/lib/utils";
import { safeNextPath } from "@/lib/safe-next-path";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "@/core/components/ui/toast";
import LoadingSpinner from "@/core/components/shared/feedback/loading-spinner";

/**
 * Formulário de login.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  // Textos
  const texts = useTranslations("core");

  // Estados dos fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado do formulário
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  /**
   * Handle para lidar com a submissão do formulário de login.
   *
   * @param e Evento de submissão do formulário.
   */
  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de submissão do formulário
    const supabase = createClient(); // Cria uma instância do cliente Supabase
    setIsLoading(true); // Indica que o formulário está em processo de submissão

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
      // Exibir notificação de erro
      toast.add({
        type: "error",
        // TODO: Mapear códigos de erro do Supabase para mensagens traduzidas
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido durante o login. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false); // Indicar fim do carregamento
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
        <FieldGroup>
          {/* Campo E-mail */}
          <Field>
            <FieldLabel>{texts("auth.fields.email.label")}</FieldLabel>
            <Input id="email" type="email" placeholder={texts("auth.fields.email.placeholder")} required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>

          {/* Campo de Senha */}
          <Field>
            <div className="flex items-center">
              <Label htmlFor="password">{texts("auth.fields.password.label")}</Label>
              {/* Botão de esqueceu a senha */}
              <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                {texts("auth.forgotPassword.label")}
              </Link>
            </div>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
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
