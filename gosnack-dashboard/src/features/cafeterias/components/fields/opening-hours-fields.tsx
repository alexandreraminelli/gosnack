"use client"

import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { DayPeriod } from "@/features/cafeterias/types/opening-hours.types"
import { Control, Controller, FieldValues, useFormState, useWatch } from "react-hook-form"

/**
 * Props do componente `OpeningHoursField`.
 */
type OpeningHoursFieldProps<TFormValues extends FieldValues> = {
  control: Control<TFormValues>
}

/**
 * Componente de campos para horários de funcionamento da lanchonete.
 */
export default function OpeningHoursField<TFormValues extends FieldValues>({ control }: OpeningHoursFieldProps<TFormValues>) {
  /**
   * Observador do campo.
   */
  const openingHours = useWatch({
    control,
    name: "openingHours" as never,
  })

  // Erro do zod
  const { errors } = useFormState({ control })

  // Se a lanchonete está aberta nos horários
  const weekdaysOpen = openingHours?.weekday?.isOpen ?? false
  const saturdayOpen = openingHours?.saturday?.isOpen ?? false

  /**
   * Configuração dos períodos de dias para os campos de horários de funcionamento.
   */
  const dayPeriods: { value: DayPeriod; label: string; isOpen: boolean }[] = [
    {
      value: "weekday",
      label: CAFETERIA_TEXTS.fields.openingHours.weekdays,
      isOpen: weekdaysOpen,
    },
    {
      value: "saturday",
      label: CAFETERIA_TEXTS.fields.openingHours.saturday,
      isOpen: saturdayOpen,
    },
  ]

  return (
    <FieldGroup className="gap-4">
      {/* Label Horário */}
      <FieldLabel>{CAFETERIA_TEXTS.fields.openingHours.label}</FieldLabel>

      {dayPeriods.map((day) => {
        const base = `openingHours.${day.value}`
        const switchId = `switch-${day.value}`

        return (
          <FieldLabel key={day.value} htmlFor={switchId} className="">
            <Field orientation="horizontal">
              <FieldContent>
                {/* Label período */}
                <FieldTitle className="mb-4">{day.label}</FieldTitle>

                {/* Horários */}
                <div className="flex flex-row items-center gap-2">
                  {/* Horário de abertura */}
                  <Controller control={control} name={`${base}.openingTime` as never} render={({ field }) => <Input type="time" disabled={!day.isOpen} {...field} />} />

                  {/* Separador */}
                  <span className="shrink-0">--</span>

                  {/* Horário de fechamento */}
                  <Controller control={control} name={`${base}.closingTime` as never} render={({ field }) => <Input type="time" disabled={!day.isOpen} {...field} />} />
                </div>

                {/* Mensagem de erro */}
                {(() => {
                  const periodErrors = (errors as Record<string, unknown>)?.openingHours as Record<string, { message?: string }> | undefined
                  const error = periodErrors?.[day.value]
                  return error?.message ? <FieldError errors={[{ message: error.message }]} /> : null
                })()}
              </FieldContent>

              {/* Switch aberto/fechado */}
              <Controller control={control} name={`${base}.isOpen` as never} render={({ field }) => <Switch id={switchId} checked={field.value} onCheckedChange={field.onChange} />} />
            </Field>
          </FieldLabel>
        )
      })}
    </FieldGroup>
  )
}
