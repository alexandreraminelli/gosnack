"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { useToggleCafeteriaStatus } from "@/features/cafeterias/hooks/queries/cafeteria.mutations"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { HugeiconsIcon } from "@hugeicons/react"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

/**
 * Props de `ToggleCafeteriaStatusButton`.
 */
interface Props {
  cafeteria: Cafeteria
}

/**
 * Botão para ativar/desativar lanchonete.
 */
export default function ToggleCafeteriaStatusDialog({ cafeteria }: Props) {
  // Texts
  const label = ENTITIES_TEXTS.commonAttributes.status[cafeteria.isActive ? "disable" : "enable"]

  // Hooks
  const router = useRouter()

  // Mutation Hook
  const { mutateAsync: toggleStatus, isPending, error } = useToggleCafeteriaStatus()

  // Função de toggle
  function handleToggle() {
    toast.promise(
      toggleStatus({ id: cafeteria.id, value: !cafeteria.isActive }), // Executar mutation
      {
        // Carregamento
        loading: CAFETERIA_TEXTS.loading[cafeteria.isActive ? "disable" : "enable"],
        // Sucesso
        success: () => {
          router.refresh() // Atualizar página
          return {
            message: CAFETERIA_TEXTS.success[cafeteria.isActive ? "disabled" : "enabled"].title,
            description: CAFETERIA_TEXTS.success[cafeteria.isActive ? "disabled" : "enabled"].description(cafeteria.name),
          }
        },
        // Erro
        error: {
          message: CAFETERIA_TEXTS.error[cafeteria.isActive ? "disabled" : "enabled"].title,
          description: getDbErrorMessage(error as PostgrestError, CAFETERIA_TEXTS.error[cafeteria.isActive ? "disabled" : "enabled"].fallback),
        },
      },
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* Botão de ativar/desativar */}
        <Button variant={cafeteria.isActive ? "destructive" : "default"}>
          <span>{label}</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          {/* Ícone */}
          <AlertDialogMedia>
            <HugeiconsIcon icon={ICONS.feedback.warning} />
          </AlertDialogMedia>
          {/* Título */}
          <AlertDialogTitle>{CAFETERIA_TEXTS.actions[cafeteria.isActive ? "disable" : "enable"].title}</AlertDialogTitle>
          {/* Descrição */}
          <AlertDialogDescription>{CAFETERIA_TEXTS.actions[cafeteria.isActive ? "disable" : "enable"].description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {/* Cancelar */}
          <AlertDialogCancel>{UI_TEXTS.actions.cancel}</AlertDialogCancel>

          {/* Confirmar */}
          <AlertDialogAction
            variant={cafeteria.isActive ? "destructive" : "default"}
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
