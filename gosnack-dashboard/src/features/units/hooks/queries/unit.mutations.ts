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

/**
 * Hook para atualizar o status de uma unidade (ativo/inativo).
 */
export function useToggleUnitStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) => unitService.toggleStatus(id, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: unitKeys.all }), // invalidar cache para refetch automático
  })
}

/**
 * Hook para atualizar o nome de uma unidade.
 */
export function useEditUnitName() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, newName }: { id: string; newName: string }) => unitService.updateName(id, newName),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: unitKeys.all }), // invalidar cache para refetch automático
  })
}
