import HeaderWithTitleAndButton from "@/components/shared/layout/headers/header-with-title-and-button"
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
      <HeaderWithTitleAndButton title={UNITS_TEXTS.managerUnits}>
        {/* Botão de adicionar unidade */}
        <CreateUnitButton />
      </HeaderWithTitleAndButton>

      <main>
        {/* Lista de unidades */}
        <UnitList />
      </main>
    </section>
  )
}
