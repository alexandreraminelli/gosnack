"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { IMAGES } from "@/constants/images"
import { ROUTES } from "@/constants/navigation/routes"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import EditUnitNameButton from "@/features/units/components/buttons/edit-unit-name-button"
import ToggleUnitStatusButton from "@/features/units/components/buttons/toggle-unit-status-button"
import UnitDashboardSkeleton from "@/features/units/components/dashboard/unit-dashboard-skeleton"
import { useUnit } from "@/features/units/hooks/queries/unit.queries"
import { Unit } from "@/features/units/types/unit.types"
import { HugeiconsIcon } from "@hugeicons/react"
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
    <main className="space-y-5">
      {/* Header */}
      <DashboardHeader unit={unit} />

      {/* Alert de unidade desabilitada */}
      {!unit.isActive && (
        <Alert variant="destructive" className="border-destructive">
          {/* Ícone */}
          <HugeiconsIcon icon={ICONS.status.disable} />

          <AlertTitle>{UNITS_TEXTS.message.disabled.title}</AlertTitle>
          <AlertDescription>{UNITS_TEXTS.message.disabled.description}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row *:flex-1 gap-4">
        {/* TODO: Lista de lanchonetes */}
        <section>TODO: Lista de lanchonetes</section>

        {/* TODO: Lista de administradores */}
        <section>TODO: Lista de administradores</section>
      </div>
    </main>
  )
}

/**
 * Props dos componentes internos.
 */
interface InternalProps {
  unit: Unit
}

/**
 * Header do dashboard de unidade.
 */
function DashboardHeader({ unit }: InternalProps) {
  return (
    <header
      className="bg-zinc-100 dark:bg-zinc-900 text-card-foreground rounded-xl
        flex flex-col sm:flex-row flex-wrap justify-between items-center
        gap-6 p-6"
    >
      {/* Nome da unidade */}
      <h2 className="text-2xl md:text-3xl font-medium text-center">{unit.name}</h2>

      <aside className="flex flex-row flex-wrap *:flex-1 gap-3">
        {/* Botão de editar nome */}
        <EditUnitNameButton unit={unit} />

        {/* Botão de desativar/ativar */}
        <ToggleUnitStatusButton unit={unit} />
      </aside>
    </header>
  )
}
