"use client";

import { ICONS } from "@/constants/icons";
import { Button } from "@/core/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { useTheme } from "next-themes";

/**
 * Tipagem de opções de tema.
 */
interface ThemeOption {
  label: string;
  value: "system" | "light" | "dark";
  icon: IconSvgElement;
}

/**
 * Opções de tema.
 */
const themeOptions: ThemeOption[] = [
  // TODO: Extrair strings de texto para constantes
  {
    label: "Sistema",
    value: "system",
    icon: ICONS.theme.system,
  },
  {
    label: "Claro",
    value: "light",
    icon: ICONS.theme.light,
  },
  {
    label: "Escuro",
    value: "dark",
    icon: ICONS.theme.dark,
  },
];

/**
 * Botão de alternância de tema.
 */
export function ModeToggle({ size = "icon", ...props }: React.ComponentPropsWithRef<typeof Button>) {
  // Estado do tema
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Ícone tema atual
  const currentThemeIcon = theme === "light" || resolvedTheme === "light" ? ICONS.theme.light : ICONS.theme.dark;

  return (
    <DropdownMenu>
      {/* Trigger ---------------------------------------------------------- */}
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size={size} {...props}>
            {/* Ícone */}
            <HugeiconsIcon icon={currentThemeIcon} />

            {/* Label */}
            <span className="sr-only">
              {/* TODO: Extrair strings de texto para constantes */}
              {"Alterar Tema"}
            </span>
          </Button>
        }
      />

      {/* Content ---------------------------------------------------------- */}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {/* Label */}
          <DropdownMenuLabel>
            {/* TODO: Extrair texto para constante */}
            {"Tema"}
          </DropdownMenuLabel>

          {/* Opções de tema */}
          {themeOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)} // Aplicar tema ao app
              className={theme === option.value ? "bg-accent/75" : ""} // destacar tema atual
            >
              {/* Ícone */}
              <HugeiconsIcon icon={option.icon} />
              {/* Label */}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
