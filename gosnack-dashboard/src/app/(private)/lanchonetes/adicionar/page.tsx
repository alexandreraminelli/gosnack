import ContentWithImageLayout from "@/components/shared/layout/content/content-with-image-layout"
import { IMAGES } from "@/constants/images"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import CreateCafeteriaForm from "@/features/cafeterias/form/create-cafeteria-form"
import { Metadata } from "next"

/**
 * Metadados da página de lanchonetes.
 */
export const metadata: Metadata = {
  title: CAFETERIA_TEXTS.actions.add,
}

/**
 * Página de adicionar lanchonete.
 */
export default function AddCafeteriaPage() {
  return (
    <ContentWithImageLayout title={CAFETERIA_TEXTS.actions.add} image={IMAGES.illustrations.cafeteria}>
      <CreateCafeteriaForm />
    </ContentWithImageLayout>
  )
}
