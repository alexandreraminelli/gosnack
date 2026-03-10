"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { IMAGES } from "@/constants/images"
import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import CafeteriaDashboardSkeleton from "@/features/cafeterias/components/dashboard/cafeteria-dashboard-skeleton"
import { useCafeteria } from "@/features/cafeterias/hooks/queries/cafeteria.queries"
import { getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { PostgrestError } from "@supabase/supabase-js"
import Link from "next/link"
import { toast } from "sonner"

/**
 * Props de `CafeteriaDashboard`.
 */
interface Props {
  cafeteriaId: string
}

/**
 * Dashboard de uma lanchonete.
 */
export default function CafeteriaDashboard({ cafeteriaId }: Props) {
  // Obter lanchonete
  const { data: cafeteria, isLoading, isError, error } = useCafeteria(cafeteriaId)

  // Skeleton de carregamento
  if (isLoading) return <CafeteriaDashboardSkeleton />

  // Erro ao carregar lanchonete
  if (isError) {
    toast.error(CAFETERIA_TEXTS.error.getDetails.title, { description: getDbErrorMessage(error as PostgrestError, CAFETERIA_TEXTS.error.getDetails.fallback) })
  }

  // Lanchonete não encontrada
  if (!cafeteria || isError) {
    return (
      <EmptyState title={CAFETERIA_TEXTS.error.notFound.title} description={[...CAFETERIA_TEXTS.error.notFound.description]} image={IMAGES.illustrations.cafeteria}>
        {/* Botão de voltar pra lista */}
        <Button asChild>
          <Link href={ROUTES.cafeterias.list}>{CAFETERIA_TEXTS.error.notFound.action}</Link>
        </Button>
      </EmptyState>
    )
  }

  // Lanchonete encontrada
  return (
    <section>
      <h1>{cafeteria.name}</h1>
      <p>{cafeteria.id}</p>
      <p>{cafeteria.location}</p>
    </section>
  )
}
