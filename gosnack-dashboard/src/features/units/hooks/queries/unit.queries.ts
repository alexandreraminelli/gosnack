import { unitKeys } from "@/features/units/hooks/queries/unit.keys"
import { unitService } from "@/features/units/services/unit.service"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook para buscar todas as unidades.
 */
export function useUnits() {
  return useQuery({
    queryKey: unitKeys.list(),
    queryFn: () => unitService.getAll(),
  })
}

/**
 * Hook para buscar uma unidade específica pelo ID.
 */
export function useUnit(unitId?: string) {
  return useQuery({
    queryKey: unitKeys.detail(unitId),
    queryFn: () => unitService.getById(unitId!),
    enabled: !!unitId, // habilitar apenas se unitId estiver presente
  })
}
