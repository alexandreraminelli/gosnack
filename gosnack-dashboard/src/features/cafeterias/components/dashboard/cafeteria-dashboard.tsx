/**
 * Props de `CafeteriaDashboard`.
 */
interface Props {
  cafeteriaId: string
}

/**
 * Dashboard de uma lanchonete.
 */
export default function CafeteriaDashboard({ cafeteriaId }: Props) {
  return (
    <section>
      <h1>{cafeteriaId}</h1>
    </section>
  )
}
