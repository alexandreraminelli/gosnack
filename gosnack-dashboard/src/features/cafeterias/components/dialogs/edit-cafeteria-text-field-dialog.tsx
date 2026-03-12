import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import EditCafeteriaTextFieldForm from "@/features/cafeterias/form/edit-cafeteria-text-field-form"
import { Cafeteria, CafeteriaTextField } from "@/features/cafeterias/types/cafeteria.types"

/**
 * Props de `EditCafeteriaTextFieldDialog`.
 */
interface Props {
  cafeteria: Cafeteria
  field: CafeteriaTextField
  children: React.ReactNode
}

/**
 * Dialog para editar campos de texto de uma lanchonete.
 */
export default function EditCafeteriaTextFieldDialog({ cafeteria, field, children }: Props) {
  // Texts
  const title: string = CAFETERIA_TEXTS.fields[field].edit

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* Botão de editar */}
        {children}
      </DialogTrigger>

      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Formulário */}
        <EditCafeteriaTextFieldForm cafeteria={cafeteria} textField={field} />
      </DialogContent>
    </Dialog>
  )
}
