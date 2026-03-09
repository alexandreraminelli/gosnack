import PageHeader from "@/components/shared/layout/headers/page-header"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import CafeteriaCardList from "@/features/cafeterias/components/cards/cafeteria-card-list"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

/**
 * Página de lanchonetes.
 */
export default function CafeteriasPage() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <PageHeader title={CAFETERIA_TEXTS.management}>
        {/* Botão de criar lanchonete */}
        <Button asChild>
          <Link href={ROUTES.cafeterias.add}>
            <HugeiconsIcon icon={ICONS.actions.create} />
            <span>{CAFETERIA_TEXTS.actions.add}</span>
          </Link>
        </Button>
      </PageHeader>

      {/* Lista */}
      <CafeteriaCardList />
    </section>
  )
}
