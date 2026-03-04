/**
 * Props de `UnitDashboard`.
 */
interface Props {
  /** ID da unidade. */
  unitId: string
}

/**
 * Página de Dashboard de unidades.
 */
export default function UnitDashboard({ unitId }: Props) {
  // Obter unidade

  // Página de unidade não encontrada

  return (
    <main>
      <h1>Dashboard de Unidades</h1>
      <p>ID da unidade: {unitId}</p>
    </main>
  )
}
