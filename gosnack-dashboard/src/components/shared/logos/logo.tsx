import { IMAGES } from "@/constants/images"
import { cn } from "@/lib/utils"
import Image from "next/image"

/** Variação da logo. */
type LogoVariation = "favicon" | "full" | "branding"

/** Caminhos das imagens de logo com variação no tema. */
const LOGO_PATHS = {
  full: {
    light: IMAGES.logos.full.black,
    dark: IMAGES.logos.full.white,
  },
  branding: {
    light: IMAGES.logos.branding.black,
    dark: IMAGES.logos.branding.white,
  },
}

/** Props de `Logo`. */
type Props = Omit<React.ComponentProps<typeof Image>, "src" | "alt"> & {
  variation?: LogoVariation
}

/** Imagem da logo do colégio. */
export default function Logo({ variation = "full", className, ...props }: Props) {
  const altText = "Logo"
  const imageClass = cn("transition-all", className)

  if (variation == "favicon") {
    // Logo favicon (apenas 1 cor)
    const size = 80
    return <Image src={IMAGES.logos.favicon} alt={altText} className={imageClass} width={size} height={size} {...props} />
  } else {
    // Logo full ou branding (com variação de tema)
    const { light, dark } = LOGO_PATHS[variation] // usar

    const imageProps = {
      width: 288,
      height: 56,
      ...props,
    }

    return (
      <>
        {/* Logo light*/}
        <Image src={light} alt={altText} className={cn(imageClass, "dark:hidden")} {...imageProps} />
        {/* Logo dark */}
        <Image src={dark} alt={altText} className={cn(imageClass, "hidden dark:block")} {...imageProps} />
      </>
    )
  }
}
