import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ICONS } from "@/constants/icons"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import ToggleCafeteriaStatusButton from "@/features/cafeterias/components/buttons/toggle-cafeteria-status-button"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { formatOpeningHours } from "@/features/cafeterias/utils/opening-hours.utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

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
  const options: {
    label: string
    value?: string | string[]
    icon?: IconSvgElement
    action?: React.ReactNode
  }[] = [
    // Nome
    {
      label: CAFETERIA_TEXTS.fields.name.label,
      value: cafeteria.name,
      icon: ICONS.attributes.name,
      action: <EditButtonWithTooltip></EditButtonWithTooltip>,
    },
    // Localização
    {
      label: CAFETERIA_TEXTS.fields.location.label,
      value: cafeteria.location || UI_TEXTS.undefined,
      icon: ICONS.attributes.location,
      action: <EditButtonWithTooltip></EditButtonWithTooltip>,
    },
    // Horário de funcionamento
    {
      label: CAFETERIA_TEXTS.fields.openingHours.label,
      value: cafeteria.openingHours.map(formatOpeningHours),
      icon: ICONS.time.clock,
      action: <EditButtonWithTooltip></EditButtonWithTooltip>,
    },
    // Ativar/Desativar
    {
      label: CAFETERIA_TEXTS.actions[cafeteria.isActive ? "disable" : "enable"].title,
      icon: ICONS.feedback.warning,
      action: <ToggleCafeteriaStatusButton cafeteria={cafeteria} />,
    },
  ]

  return (
    <section className="space-y-6">
      {options.map((option) => (
        <Item key={option.label} variant="muted">
          {/* Ícone */}
          {option.icon && (
            <ItemMedia>
              <HugeiconsIcon icon={option.icon} />
            </ItemMedia>
          )}

          <ItemContent>
            {/* Label */}
            <ItemTitle>{option.label}</ItemTitle>
            {/* Value */}
            {option.value &&
              (typeof option.value === "string" ? (
                // Valor simples
                <ItemDescription>{option.value}</ItemDescription>
              ) : (
                // Valor composto (array)
                option.value.map((subValue, index) => <ItemDescription key={index}>{subValue}</ItemDescription>)
              ))}
          </ItemContent>

          {/* Botão */}
          {option.action && <ItemActions>{option.action}</ItemActions>}
        </Item>
      ))}
    </section>
  )
}

/**
 * Componente de botão com tooltip de edição.
 */
function EditButtonWithTooltip({ children }: { children?: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        {/* Botão */}
        <Button variant="outline">
          <HugeiconsIcon icon={ICONS.actions.edit} />
        </Button>
      </TooltipTrigger>
      {/* Texto do tooltip */}
      <TooltipContent>{UI_TEXTS.actions.edit}</TooltipContent>
    </Tooltip>
  )
}
