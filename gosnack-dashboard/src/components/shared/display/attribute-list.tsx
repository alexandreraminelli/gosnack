import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Tipagem de atributos.
 */
export interface Attribute {
  label: string
  value: string | string[]
  icon?: IconSvgElement
}

/**
 * Tile de atributo com ícone, rótulo e valor.
 */
export function AttributeTile({ label, value, icon }: Attribute) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        { "ms-7": !icon }, // espaçamento se não possuir ícone
      )}
    >
      {/* Ícone */}
      {icon && (
        <HugeiconsIcon
          icon={icon}
          className={cn(
            "size-5 self-start",
            { "mt-1": Array.isArray(value) }, // alinhar ícone ao label
          )}
        />
      )}

      <div>
        {/* Texto */}
        <p className="truncate text-ellipsis *:inline">
          <dt className="font-bold">{`${label}: `}</dt>
          {typeof value === "string" && <dd>{value}</dd>}
        </p>
        {/* Sub=valores */}
        {Array.isArray(value) &&
          value.map((subValue, index) => (
            <p key={index} className="truncate text-ellipsis *:inline">
              <dd className="text-muted-foreground">{subValue}</dd>
            </p>
          ))}
      </div>
    </div>
  )
}

/**
 * Skeleton de `AttributeTile` para estado de carregamento.
 */
export function AttributeTileSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* Ícone */}
      <Skeleton className="size-5 shrink-0 rounded" />

      {/* Texto */}
      <Skeleton className="h-5 w-32 rounded" />
    </div>
  )
}

/**
 * Props de `AttributeList`.
 */
interface Props {
  attributes: Attribute[]
}

/**
 * Lista de atributos.
 */
export default function AttributeList({ attributes }: Props) {
  return (
    <dl className="space-y-2 text-base">
      {attributes.map((info, index) => (
        <AttributeTile key={index} {...info} />
      ))}
    </dl>
  )
}

/**
 * Skeleton de `AttributeList` para estado de carregamento.
 */
export function AttributeListSkeleton({ length = 3 }: { length: number }) {
  return (
    <dl className="space-y-2">
      {Array.from({ length: length }).map((_, index) => (
        <AttributeTileSkeleton key={index} />
      ))}
    </dl>
  )
}
