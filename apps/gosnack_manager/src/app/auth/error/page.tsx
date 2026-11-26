import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { getTranslations } from "next-intl/server";

// TODO: Adaptar esse arquivo gerado automaticamente pelo `pnpm dlx shadcn@latest add @supabase/password-based-auth-nextjs` para o projeto

/**
 * Rota de erro de autenticação.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ error: string }> }) {
  const texts = await getTranslations("core.error.generic");

  const params = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-medium text-lg tracking-normal">{texts("title")}</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">
                  {texts("errorCode")} {params.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">{texts("unknown")}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
