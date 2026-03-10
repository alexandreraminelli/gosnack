import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"

/**
 * Props de `ToggleCafeteriaStatusButton`.
 */
interface Props {
  cafeteria: Cafeteria
}

/**
 * Botão para ativar/desativar lanchonete.
 */
export default function ToggleCafeteriaStatusButton({ cafeteria }: Props) {
  // Texts
  const label: string = cafeteria.isActive ? CAFETERIA_TEXTS.actions.disable.label : CAFETERIA_TEXTS.actions.enable.label

  // Mutation Hook

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Botão de ativar/desativar */}
        <Button variant={cafeteria.isActive ? "destructive" : "default"}>
          <span>{label}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader></AlertDialogHeader>

        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
