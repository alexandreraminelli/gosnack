"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import OpeningHoursField from "@/features/cafeterias/components/fields/opening-hours-fields"
import { useEditCafeteriaOpeningHours } from "@/features/cafeterias/hooks/queries/cafeteria.mutations"
import { editOpeningHoursFormSchema } from "@/features/cafeterias/schemas/cafeteria.schema"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { DayPeriod, OpeningHours } from "@/features/cafeterias/types/opening-hours.types"
import { getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Props de `EditOpeningHoursCafeteriaForm`.
 */
interface Props {
  cafeteria: Cafeteria
}

/**
 * Tipagem dos dados do formulário de edição dos horários de funcionamento da lanchonete.
 */
type EditOpeningHoursFormData = z.infer<typeof editOpeningHoursFormSchema>

/**
 * Formulário para editar os horários de funcionamento da lanchonete.
 */
export default function EditCafeteriaOpeningHoursForm({ cafeteria }: Props) {
  // Hooks
  const router = useRouter()
  const editMutation = useEditCafeteriaOpeningHours()

  // Valores padrão do formulário mapeados a partir dos dados da lanchonete
  const weekday = cafeteria.openingHours.find((hours) => hours.period === "weekday")
  const saturday = cafeteria.openingHours.find((hours) => hours.period === "saturday")

  // Zod Schema

  /**
   * Instância do React Hook Form para o formulário de edição dos horários de funcionamento da lanchonete.
   */
  const form = useForm<EditOpeningHoursFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(editOpeningHoursFormSchema as any) as Resolver<EditOpeningHoursFormData>,
    // Valores iniciais
    defaultValues: {
      openingHours: {
        // Dias da semana
        weekday: {
          isOpen: weekday?.isOpen ?? false,
          openingTime: weekday?.openTime ?? "07:00",
          closingTime: weekday?.closeTime ?? "18:00",
        },
        // Sábado
        saturday: {
          isOpen: saturday?.isOpen ?? false,
          openingTime: saturday?.openTime ?? "08:00",
          closingTime: saturday?.closeTime ?? "14:00",
        },
      },
    },
  })

  /**
   * Função executada ao submeter o formulário
   */
  async function onSubmit(data: EditOpeningHoursFormData) {
    const periods: DayPeriod[] = ["weekday", "saturday"]

    // Mapear os dados do formulário para o formato esperado pela API, associando o ID da lanchonete e o período correspondente
    const openingHoursToUpdate: OpeningHours[] = periods
      .map((period) => {
        // Encontrar os horários originais para o período (weekday ou saturday)
        const original = cafeteria.openingHours.find((hours) => hours.period === period)
        // Se não encontrar os horários originais para o período, retorna null
        if (!original) return null

        const values = data.openingHours[period]

        return {
          ...original, // Manter os campos originais (id, cafeteriaId, period)
          isOpen: values?.isOpen ?? false,
          openTime: values?.openingTime ?? null,
          closeTime: values?.closingTime ?? null,
        }
      })
      .filter((hours): hours is OpeningHours => hours !== null) // Filtrar valores nulos

    toast.promise(
      // Executar mutation
      editMutation.mutateAsync({
        id: cafeteria.id,
        openingHours: openingHoursToUpdate, // Enviar os horários mapeados para a API
      }),
      {
        // Carregamento
        loading: CAFETERIA_TEXTS.loading.edit,
        // Sucesso
        success: () => {
          router.refresh() // Atualizar dados da página
          return {
            message: CAFETERIA_TEXTS.success.edit.title,
            description: CAFETERIA_TEXTS.fields.openingHours.edited,
          }
        },
        // Erro
        error: (error: PostgrestError) => ({
          message: CAFETERIA_TEXTS.error.edit.title,
          description: getDbErrorMessage(error, CAFETERIA_TEXTS.error.edit.fallback),
        }),
      },
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo */}
      <OpeningHoursField control={form.control} />

      {/* Footer */}
      <DialogFooter>
        {/* Cancelar */}
        <DialogClose asChild>
          <Button variant="secondary">{UI_TEXTS.actions.cancel}</Button>
        </DialogClose>

        {/* Submit */}
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && <LoadingSpin />}
          <span>{UI_TEXTS.actions.save}</span>
        </Button>
      </DialogFooter>
    </form>
  )
}
