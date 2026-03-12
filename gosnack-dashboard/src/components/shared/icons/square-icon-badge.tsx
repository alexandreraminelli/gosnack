import { cn } from "@/lib/utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { ClassValue } from "clsx"

/**
 * Props de `SquareIconBadge`.
 */
interface Props {
  icon: IconSvgElement
  className?: ClassValue
}

/**
 * Componente de badge de ícone quadrado.
 */
export default function SquareIconBadge({ icon, className }: Props) {
  return (
    <div className={cn("bg-zinc-200 dark:bg-zinc-800 p-2 rounded-md", className)}>
      <HugeiconsIcon icon={icon} className="size-7 md:size-9 transition-all" />
    </div>
  )
}
