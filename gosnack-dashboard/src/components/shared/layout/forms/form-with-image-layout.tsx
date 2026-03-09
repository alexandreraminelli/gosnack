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
export default function FormWithImageLayout({ image, imageAlt = "", title, children }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 justify-around">
      {/* Conteúdo principal */}
      <main className="space-y-6 w-full max-w-xl">
        {/* Título */}
        <h2 className="font-semibold text-3xl md:text-4xl text-start transition-all">{title}</h2>

        {/* Form */}
        <div>{children}</div>
      </main>

      {/* Imagem */}
      {/* TODO: Ajustar responsividade da imagem */}
      <aside className="max-w-2/5 md:h-[calc(100vh-10rem)] md:self-start md:mt-10 md:sticky md:top-20 transition-all">
        <Image src={image} alt={imageAlt} width={750} height={750} className="object-cover" />
      </aside>
    </div>
  )
}
