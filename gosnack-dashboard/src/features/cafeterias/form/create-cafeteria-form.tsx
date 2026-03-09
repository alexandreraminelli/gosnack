"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { useCreateCafeteria } from "@/features/cafeterias/hooks/queries/cafeteria.mutations"
import { cafeteriaSchema } from "@/features/cafeterias/schemas/cafeteria.schema"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Controller, Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Tipagem dos dados do form de lanchonete.
 */
type CafeteriaFormData = z.infer<typeof cafeteriaSchema>

/**
 * Formulário de criar lanchonete.
 */
export default function CreateCafeteriaForm() {
  // Hooks
  const router = useRouter()

  // Hooks de mutação
  const createMutation = useCreateCafeteria()

  /**
   * Instância do React Hook Form para o formulário de criar lanchonete.
   */
  const form = useForm<CafeteriaFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(cafeteriaSchema as any) as Resolver<CafeteriaFormData>,
    // Valores iniciais:
    defaultValues: {
      unit: "",
      name: "",
      location: "",
      openingHours: undefined,
    },
  })

  // Buscar unidades para o combobox

  /**
   * Função executada ao submeter o formulário de criar lanchonete.
   */
  async function onSubmit(data: CafeteriaFormData) {
    // Criar lanchonete
    toast.promise(
      // executar mutation
      createMutation.mutateAsync({
        unitId: data.unit,
        name: data.name,
        location: data.location,
        openingHours: data.openingHours,
      }),
      {
        // Carregamento
        loading: CAFETERIA_TEXTS.loading.create,
        // Sucesso:
        success: (cafeteria) => {
          form.reset() // limpar form
          return {
            message: CAFETERIA_TEXTS.success.create.title,
            description: CAFETERIA_TEXTS.success.create.description(cafeteria.name),
            // Botão de ver lanchonete criada
            action: {
              label: CAFETERIA_TEXTS.actions.view,
              onClick: () => router.push(ROUTES.cafeterias.details(cafeteria.id)),
            },
          }
        },
        // Erro:
        error: (error: PostgrestError) => {
          if (error.code === DB_ERROR_CODES.uniqueViolation) {
            // Nome já existe na unidade
            return {
              message: CAFETERIA_TEXTS.error.duplicateName.title,
              description: CAFETERIA_TEXTS.error.duplicateName.description,
            }
          } else {
            // Outro erro
            return {
              message: CAFETERIA_TEXTS.error.create.title,
              description: getDbErrorMessage(error, CAFETERIA_TEXTS.error.create.fallback),
            }
          }
        },
      },
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* Campos */}
      <FieldGroup>
        {/* Field Unidade */}

        {/* Field Nome */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Nome */}
              <FieldLabel htmlFor={field.name}>{CAFETERIA_TEXTS.fields.name.label}</FieldLabel>
              {/* Input Nome */}
              <Input id={field.name} type="text" aria-invalid={fieldState.invalid} {...field} />
              {/* Erro Nome */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Field Localização */}
        <Controller
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Localização */}
              <FieldLabel htmlFor={field.name}>{CAFETERIA_TEXTS.fields.location.label}</FieldLabel>
              {/* Input Localização */}
              <Input id={field.name} type="text" placeholder={CAFETERIA_TEXTS.fields.location.placeholder} aria-invalid={fieldState.invalid} {...field} />
              {/* Erro Localização */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.actions.create} />}
        <span>{CAFETERIA_TEXTS.actions.add}</span>
      </Button>
    </form>
  )
}
