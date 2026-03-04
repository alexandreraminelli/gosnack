import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Botão de editar nome da unidade.
 */
export default function EditUnitNameButton() {
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
        <DialogHeader>
          <DialogTitle>{UNITS_TEXTS.actions.editName.title}</DialogTitle>
        </DialogHeader>
        TODO: Form de editar nome
      </DialogContent>
    </Dialog>
  )
}
