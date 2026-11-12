import { IMAGES } from "@/constants/images";
import { cn } from "@/core/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";

/** Variação da logo. */
type LogoVariation = "icon" | "inline" | "typemark";

/** Caminho das imagens. */
const LOGO = {
  icon: IMAGES.logos.icon,
  inline: {
    light: IMAGES.logos.inline.black,
    dark: IMAGES.logos.inline.white,
  },
  typemark: {
    light: IMAGES.logos.typemark.black,
    dark: IMAGES.logos.typemark.white,
  },
} as const;

/**
 * Props do componente {@link Logo}.
 */
type Props =
  // Reutilizar props do next/Image, exceto src e alt
  Omit<React.ComponentProps<typeof Image>, "src" | "alt"> &
    // Props personalizados:
    {
      variation?: LogoVariation;
      iconSize?: number;
    };

/**
 * Componente que exibe a imagem da logo.
 */
export default function Logo({
  variation = "inline",
  className,
  // Dimensões padrão:
  iconSize = 56,
  width = 288,
  height = 56,
  ...props
}: Props) {
  const altText = useTranslations("core.logo")("alt");
  const baseClassName = cn("transition-all", className);

  if (variation === "icon") {
    /* Ícone ---------------------------------------------------------------- */
    return <Image src={LOGO.icon} alt={altText} className={baseClassName} height={iconSize} width={iconSize} {...props} />;
  } else {
    /* Inline Ou Typemark --------------------------------------------------- */
    const { light, dark } = LOGO[variation];
    const themeLogos = [
      { src: light, className: "dark:hidden" },
      { src: dark, className: "hidden dark:block" },
    ];

    return (
      <>
        {themeLogos.map((logo) => (
          <Image key={logo.src} src={logo.src} alt={altText} className={cn(baseClassName, logo.className)} height={height} width={width} {...props} />
        ))}
      </>
    );
  }
}
