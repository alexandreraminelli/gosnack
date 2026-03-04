import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { Unit } from "@/features/units/types/unit.types"

/**
 * Props de `ToggleUnitStatusButton`.
 */
interface Props {
  unit: Unit
}

/**
 * Botão para alternar o status ativo/inativo da unidade.
 */
export default function ToggleUnitStatusButton({ unit }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Botão de habilitar/desabilitar */}
        <Button variant={unit.isActive ? "destructive" : "default"}>
          <span>{unit.isActive ? UNITS_TEXTS.actions.disable.label : UNITS_TEXTS.actions.enable.label}</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{unit.isActive ? UNITS_TEXTS.actions.disable.title : UNITS_TEXTS.actions.enable.title}</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
