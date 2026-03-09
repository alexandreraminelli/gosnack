"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { IMAGES } from "@/constants/images"
import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import CafeteriaCardListSkeleton from "@/features/cafeterias/components/cards/cafeteria-card-list-skeleton"
import { useCafeterias } from "@/features/cafeterias/hooks/queries/cafeteria.queries"
import { getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { HugeiconsIcon } from "@hugeicons/react"
import { PostgrestError } from "@supabase/supabase-js"
import Link from "next/link"
import { toast } from "sonner"

/**
 * Lista de cards de lanchonetes.
 */
export default function CafeteriaCardList() {
  // Buscar lanchonetes
  const { data: cafeterias = [], isLoading, isError, error } = useCafeterias()

  // Loading Skeleton
  if (isLoading) return <CafeteriaCardListSkeleton />

  // Erro
  if (isError) {
    toast.error(CAFETERIA_TEXTS.error.getAll, { description: getDbErrorMessage(error as PostgrestError, UI_TEXTS.status.error) })
  }

  // Se não houver lanchonetes
  if (cafeterias.length === 0 || isError) {
    return (
      <EmptyState title={CAFETERIA_TEXTS.empty.title} description={[...CAFETERIA_TEXTS.empty.description]} image={IMAGES.illustrations.cafeteria}>
        {/* Botão de criar lanchonete */}
        <Button asChild>
          <Link href={ROUTES.cafeterias.add}>
            <HugeiconsIcon icon={ICONS.actions.create} />
            <span>{CAFETERIA_TEXTS.actions.add}</span>
          </Link>
        </Button>
      </EmptyState>
    )
  }

  // Lista de lanchonetes
  return (
    <div>
      {cafeterias.map((cafeteria) => (
        <div key={cafeteria.id}>
          <h2>{cafeteria.name}</h2>
          <p>{cafeteria.id}</p>
        </div>
      ))}
    </div>
  )
}
