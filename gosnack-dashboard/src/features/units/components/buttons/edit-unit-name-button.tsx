import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import EditUnitNameForm from "@/features/units/forms/edit-unit-name-form"
import { Unit } from "@/features/units/types/unit.types"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Props de `EditUnitNameButton`.
 */
interface Props {
  unit: Unit
}

/**
 * Botão de editar nome da unidade.
 */
export default function EditUnitNameButton({ unit }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Botão de editar */}
        <Button variant="outline">
          <HugeiconsIcon icon={ICONS.actions.edit} />
          <span>{UNITS_TEXTS.actions.editName.label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{UNITS_TEXTS.actions.editName.title}</DialogTitle>
        </DialogHeader>

        {/* Formulário */}
        <EditUnitNameForm unit={unit} />
      </DialogContent>
    </Dialog>
  )
}
