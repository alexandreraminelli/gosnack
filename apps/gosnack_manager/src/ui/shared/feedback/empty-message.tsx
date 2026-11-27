import { IMAGES } from "@/core/constants/images";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/ui/primitives/empty";
import Image from "next/image";

interface Props {
  /** Título da mensagem. */
  title: string;
  /** Descrição adicional. Lista de parágrafos. */
  description?: string[];
  /** Ilustração de erro. */
  image?: string;

  /** Conteúdo interno. */
  children?: React.ReactNode;
}

/**
 * Feedback de estado vazio.
 * Informa que não há dados disponíveis para exibir.
 */
export default function EmptyMessage({ title, description = [], image = IMAGES.illustrations.empty, children }: Props) {
  return (
    <Empty>
      {/* Header */}
      <EmptyHeader>
        {/* Ilustração */}
        <EmptyMedia>
          <Image src={image} alt={title} width={320} height={320} />
        </EmptyMedia>

        {/* Título */}
        <EmptyTitle className="text-2xl">{title}</EmptyTitle>

        {/* Descrição */}
        {description.map((paragraph, index) => (
          <EmptyDescription key={index}>{paragraph}</EmptyDescription>
        ))}
      </EmptyHeader>

      {/* Botões de ação */}
      <EmptyContent className="flex flex-row flex-wrap *:flex-1">{children}</EmptyContent>
    </Empty>
  );
}
