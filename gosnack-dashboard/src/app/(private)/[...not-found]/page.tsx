"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { IMAGES } from "@/constants/images"
import { ROUTES } from "@/constants/navigation/routes"
import { ERROR_TEXTS } from "@/constants/texts/error.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

/**
 * Página de erro 404 (Página Não Encontrada).
 */
export default function NotFoundPage() {
  // Hooks
  const router = useRouter()

  return (
    <EmptyState title={ERROR_TEXTS.notFound.title} description={[...ERROR_TEXTS.notFound.description]} image={IMAGES.illustrations.notFound}>
      {/* Botão de voltar */}
      <Button size="lg" variant="secondary" onClick={() => router.back()}>
        <HugeiconsIcon icon={ICONS.arrow.back} />
        <span>{UI_TEXTS.navigation.back}</span>
      </Button>

      {/* Botão de voltar pro início */}
      <Button size="lg" asChild>
        <Link href={ROUTES.home}>
          <HugeiconsIcon icon={ICONS.pages.home} />
          {UI_TEXTS.navigation.backToHome}
        </Link>
      </Button>
    </EmptyState>
  )
}
