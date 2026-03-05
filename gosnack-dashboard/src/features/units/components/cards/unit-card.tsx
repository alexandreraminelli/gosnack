import AttributeList, { Attribute } from "@/components/shared/display/attribute-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { Unit } from "@/features/units/types/unit.types"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

/**
 * Props de `UnitCard`.
 */
interface Props {
  unit: Unit
}

/**
 * Card de unidades escolares.
 */
export default function UnitCard({ unit }: Props) {
  // Informações principais da unidade
  const attributes: Attribute[] = [
    // Contagem de lanchonetes
    {
      label: ENTITIES_TEXTS.cafeteria.plural,
      // TODO: Contagem de lanchonetes
      value: unit.cafeteriasCount?.toString() ?? "0",
      icon: ICONS.entities.cafeteria,
    },
  ]

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        {/* Nome da unidade */}
        <CardTitle className="text-lg font-semibold line-clamp-2 min-h-14">{unit.name}</CardTitle>

        {/* Status */}
        <Badge variant={unit.isActive ? "secondary" : "destructive"}>{unit.isActive ? ENTITIES_TEXTS.commonAttributes.status.enabled : ENTITIES_TEXTS.commonAttributes.status.disabled}</Badge>

        <CardAction>
          {/* Botão de informações */}
          <Tooltip>
            <TooltipTrigger>
              <Button asChild variant="secondary" size="icon-lg">
                <Link href={ROUTES.units.details(unit.id)}>
                  <HugeiconsIcon icon={ICONS.actions.moreDetails} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{UI_TEXTS.actions.details}</p>
            </TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>

      {/* Informações da unidade */}
      <CardContent>
        {/* Atributos */}
        <AttributeList attributes={attributes} />
      </CardContent>
    </Card>
  )
}
