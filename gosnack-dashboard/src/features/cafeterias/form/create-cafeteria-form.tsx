"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { useCreateCafeteria } from "@/features/cafeterias/hooks/queries/cafeteria.mutations"
import { cafeteriaSchema } from "@/features/cafeterias/schemas/cafeteria.schema"
import { useUnits } from "@/features/units/hooks/queries/unit.queries"
import { Unit } from "@/features/units/types/unit.types"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { HugeiconsIcon } from "@hugeicons/react"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
  const createMutation = useCreateCafeteria()

  // States
  const [unitInputValue, setUnitInputValue] = useState("")
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)

  // Buscar unidades para o combobox
  const { data: units = [], isLoading: isLoadingUnits } = useUnits()

  /**
   * Instância do React Hook Form para o formulário de criar lanchonete.
   */
  const form = useForm<CafeteriaFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(cafeteriaSchema as any) as Resolver<CafeteriaFormData>,
    // Valores iniciais:
    defaultValues: {
      unitId: "",
      name: "",
      location: "",
      openingHours: {
        weekdays: {
          isOpen: false,
          openingTime: "07:00",
          closingTime: "18:00",
        },
        saturday: {
          isOpen: false,
          openingTime: "08:00",
          closingTime: "14:00",
        },
      },
    },
  })

  /**
   * Função executada ao submeter o formulário de criar lanchonete.
   */
  async function onSubmit(data: CafeteriaFormData) {
    // Criar lanchonete
    toast.promise(
      // executar mutation
      createMutation.mutateAsync({
        unitId: data.unitId,
        name: data.name,
        location: data.location,
        openingHours: data.openingHours,
      }),
      {
        // Carregamento
        loading: CAFETERIA_TEXTS.loading.create,
        // Sucesso:
        success: (cafeteria) => {
          // limpar form:
          form.reset()
          setSelectedUnit(null)
          setUnitInputValue("")

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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
      {/* Campos */}
      <FieldGroup>
        {/* Field Unidade */}
        <Controller
          control={form.control}
          name="unitId"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label Unidade */}
              <FieldLabel htmlFor={field.name}>{ENTITIES_TEXTS.unit.singular}</FieldLabel>

              {/* Combobox Unidade */}
              <Combobox
                items={units} // lista de unidades
                itemToStringValue={(unit: Unit) => unit.name} // valor para filtragem
                value={selectedUnit} // valor controlado pelo state
                // atualizar valor no RHF:
                onValueChange={(unit: Unit | null) => {
                  setSelectedUnit(unit) // atualizar state
                  setUnitInputValue(unit?.name ?? "")
                  field.onChange(unit?.id ?? "")
                }}
              >
                {/* Input e Placeholder */}
                <ComboboxInput
                  placeholder={CAFETERIA_TEXTS.fields.unit.placeholder}
                  value={unitInputValue} // exibir nome no Input
                  onChange={(e) => setUnitInputValue(e.target.value)} // atualizar state do input para filtragem
                  disabled={isLoadingUnits} // desabilitar durante loading
                  aria-invalid={fieldState.invalid}
                />
                <ComboboxContent>
                  {/* Mensagem de não encontrado */}
                  <ComboboxEmpty>{}</ComboboxEmpty>
                  {/* Lista de unidades */}
                  <ComboboxList>
                    {(unit) => (
                      // Item de unidade
                      <ComboboxItem key={unit.id} value={unit}>
                        <Item size="xs">
                          <ItemContent>
                            <ItemTitle>{unit.name}</ItemTitle>
                          </ItemContent>
                          {!unit.isActive && (
                            <ItemActions>
                              <Badge variant="destructive">{ENTITIES_TEXTS.commonAttributes.status.disabled}</Badge>
                            </ItemActions>
                          )}
                        </Item>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              {/* Erro Unidade */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

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
