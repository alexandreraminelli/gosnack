"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SheetClose, SheetFooter } from "@/components/ui/sheet"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { useCreateUnit } from "@/features/units/hooks/queries/unit.mutations"
import { unitSchema } from "@/features/units/schemas/unit.schema"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Controller, Resolver, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Tipagem dos dados do form.
 */
type UnitFormData = z.infer<typeof unitSchema>

/**
 * Props de `CreateUnitForm`.
 */
interface Props {
  /** Função executada após criar a unidade com sucesso. */
  onSuccess?: () => void
}

/**
 * Formulário para adicionar uma nova unidade.
 */
export default function CreateUnitForm({ onSuccess }: Props) {
  // Hooks
  const router = useRouter()

  /**
   * Instância do React Hook Form para o formulário de criar unidade.
   */
  const form = useForm<UnitFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(unitSchema as any) as Resolver<UnitFormData>,
    // Valores iniciais:
    defaultValues: {
      name: "",
    },
  })

  // Hooks de mutação
  const createMutation = useCreateUnit()

  /**
   * Função executada ao submeter o formulário de criar unidade.
   */
  async function onSubmit(data: UnitFormData) {
    // Criar unidade
    toast.promise(createMutation.mutateAsync({ ...data, isActive: true }), {
      // Carregamento
      loading: UNITS_TEXTS.loading.creating,
      // Sucesso
      success: (unit) => {
        onSuccess?.() // fechar sheet
        return {
          message: UNITS_TEXTS.success.create.title,
          description: UNITS_TEXTS.success.create.description(unit.name),
          action: {
            label: UNITS_TEXTS.actions.details,
            onClick: () => router.push(ROUTES.units.details(unit.id)),
          },
        }
      },
      // Erro
      error: (error: PostgrestError) => {
        if (error.code === DB_ERROR_CODES.uniqueViolation) {
          // Nome já existente
          return { message: UNITS_TEXTS.error.duplicateName.title, description: UNITS_TEXTS.error.duplicateName.description }
        } else {
          // Erro genérico
          return { message: UNITS_TEXTS.error.create.title, description: getDbErrorMessage(error, UNITS_TEXTS.error.create.description) }
        }
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1">
      {/* Campos */}
      <FieldGroup className="px-4">
        {/* Field de Nome da Unidade */}
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Nome */}
              <FieldLabel htmlFor={field.name}>{UNITS_TEXTS.fields.name}</FieldLabel>
              {/* Input Nome */}
              <Input id={field.name} aria-invalid={fieldState.invalid} {...field} />
              {/* Error Nome */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* Botões */}
      <SheetFooter>
        {/* Botão de salvar */}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <LoadingSpin /> : <HugeiconsIcon icon={ICONS.actions.create} />}
          {UI_TEXTS.actions.add}
        </Button>

        {/* Botão de cancelar */}
        <SheetClose asChild>
          <Button variant="secondary">{UI_TEXTS.actions.cancel}</Button>
        </SheetClose>
      </SheetFooter>
    </form>
  )
}
