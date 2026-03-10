import CafeteriaDashboard from "@/features/cafeterias/components/dashboard/cafeteria-dashboard"

/**
 * Parâmetros da rota dinâmica `/lanchonetes/[id]`.
 */
interface Params {
  params: Promise<{
    /** ID da lanchonete. */
    id: string
  }>
}

/**
 * Página de detalhes de uma unidade.
 */
export default async function CafeteriaDetailPage({ params }: Params) {
  const { id } = await params

  return <CafeteriaDashboard cafeteriaId={id} />
}
