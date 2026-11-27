import { ForgotPasswordForm } from "@/features/auth";
import { useTranslations } from "next-intl";

export default function Page() {
  const texts = useTranslations("core"); // Textos

  return (
    <div className="space-y-10">
      <main className="w-full max-w-sm">
        {/* Header */}
        <header className="px-0 space-y-2 text-center md:text-start">
          {/* Título */}
          <h1 className="text-2xl font-bold">{texts("auth.forgotPassword.title")}</h1>
          <p className="text-muted-foreground text-base">{texts("auth.forgotPassword.subtitle")}</p>
        </header>

        <ForgotPasswordForm />
      </main>

      {/* Footer */}
    </div>
  );
}
