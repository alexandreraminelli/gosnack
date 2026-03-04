"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { Button } from "@/components/ui/button"
import { IMAGES } from "@/constants/images"
import { ROUTES } from "@/constants/navigation/routes"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import UnitDashboardSkeleton from "@/features/units/components/dashboard/unit-dashboard-skeleton"
import { useUnit } from "@/features/units/hooks/queries/unit.queries"
import Link from "next/link"

/**
 * Props de `UnitDashboard`.
 */
interface Props {
  /** ID da unidade. */
  unitId: string
}

/**
 * Página de Dashboard de unidades.
 */
export default function UnitDashboard({ unitId }: Props) {
  // Obter unidade
  const { data: unit, isLoading, isError } = useUnit(unitId)

  // Skeleton de carregamento
  if (isLoading) {
    return <UnitDashboardSkeleton />
  }

  // Página de unidade não encontrada
  if (!unit || isError) {
    return (
      <EmptyState title={UNITS_TEXTS.error.notFound.title} description={[...UNITS_TEXTS.error.notFound.description]} image={IMAGES.illustrations.schoolUnit}>
        {/* Botão de voltar pra lista */}
        <Button asChild>
          <Link href={ROUTES.units.list}>{UNITS_TEXTS.error.notFound.action}</Link>
        </Button>
      </EmptyState>
    )
  }

  return (
    <main>
      <h1>Dashboard de Unidades</h1>
      <p>ID da unidade: {unitId}</p>
      <p>Nome da unidade: {unit.name}</p>
    </main>
  )
}
