"use client"

import EmptyState from "@/components/shared/feedback/empty-state"
import { IMAGES } from "@/constants/images"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import UnitCard from "@/features/units/components/cards/unit-card"
import UnitListSkeleton from "@/features/units/components/cards/unit-list-skeleton"
import CreateUnitButton from "@/features/units/components/create-unit-button"
import { useUnits } from "@/features/units/hooks/queries/unit.queries"
import { toast } from "sonner"

/**
 * Lista de unidades escolares.
 */
export default function UnitList() {
  // Buscar unidades
  const { data: units = [], isLoading, isError } = useUnits()

  // Skeleton durante carregamento
  if (isLoading) return <UnitListSkeleton />

  // Erro
  if (isError) {
    // TODO: Obter description do Supabase
    toast.error(UNITS_TEXTS.error.getList.title, { description: "TODO: Obter erro do Supabase" })
  }

  // Se não houver unidades
  if (units.length === 0) {
    return (
      <EmptyState title={UNITS_TEXTS.empty.title} description={[...UNITS_TEXTS.empty.description]} image={IMAGES.illustrations.schoolUnit}>
        {/* Botão de adicionar unidade */}
        <CreateUnitButton />
      </EmptyState>
    )
  }

  // Lista de unidades
  return (
    <div className="space-y-4">
      {/* Quantidade de unidades */}
      <p className="text-muted-foreground">{UNITS_TEXTS.quant(units.length)}</p>

      <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(var(--container-3xs),1fr))]">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </section>
    </div>
  )
}
