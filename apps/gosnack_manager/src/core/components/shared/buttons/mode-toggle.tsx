"use client";

import { ICONS } from "@/constants/icons";
import { Button } from "@/core/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/core/components/ui/dropdown-menu";
import { Skeleton } from "@/core/components/ui/skeleton";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Tipagem de opções de tema.
 */
interface ThemeOption {
  value: "system" | "light" | "dark";
  icon: IconSvgElement;
}

/**
 * Opções de tema.
 */
const themeOptions: ThemeOption[] = [
  {
    value: "system",
    icon: ICONS.theme.system,
  },
  {
    value: "light",
    icon: ICONS.theme.light,
  },
  {
    value: "dark",
    icon: ICONS.theme.dark,
  },
];

/**
 * Botão de alternância de tema.
 */
export function ModeToggle({ size = "icon", ...props }: React.ComponentPropsWithRef<typeof Button>) {
  // Textos
  const texts = useTranslations("core.theme");

  // Estado do tema
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Evitar diferenças entre SSR e CSR
  const emptySubscribe = () => () => {};
  const getClientSnapshot = () => true;
  const getServerSnapshot = () => false;
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Ícone tema atual
  const currentThemeIcon = theme === "light" || resolvedTheme === "light" ? ICONS.theme.light : ICONS.theme.dark;

  return (
    <DropdownMenu>
      {/* Trigger ---------------------------------------------------------- */}
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size={size} {...props}>
            {/* Ícone tema atual */}
            {mounted ? <HugeiconsIcon icon={currentThemeIcon} /> : <Skeleton className="size-full" />}

            {/* Label */}
            <span className="sr-only">{texts("toggle")}</span>
          </Button>
        }
      />

      {/* Content ---------------------------------------------------------- */}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {/* Label */}
          <DropdownMenuLabel>{texts("label")}</DropdownMenuLabel>

          {/* Opções de tema */}
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {themeOptions.map((option) => (
              <DropdownMenuRadioItem value={option.value} key={option.value}>
                {/* Ícone */}
                <HugeiconsIcon icon={option.icon} />
                {/* Label */}
                <span>{texts(`options.${option.value}`)}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
