import { ROUTES } from "@/core/constants/navigation/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/primitives/card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

/**
 * Página de erro de autenticação.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ code: string }> }) {
  // Texts
  const errorTexts = await getTranslations("core.supabaseAuthErrorCodes");
  const texts = await getTranslations("core");

  // Obter o código de erro dos parâmetros de pesquisa
  const { code } = await searchParams;

  // Usar código se houver tradução, senão, o padrão para erros desconhecidos
  const key = code && errorTexts.has(`${code}.title` as never) ? code : "unknown";

  return (
    <>
      <CardHeader>
        <CardTitle className="font-medium text-lg tracking-normal">{errorTexts(`${key}.title` as never)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{errorTexts(`${key}.description` as never)}</p>
        <Link href={ROUTES.auth.login} className="text-sm underline underline-offset-4">
          {texts("auth.backToLogin")}
        </Link>
      </CardContent>
    </>
  );
}
