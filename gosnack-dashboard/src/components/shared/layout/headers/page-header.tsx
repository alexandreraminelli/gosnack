import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Props de `HeaderWithTitleAndButton`.
 */
interface Props {
  /** Título do cabeçalho. */
  title: string
  /** Ícone no início do título. */
  icon?: IconSvgElement

  /** Conteúdo no final (botões). */
  children?: React.ReactNode
}

/**
 * Cabeçalho de página com título e botão.
 */
export default function PageHeader({ title, icon, children }: Props) {
  return (
    <header className="flex flex-col sm:flex-row gap-4 justify-between items-center">
      <div className="flex flex-row items-center gap-2">
        {/* Ícone */}
        {icon && <HugeiconsIcon icon={icon} className="size-8" />}
        {/* Título */}
        <h2 className="font-semibold text-3xl">{title}</h2>
      </div>

      {/* End Content */}
      <div>{children}</div>
    </header>
  )
}
