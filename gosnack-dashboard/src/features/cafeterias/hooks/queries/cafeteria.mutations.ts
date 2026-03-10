import { cafeteriaKeys } from "@/features/cafeterias/hooks/queries/cafeteria.keys"
import { cafeteriaService } from "@/features/cafeterias/services/cafeteria.service"
import { CafeteriaInsert } from "@/features/cafeterias/types/cafeteria.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

/**
 * Hook para criar uma nova lanchonete.
 */
export function useCreateCafeteria() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CafeteriaInsert) => cafeteriaService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cafeteriaKeys.all }), // invalidar cache para refetch automático
  })
}

/**
 * Hook para atualizar o status de uma lanchonete (ativo/desativado).
 */
export function useToggleCafeteriaStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: boolean }) => cafeteriaService.toggleStatus(id, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cafeteriaKeys.all }), // invalidar cache para refetch automático
  })
}
