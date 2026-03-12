import { Button } from "@/components/ui/button"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { ICONS } from "@/constants/icons"
import { CAFETERIA_TEXTS } from "@/constants/texts/entities/cafeterias.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import EditCafeteriaTextFieldDialog from "@/features/cafeterias/components/dialogs/edit-cafeteria-text-field-dialog"
import ToggleCafeteriaStatusDialog from "@/features/cafeterias/components/dialogs/toggle-cafeteria-status-dialog"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { formatOpeningHours } from "@/features/cafeterias/utils/opening-hours.utils"
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react"

/**
 * Botão de editar da página de configurações da lanchonete.
 */
function EditButton() {
  return (
    <Button variant="outline" size="icon">
      <HugeiconsIcon icon={ICONS.actions.edit} />
      <span className="sr-only">{UI_TEXTS.actions.edit}</span>
    </Button>
  )
}

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
      action: (
        <EditCafeteriaTextFieldDialog cafeteria={cafeteria} field="name">
          <EditButton />
        </EditCafeteriaTextFieldDialog>
      ),
    },
    // Localização
    {
      label: CAFETERIA_TEXTS.fields.location.label,
      value: cafeteria.location || UI_TEXTS.undefined,
      icon: ICONS.attributes.location,
      action: (
        <EditCafeteriaTextFieldDialog cafeteria={cafeteria} field="location">
          <EditButton />
        </EditCafeteriaTextFieldDialog>
      ),
    },
    // Horário de funcionamento
    {
      label: CAFETERIA_TEXTS.fields.openingHours.label,
      value: cafeteria.openingHours.map(formatOpeningHours),
      icon: ICONS.time.clock,
      action: <EditButton />,
    },
    // Ativar/Desativar
    {
      label: CAFETERIA_TEXTS.actions[cafeteria.isActive ? "disable" : "enable"].title,
      icon: ICONS.feedback.warning,
      action: <ToggleCafeteriaStatusDialog cafeteria={cafeteria} />,
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
