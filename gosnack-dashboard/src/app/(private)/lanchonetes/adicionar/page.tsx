import FormWithImageLayout from "@/components/shared/layout/forms/form-with-image-layout"
import { IMAGES } from "@/constants/images"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import CreateCafeteriaForm from "@/features/cafeterias/form/create-cafeteria-form"

/**
 * Página de adicionar lanchonete.
 */
export default function AddCafeteriaPage() {
  return (
    <FormWithImageLayout title={CAFETERIA_TEXTS.actions.add} image={IMAGES.illustrations.cafeteria}>
      <CreateCafeteriaForm />
    </FormWithImageLayout>
  )
}
