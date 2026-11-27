"use client";

import { ICONS } from "@/core/constants/icons";
import { ROUTES } from "@/core/constants/navigation/routes";
import { Button } from "@/ui/primitives/button";
import EmptyMessage from "@/ui/shared/feedback/empty-message";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Página de erro 404 (Não Encontrado).
 */
export default function NotFoundPage() {
  const texts = useTranslations("core");
  const router = useRouter();

  return (
    <EmptyMessage title={texts("error.notFoundPage.title")} description={[texts("error.notFoundPage.description1")]}>
      {/* Botão de voltar */}
      <Button size="lg" variant="outline" onClick={() => router.back()}>
        <HugeiconsIcon icon={ICONS.arrow.back} />
        <span>{texts("actions.back")}</span>
      </Button>

      {/* Botão de voltar pro início */}
      <Button size="lg" render={<Link href={ROUTES.home} />}>
        <HugeiconsIcon icon={ICONS.pages.home} />
        <span>{texts("navigation.backToHome")}</span>
      </Button>
    </EmptyMessage>
  );
}
