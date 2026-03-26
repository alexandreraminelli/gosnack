import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Column } from "@tanstack/react-table"

/**
 * Props de `SortableHeader`.
 */
interface SortableHeaderProps<TData> {
  label: string
  column: Column<TData>
}

/**
 * Header Cell para colunas ordenáveis.
 */
export default function SortableHeader<TData>({ label, column }: SortableHeaderProps<TData>) {
  const isSorted = column.getIsSorted()

  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      {/* Label */}
      <span>{label}</span>

      {/* Ícone de ordenamento */}
      {isSorted && <HugeiconsIcon icon={isSorted === "asc" ? ICONS.sorting.asc : ICONS.sorting.desc} />}
    </Button>
  )
}
