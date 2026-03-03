import HeaderWithTitleAndButton from "@/components/shared/layout/headers/header-with-title-and-button"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Página de gerenciamento de unidades.
 */
export default function ManageUnitsPage() {
  return (
    <section className="space-y-4">
      {/* Header */}
      <HeaderWithTitleAndButton title={UNITS_TEXTS.managerUnits} icon={ICONS.entities.unit}>
        {/* Botão de adicionar unidade */}
        <Button>
          <HugeiconsIcon icon={ICONS.actions.create} />
          {UNITS_TEXTS.actions.add}
        </Button>
      </HeaderWithTitleAndButton>

      {/* TODO: Lista de unidades */}
    </section>
  )
}
