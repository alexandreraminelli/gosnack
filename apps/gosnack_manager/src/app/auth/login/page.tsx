import { Button } from "@/core/components/ui/button";
import { CardHeader } from "@/core/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/core/components/ui/sheet";
import { LoginForm } from "@/features/auth/presentation/components/forms/login-form";
import { SignUpForm } from "@/features/auth/presentation/components/forms/sign-up-form";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

/**
 * Metadados da página de login.
 */
export async function generateMetadata(): Promise<Metadata> {
  const texts = await getTranslations("core.auth.login");

  return {
    title: texts("single"),
  };
}

/**
 * Página de login.
 */
export default function LoginPage() {
  // Textos
  const texts = useTranslations("core");

  return (
    <div className="space-y-10">
      <main className="space-y-5">
        {/* Header */}
        <CardHeader className="px-0 space-y-2 text-center md:text-start">
          {/* Título */}
          <h1 className="text-2xl font-bold">
            {texts("appName.complete")} <br />
            {texts("auth.login.title")}
          </h1>
          {/* <CardDescription>{texts("subtitle")}</CardDescription> */}
          <p className="text-muted-foreground text-base">{texts("auth.login.subtitle")}</p>
        </CardHeader>

        {/* Form */}
        <LoginForm />
      </main>

      {/* Botão criar contas para teste */}
      {process.env.NODE_ENV === "development" && (
        <Sheet>
          <SheetTrigger className="w-full">
            <Button variant="secondary" className="w-full">
              {texts("auth.signUp.label")}
            </Button>
          </SheetTrigger>
          {/* Sheet com form de criar conta */}
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{texts("auth.signUp.title")}</SheetTitle>
              <SheetDescription>{texts("auth.signUp.subtitle")}</SheetDescription>
            </SheetHeader>
            {/* Form de adicionar usuário */}
            <SignUpForm className="px-4" />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
