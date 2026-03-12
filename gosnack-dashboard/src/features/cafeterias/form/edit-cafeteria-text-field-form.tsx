"use client"

import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { useEditCafeteriaTextField } from "@/features/cafeterias/hooks/queries/cafeteria.mutations"
import { cafeteriaLocationSchema, cafeteriaNameSchema } from "@/features/cafeterias/schemas/cafeteria.schema"
import { Cafeteria, CafeteriaTextField } from "@/features/cafeterias/types/cafeteria.types"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostgrestError } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Controller, Resolver, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Props de `EditCafeteriaTextFieldForm`.
 */
interface Props {
  cafeteria: Cafeteria
  textField: CafeteriaTextField
}

// Tipagem dos dados do formulário para cada campo de texto editável
type CafeteriaNameFormData = z.infer<typeof cafeteriaNameSchema>
type CafeteriaLocationFormData = z.infer<typeof cafeteriaLocationSchema>
type CafeteriaFormData = CafeteriaNameFormData | CafeteriaLocationFormData

/**
 * Formulário para editar um campo de texto da lanchonete.
 */
export default function EditCafeteriaTextFieldForm({ cafeteria, textField }: Props) {
  // Hooks
  const router = useRouter()
  const editMutation = useEditCafeteriaTextField()

  // Texts
  const label = CAFETERIA_TEXTS.fields[textField].label

  // Zod Schema
  const schemaMap = {
    name: cafeteriaNameSchema,
    location: cafeteriaLocationSchema,
  } satisfies Record<CafeteriaTextField, z.ZodTypeAny>
  const formSchema = schemaMap[textField]

  // Valores padrão
  const defaultValuesMap = {
    name: { name: cafeteria.name },
    location: { location: cafeteria.location ?? "" },
  } satisfies Record<CafeteriaTextField, CafeteriaFormData>

  /**
   * Instância do React Hook Form para o formulário de edição do campo de texto da lanchonete.
   */
  const form = useForm<CafeteriaFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema as any) as Resolver<CafeteriaFormData>,
    // Valores iniciais:
    defaultValues: defaultValuesMap[textField],
  })

  // Verificar se o campo foi alterado para habilitar botão de salvar
  /** Valor original do campo. */
  const originalValue = (cafeteria[textField] ?? "").trim()
  /** Valor do campo observado para verificar se foi alterado em relação ao valor original. */
  const watchedValue =
    useWatch({
      control: form.control,
      name: textField, // nome do campo a ser observado
    }) ?? ""
  /** Se o campo foi alterado. */
  const isFieldChanged = watchedValue.trim() !== originalValue.trim()

  /**
   * Função executada ao submeter o formulário.
   */
  async function onSubmit(data: CafeteriaFormData) {
    // Não submeter se o campo não foi alterado
    if (!isFieldChanged) return
    const newValue = (data as Record<CafeteriaTextField, string>)[textField].trim()

    toast.promise(
      // Executar mutation
      editMutation.mutateAsync({
        id: cafeteria.id,
        field: textField,
        newValue: newValue,
      }),
      {
        // Carregamento
        loading: CAFETERIA_TEXTS.loading.edit,
        // Sucesso
        success: () => {
          router.refresh() // Atualizar página
          return {
            message: CAFETERIA_TEXTS.success.edit.title,
            description: CAFETERIA_TEXTS.fields[textField].edited,
          }
        },
        // Erro
        error: (error: PostgrestError) => {
          if (error.code === DB_ERROR_CODES.uniqueViolation) {
            // Nome duplicado
            return {
              message: CAFETERIA_TEXTS.error.duplicateName.title,
              description: CAFETERIA_TEXTS.error.duplicateName.description,
            }
          } else {
            // Outro erro
            return {
              message: CAFETERIA_TEXTS.error.edit.title,
              description: getDbErrorMessage(error, CAFETERIA_TEXTS.error.edit.fallback),
            }
          }
        },
      },
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {/* Campo */}
      <FieldGroup>
        <Controller
          control={form.control}
          name={textField}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {/* Label */}
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {/* Input */}
              <Input id={field.name} type="text" aria-invalid={fieldState.invalid} {...field} />
              {/* Error */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        {/* Botão de cancelar */}
        <DialogClose asChild>
          <Button variant="secondary">{UI_TEXTS.actions.cancel}</Button>
        </DialogClose>

        {/* Botão de submit */}
        <Button disabled={!isFieldChanged || form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoadingSpin />}
          <span>{UI_TEXTS.actions.save}</span>
        </Button>
      </DialogFooter>
    </form>
  )
}
