import { cn } from "@/lib/utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Props de `EntityHeader`.
 */
interface Props {
  title: string
  icon?: IconSvgElement
  children?: React.ReactNode
}

/**
 * Cabeçalho para páginas de entidades (unidades, lanchonetes, produtos, etc).
 *
 * Exibe um ícone, título e ações.
 */
export default function EntityHeader({ title, icon, children }: Props) {
  return (
    <header
      className={cn("bg-zinc-100 dark:bg-zinc-900 text-card-foreground rounded-xl", "flex flex-col sm:flex-row flex-wrap justify-between md:items-center", "gap-4 p-4 md:p-6 transition-all", {
        "items-center": !icon,
        "items-start": icon,
      })}
    >
      <div className="flex flex-row items-center gap-4 *:transition-all">
        {/* Ícone */}
        {icon && (
          <div className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-md self-start">
            <HugeiconsIcon icon={icon} className="size-7 md:size-9 transition-all" />
          </div>
        )}

        {/* Nome da unidade */}
        <h2 className="text-2xl md:text-3xl font-medium text-start">{title}</h2>
      </div>

      <aside className="flex flex-row flex-wrap *:flex-1 gap-3 max-md:self-center">{children}</aside>
    </header>
  )
}
