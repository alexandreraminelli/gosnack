import AttributeList, { Attribute } from "@/components/shared/display/attribute-list"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { ENTITIES_TEXTS } from "@/constants/texts/entities/entities.texts"
import { UI_TEXTS } from "@/constants/texts/ui.texts"
import { Cafeteria } from "@/features/cafeterias/types/cafeteria.types"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

/**
 * Props de `CafeteriaCard`.
 */
interface Props {
  cafeteria: Cafeteria
}

/**
 * Card de lanchonete.
 */
export default function CafeteriaCard({ cafeteria }: Props) {
  // Informações principais da lanchonete
  const attributes: Attribute[] = [
    // TODO: Informações da lanchonete
    // Nome da unidade
    {
      label: ENTITIES_TEXTS.unit.singular,
      value: cafeteria.unitName ?? UI_TEXTS.status.notAvailable,
      icon: ICONS.entities.unit,
    },
  ]

  return (
    <Card>
      {/* Header */}
      <CardHeader>
        {/* Nome da lanchonete */}
        <CardTitle className="text-lg font-semibold line-clamp-2 min-h-14">{cafeteria.name}</CardTitle>

        {/* Status */}
        <Badge variant={cafeteria.isActive ? "secondary" : "destructive"}>{cafeteria.isActive ? ENTITIES_TEXTS.commonAttributes.status.enabled : ENTITIES_TEXTS.commonAttributes.status.disabled}</Badge>

        <CardAction>
          {/* Botão de informações */}
          <Tooltip>
            <TooltipTrigger>
              <Button asChild variant="secondary" size="icon-lg">
                <Link href={ROUTES.cafeterias.details(cafeteria.id)}>
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

      {/* Informações da lanchonete */}
      <CardContent>
        {/* Atributos */}
        <AttributeList attributes={attributes} />
      </CardContent>
    </Card>
  )
}
