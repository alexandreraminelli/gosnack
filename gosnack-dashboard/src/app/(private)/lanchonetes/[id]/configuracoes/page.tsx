import ContentWithImageLayout from "@/components/shared/layout/content/content-with-image-layout"
import { ICONS } from "@/constants/icons"
import { IMAGES } from "@/constants/images"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import CafeteriaSettings from "@/features/cafeterias/components/settings/cafeteria-settings"
import { cafeteriaService } from "@/features/cafeterias/services/cafeteria.service"

/**
 * Parâmetros da rota `/lanchonetes/[id]/configuracoes`.
 */
interface Params {
  params: Promise<{
    /** ID da lanchonete. */
    id: string
  }>
}

/**
 * Página de configurações de lanchonete.
 */
export default async function CafeteriaSettingsPage({ params }: Params) {
  // Extrair parâmetros
  const { id } = await params

  // Obter lanchonete
  const cafeteria = await cafeteriaService.getById(id)

  return (
    <section>
      <ContentWithImageLayout title={CAFETERIA_TEXTS.settings.title} icon={ICONS.entities.cafeteria} image={IMAGES.illustrations.cafeteria}>
        <CafeteriaSettings cafeteria={cafeteria} />
      </ContentWithImageLayout>
    </section>
  )
}
