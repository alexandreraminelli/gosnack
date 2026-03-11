"use client"

import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ICONS } from "@/constants/icons"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import ToggleCafeteriaStatusButton from "@/features/cafeterias/components/buttons/toggle-cafeteria-status-button"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { HugeiconsIcon } from "@hugeicons/react"

/**
 * Props de `CafeteriaSettings`.
 */
interface Props {
  cafeteria: Cafeteria
}

/**
 * Configurações da Lanchonete.
 */
export default function CafeteriaSettings({ cafeteria }: Props) {
  return (
    <section className="space-y-8">
      {/* Nome */}
      <Item variant="muted">
        {/* Ícone */}
        <ItemMedia>
          <HugeiconsIcon icon={ICONS.attributes.name} />
        </ItemMedia>
        {/* Valores */}
        <ItemContent>
          <ItemTitle>{CAFETERIA_TEXTS.fields.name.label}</ItemTitle>
          <ItemDescription>Nome da Lanchonete</ItemDescription>
        </ItemContent>
        {/* Botão de editar */}
        <ItemActions>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline">
                <HugeiconsIcon icon={ICONS.actions.edit} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{UI_TEXTS.actions.edit}</TooltipContent>
          </Tooltip>
        </ItemActions>
      </Item>

      {/* Botão de desativar */}
      <Item variant="muted">
        {/* Ícone */}
        <ItemMedia>
          <HugeiconsIcon icon={ICONS.feedback.warning} />
        </ItemMedia>
        {/* Valores */}
        <ItemContent>
          <ItemTitle>{CAFETERIA_TEXTS.actions[cafeteria.isActive ? "disable" : "enable"].title}</ItemTitle>
        </ItemContent>
        {/* Botão de editar */}
        <ItemActions>
          <ToggleCafeteriaStatusButton cafeteria={cafeteria} />
        </ItemActions>
      </Item>
    </section>
  )
}
