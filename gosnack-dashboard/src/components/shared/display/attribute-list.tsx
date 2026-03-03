import { cn } from "@/lib/utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Tipagem de atributos.
 */
export interface Attribute {
  label: string
  value: string
  icon?: IconSvgElement
}

/**
 *
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
      {icon && <HugeiconsIcon icon={icon} className="size-5" />}

      {/* Texto */}
      <p className="truncate text-ellipsis *:inline">
        <dt className="font-bold">{`${label}: `}</dt>
        <dd>{value}</dd>
      </p>
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
