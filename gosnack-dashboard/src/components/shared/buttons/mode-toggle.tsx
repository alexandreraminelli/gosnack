"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ICONS } from "@/constants/icons"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"
import { useTheme } from "next-themes"

/**
 * Tipagem do array de opções de tema.
 */
interface ThemeOption {
  label: string
  value: "system" | "light" | "dark"
  icon: IconSvgElement
}

/**
 * Botão de alternância de tema.
 */
export function ModeToggle({ size = "icon", ...props }: React.ComponentPropsWithRef<typeof Button>) {
  // Controle do estado do tema
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Opções de temas
  const themeOptions: ThemeOption[] = [
    { label: UI_TEXTS.theme.system, value: "system", icon: ICONS.theme.system },
    { label: UI_TEXTS.theme.light, value: "light", icon: ICONS.theme.light },
    { label: UI_TEXTS.theme.dark, value: "dark", icon: ICONS.theme.dark },
  ]

  return (
    <DropdownMenu>
      {/* Botão de tema */}
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={size} {...props}>
          {/* Ícone */}
          <HugeiconsIcon icon={theme === "light" || resolvedTheme === "light" ? ICONS.theme.light : ICONS.theme.dark} />
          <span className="sr-only">{UI_TEXTS.theme.toggleTheme}</span>
        </Button>
      </DropdownMenuTrigger>

      {/* Opções de tema */}
      <DropdownMenuContent className="space-y-0.5">
        <DropdownMenuLabel>{UI_TEXTS.theme.label}</DropdownMenuLabel>

        {/* Opções de tema */}
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => setTheme(value)} // aplicar tema
        >
          {themeOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {/* Ícone e texto */}
              <HugeiconsIcon icon={option.icon} />
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
