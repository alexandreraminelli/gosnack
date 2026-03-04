import { AttributeListSkeleton } from "@/components/shared/display/attribute-list"
import { Card, CardAction, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton do `UnitCard`.
 */
export default function UnitCardSkeleton() {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        {/* Nome da unidade */}
        <Skeleton className="min-h-14 w-3/4 rounded" />

        <CardAction>
          {/* Botão de informações */}
          <Skeleton className="size-10 rounded-md" />
        </CardAction>
      </CardHeader>

      {/* Informações da unidade */}
      <CardContent>
        <AttributeListSkeleton length={1} />
      </CardContent>
    </Card>
  )
}
