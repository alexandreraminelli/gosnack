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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Router
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(safeNextPath(next, "/protected"));
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : texts("error.generic.unknown"));
    } finally {
      setIsLoading(false);
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
        </FieldGroup>

        <div className="flex flex-col gap-6">
          <div className="grid gap-2"></div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? texts("auth.login.submit.loading") : texts("auth.login.submit.label")}
          </Button>
        </div>
      </form>
    </div>
  );
}
