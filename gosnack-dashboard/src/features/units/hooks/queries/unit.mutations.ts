import { unitKeys } from "@/features/units/hooks/queries/unit.keys"
import { unitService } from "@/features/units/services/unit.service"
import { UnitInsert } from "@/features/units/types/unit.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * Hook para criar uma nova unidade.
 */
export function useCreateUnit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UnitInsert) => unitService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: unitKeys.all }), // invalidar cache para refetch automático
  })
}
