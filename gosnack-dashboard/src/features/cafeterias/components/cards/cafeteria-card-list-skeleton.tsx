import { Skeleton } from "@/components/ui/skeleton"
import CafeteriaCardSkeleton from "@/features/cafeterias/components/cards/cafeteria-card-skeleton"

/**
 * Skeleton da lista de cards de lanchonetes.
 */
export default function CafeteriaCardListSkeleton() {
  return (
    <div className="space-y-4">
      {/* Texto de quantidade */}
      <Skeleton className="h-5 w-40 rounded" />

      <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(var(--container-xs),1fr))]">
        {Array.from({ length: 6 }).map((_, index) => (
          <CafeteriaCardSkeleton key={index} />
        ))}
      </section>
    </div>
  )
}
