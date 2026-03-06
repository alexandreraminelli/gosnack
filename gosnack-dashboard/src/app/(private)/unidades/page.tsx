import PageHeader from "@/components/shared/layout/headers/page-header"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import UnitList from "@/features/units/components/cards/unit-list"
import CreateUnitButton from "@/features/units/components/buttons/create-unit-button"

/**
 * Página de gerenciamento de unidades.
 */
export default function ManageUnitsPage() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <PageHeader title={UNITS_TEXTS.managerUnits}>
        {/* Botão de adicionar unidade */}
        <CreateUnitButton />
      </PageHeader>

      <main>
        {/* Lista de unidades */}
        <UnitList />
      </main>
    </section>
  )
}
