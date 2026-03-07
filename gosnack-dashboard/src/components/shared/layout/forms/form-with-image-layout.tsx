import Image from "next/image"

/**
 * Props de `FormWithImageLayout`.
 */
interface Props {
  image: string
  imageAlt?: string

  title: string
  children: React.ReactNode
}

/**
 * Layout de formulário com uma imagem lateral.
 */
export default function FormWithImageLayout({ image, imageAlt, title, children }: Props) {
  return (
    <div className="flex flex-row gap-10 justify-around">
      {/* Conteúdo principal */}
      <main className="space-y-6 w-full max-w-xl">
        {/* Título */}
        <h2 className="font-semibold text-3xl md:text-4xl text-center md:text-start">{title}</h2>

        {/* Form */}
        <div>{children}</div>
      </main>

      {/* Imagem */}
      {/* TODO: Ajustar responsividade da imagem */}
      <aside className="hidden md:flex flex-1 max-w-1/3 self-start sticky top-20 mt-10 transition-all">
        <div className="relative w-full h-[calc(100vh-10rem)]">
          <Image src={image} alt={imageAlt ?? ""} fill className="object-cover" />
        </div>
      </aside>
    </div>
  )
}
