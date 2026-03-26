import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ICONS } from "@/constants/icons"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
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
  /** Se a coluna atual está ordenada. */
  const sortedValue = column.getIsSorted() || "none"

  const sortOptions = [
    // Crescente
    {
      value: "asc",
      icon: ICONS.sorting.asc,
      label: UI_TEXTS.sorting.asc,
    },
    // Decrescente
    {
      value: "desc",
      icon: ICONS.sorting.desc,
      label: UI_TEXTS.sorting.desc,
    },
  ]

  return (
    <DropdownMenu>
      {/* Coluna visível */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {/* Label */}
          <span>{label}</span>

          {/* Ícone de ordenamento */}
          {sortedValue !== "none" && <HugeiconsIcon icon={sortedValue === "asc" ? ICONS.sorting.asc : ICONS.sorting.desc} />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* Opções de ordenação */}
        <DropdownMenuRadioGroup
          value={sortedValue} // ordenação atual
        >
          {sortOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              // Aplicar ordenação:
              onClick={() => column.toggleSorting(option.value !== "asc")}
            >
              {/* Ícone */}
              <HugeiconsIcon icon={option.icon} />

              {/* Label */}
              <span>{option.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
