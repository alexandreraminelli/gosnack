import SquareIconBadge from "@/components/shared/icons/square-icon-badge"
import { IconSvgElement } from "@hugeicons/react"
import Image from "next/image"

/**
 * Props de `FormWithImageLayout`.
 */
interface Props {
  image: string
  imageAlt?: string

  title?: string
  icon?: IconSvgElement
  children?: React.ReactNode
}

/**
 * Layout que exibe um conteúdo na esquerda e uma imagem ilustrativa na direita.
 */
export default function ContentWithImageLayout({ image, imageAlt = "", title, icon, children }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 justify-around">
      {/* Conteúdo principal */}
      <main className="space-y-6 w-full max-w-xl">
        <header className="flex flex-row items-center gap-4 *:transition-all">
          {/* Ícone */}
          {icon && <SquareIconBadge icon={icon} />}

          {/* Título */}
          {title && <h2 className="font-semibold text-3xl md:text-4xl text-start transition-all">{title}</h2>}
        </header>

        {/* Form */}
        <div>{children}</div>
      </main>

      {/* Imagem */}
      {/* TODO: Ajustar responsividade da imagem */}
      <aside className="bg-card p-4 rounded-xl max-w-2/5 dmd:h-[calc(100vh-10rem)] md:self-start md:sticky md:top-20 transition-all">
        <Image src={image} alt={imageAlt} width={500} height={500} className="object-cover" />
      </aside>
    </div>
  )
}
