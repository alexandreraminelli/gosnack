import CreateUnitButton from "@/features/units/components/create-unit-button"
import HeaderWithTitleAndButton from "@/components/shared/layout/headers/header-with-title-and-button"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import UnitList from "@/features/units/components/cards/unit-list"

/**
 * Página de gerenciamento de unidades.
 */
export default function ManageUnitsPage() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <HeaderWithTitleAndButton title={UNITS_TEXTS.managerUnits} icon={ICONS.entities.unit}>
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
