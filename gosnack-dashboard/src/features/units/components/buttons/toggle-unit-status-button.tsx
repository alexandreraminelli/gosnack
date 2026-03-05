import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"

import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { Unit } from "@/features/units/types/unit.types"
import { HugeiconsIcon } from "@hugeicons/react"

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
  const label = unit.isActive ? UNITS_TEXTS.actions.disable.label : UNITS_TEXTS.actions.enable.label

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Botão de habilitar/desabilitar */}
        <Button variant={unit.isActive ? "destructive" : "default"}>
          <span>{label}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Ícone */}
          <AlertDialogMedia>
            <HugeiconsIcon icon={ICONS.feedback.warning} />
          </AlertDialogMedia>
          {/* Título */}
          <AlertDialogTitle>{unit.isActive ? UNITS_TEXTS.actions.disable.title : UNITS_TEXTS.actions.enable.title}</AlertDialogTitle>
          {/* Descrição */}
          <AlertDialogDescription>{unit.isActive ? UNITS_TEXTS.actions.disable.description : UNITS_TEXTS.actions.enable.description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Cancelar */}
          <AlertDialogCancel>{UI_TEXTS.actions.cancel}</AlertDialogCancel>

          {/* Confirmar */}
          <AlertDialogAction variant={unit.isActive ? "destructive" : "default"}>{label}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
