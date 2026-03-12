import { cafeteriaKeys } from "@/features/cafeterias/hooks/queries/cafeteria.keys"
import { cafeteriaService } from "@/features/cafeterias/services/cafeteria.service"
import { CafeteriaInsert, CafeteriaTextField } from "@/features/cafeterias/types/cafeteria.types"
import { OpeningHours } from "@/features/cafeterias/types/opening-hours.types"
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

/**
 * Hook para atualizar um campo de texto editável de uma lanchonete (como nome ou localização).
 */
export function useEditCafeteriaTextField() {
  return useMutation({
    mutationFn: ({ id, field, newValue }: { id: string; field: CafeteriaTextField; newValue: string }) => cafeteriaService.updateTextField(id, field, newValue),
  })
}

/**
 * Hook para atualizar os horários de funcionamento de uma lanchonete.
 */
export function useEditCafeteriaOpeningHours() {
  return useMutation({
    mutationFn: ({ id, openingHours }: { id: string; openingHours: OpeningHours[] }) => cafeteriaService.updateOpeningHours(id, openingHours),
  })
}
