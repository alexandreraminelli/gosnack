import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { useToggleUnitStatus } from "@/features/units/hooks/queries/unit.mutations"
import { Unit } from "@/features/units/types/unit.types"
import { HugeiconsIcon } from "@hugeicons/react"
import { toast } from "sonner"

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

  // Mutation Hook
  const { mutateAsync: toggleStatus, isPending } = useToggleUnitStatus()

  function handleToggle() {
    toast.promise(
      toggleStatus({ id: unit.id, value: !unit.isActive }), // Executar mutation
      {
        loading: unit.isActive ? UNITS_TEXTS.loading.disabled : UNITS_TEXTS.loading.enabled,
        // Sucesso
        success: unit.isActive
          ? {
              message: UNITS_TEXTS.success.disabled.title,
              description: UNITS_TEXTS.success.disabled.description(unit.name),
            }
          : {
              message: UNITS_TEXTS.success.enabled.title,
              description: UNITS_TEXTS.success.enabled.description(unit.name),
            },
        // Erro
        error: { message: UNITS_TEXTS.error.updateStatus.title, description: UNITS_TEXTS.error.updateStatus.description },
      },
    )
  }

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
          <AlertDialogAction
            variant={unit.isActive ? "destructive" : "default"}
            onClick={handleToggle}
            disabled={isPending} // desabilitar durante submit
          >
            {isPending && <LoadingSpin />}
            {label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
