import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { IMAGES } from "@/constants/images"
import Image from "next/image"

/**
 * Props de `EmptyState`.
 */
interface Props {
  /** Título da mensagem. */
  title: string
  /** Descrição adicional. */
  description?: string[]
  /** Ilustração de erro. */
  image?: string

  /** Conteúdo interno, como botões. */
  children?: React.ReactNode
}

/**
 * Feedback de estado vazio para exibir quando não houver dados ou resultados
 * para mostrar ao usuário.
 */
export default function EmptyState({ title, description = [], image = IMAGES.illustrations.empty, children }: Props) {
  return (
    <Empty className="px-0">
      <EmptyHeader className="max-w-2xl">
        {/* Ilustração */}
        <EmptyMedia>
          <Image src={image} alt="" width={320} height={320} />
        </EmptyMedia>
        {/* Título */}
        <EmptyTitle className="text-2xl md:text-3xl mb-2">{title}</EmptyTitle>
        {/* Descrição */}
        <div>
          {description.map((paragraph, index) => (
            <EmptyDescription key={index}>{paragraph}</EmptyDescription>
          ))}
        </div>
      </EmptyHeader>

      {/* Botões de ação */}
      <EmptyContent className="flex flex-row flex-wrap *:flex-1">{children}</EmptyContent>
    </Empty>
  )
}
