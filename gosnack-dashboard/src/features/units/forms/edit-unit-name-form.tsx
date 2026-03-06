import LoadingSpin from "@/components/shared/feedback/loading/loading-spin"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { UNITS_TEXTS } from "@/constants/texts/entities/units.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { useEditUnitName } from "@/features/units/hooks/queries/unit.mutations"
import { unitSchema } from "@/features/units/schemas/unit.schema"
import { Unit } from "@/features/units/types/unit.types"
import { DB_ERROR_CODES, getDbErrorMessage } from "@/lib/supabase/errors/db-errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostgrestError } from "@supabase/supabase-js"
import { Controller, Resolver, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod/v4"

/**
 * Tipagem dos dados do form.
 */
type UnitFormData = z.infer<typeof unitSchema>

/**
 * Props de `EditUnitNameForm`.
 */
interface Props {
  unit: Unit
}

/**
 * Formulário para editar o nome de uma unidade.
 */
export default function EditUnitNameForm({ unit }: Props) {
  // Hooks de mutação
  const editNameMutation = useEditUnitName()

  /**
   * Instância do React Hook Form para o formulário de editar nome da unidade.
   */
  const form = useForm<UnitFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(unitSchema as any) as Resolver<UnitFormData>,
    // Valores iniciais:
    defaultValues: {
      name: unit.name,
    },
  })

  // Verificar se nome foi alterado para destacar o campo e habilitar o botão de salvar
  /** Hook para observar valores dos campos. */
  const watched = useWatch<UnitFormData>({ control: form.control })
  /** Observador do campo name. */
  const nameValue = watched.name ?? ""
  /** Se o nome foi alterado em relação ao valor original. */
  const isNameChanged = nameValue.trim() !== unit.name.trim()

  /**
   * Função executada ao submeter o formulário de editar nome da unidade.
   */
  async function onSubmit(data: UnitFormData) {
    if (!isNameChanged) return // não submeter se o nome não foi alterado
    const oldName = unit.name.trim()
    const newName = data.name.trim()

    toast.promise(
      editNameMutation.mutateAsync({ id: unit.id, newName }), // executar mutation
      {
        // Carregamento
        loading: UI_TEXTS.loading.salving,
        // Sucesso
        success: {
          message: UNITS_TEXTS.success.editName.title,
          description: UNITS_TEXTS.success.editName.description(oldName, newName),
        },

        // Erro
        error: (error: PostgrestError) => {
          if (error.code === DB_ERROR_CODES.uniqueViolation) {
            // Nome já utilizado
            return { message: UNITS_TEXTS.error.duplicateName.title, description: UNITS_TEXTS.error.duplicateName.description, type: "warning" }
          } else {
            // Erro genérico
            return {
              message: UNITS_TEXTS.error.editName.title,
              description: getDbErrorMessage(error, UNITS_TEXTS.error.editName.description),
            }
          }
        },
      },
    )
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        {/* Field de novo nome */}
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

      <DialogFooter>
        {/* Botão de cancelar */}
        <DialogClose asChild>
          <Button variant="secondary">{UI_TEXTS.actions.cancel}</Button>
        </DialogClose>

        {/* Botão de submit */}
        <Button disabled={!isNameChanged || form.formState.isSubmitting}>
          {form.formState.isSubmitting && <LoadingSpin />}
          <span>{UI_TEXTS.actions.save}</span>
        </Button>
      </DialogFooter>
    </form>
  )
}
