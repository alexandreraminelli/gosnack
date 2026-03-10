import { AttributeListSkeleton } from "@/components/shared/display/attribute-list"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton de `CafeteriaCard`.
 */
export default function CafeteriaCardSkeleton() {
  return (
    <Card>
      {/* Header */}
      <CardHeader>
        {/* Título */}
        <CardTitle className="min-h-14 flex flex-col justify-start gap-1.5">
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-5 w-1/2 rounded" />
        </CardTitle>

        {/* Badge de status */}
        <Skeleton className="h-5 w-16 rounded-full" />

        {/* Botão de detalhes */}
        <CardAction>
          <Skeleton className="size-10 rounded-md" />
        </CardAction>
      </CardHeader>

      {/* Atributos */}
      <CardContent>
        <AttributeListSkeleton length={4} />
      </CardContent>
    </Card>
  )
}
