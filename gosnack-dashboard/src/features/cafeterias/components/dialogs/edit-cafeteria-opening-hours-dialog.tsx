import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import EditCafeteriaOpeningHoursForm from "@/features/cafeterias/form/edit-cafeteria-opening-hours-form"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"

/**
 * Props de `EditCafeteriaOpeningHoursDialog`.
 */
interface Props {
  cafeteria: Cafeteria
  children: React.ReactNode
}

/**
 * Dialog para editar o horário de funcionamento da lanchonete.
 */
export default function EditCafeteriaOpeningHoursDialog({ cafeteria, children }: Props) {
  return (
    <Dialog>
      {/* Botão de editar */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>{CAFETERIA_TEXTS.fields.openingHours.edit}</DialogTitle>
        </DialogHeader>

        {/* Formulário */}
        <EditCafeteriaOpeningHoursForm cafeteria={cafeteria} />
      </DialogContent>
    </Dialog>
  )
}
