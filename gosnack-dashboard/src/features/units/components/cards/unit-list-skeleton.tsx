import UnitCardSkeleton from "@/features/units/components/cards/unit-card-skeleton"

/**
 * Skeleton do `UnitList`.
 */
export default function UnitListSkeleton() {
  // TODO: Implementar skeleton da lista de unidades
  return (
    <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(var(--container-3xs),1fr))]">
      {Array.from({ length: 6 }).map((_, index) => (
        <UnitCardSkeleton key={index} />
      ))}
    </section>
  )
}
