import UnitDashboard from "@/features/units/components/dashboard/unit-dashboard"

/**
 * Parâmetros da rota dinâmica `/unidades/[id]`.
 */
interface Params {
  params: Promise<{
    /** ID da unidade. */
    id: string
  }>
}

/**
 * Página de detalhes de uma unidade.
 */
export default async function UnitDetailPage({ params }: Params) {
  const { id } = await params

  return <UnitDashboard unitId={id} />
}
