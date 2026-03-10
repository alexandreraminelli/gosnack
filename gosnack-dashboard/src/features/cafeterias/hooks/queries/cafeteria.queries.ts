import { cafeteriaKeys } from "@/features/cafeterias/hooks/queries/cafeteria.keys"
import { cafeteriaService } from "@/features/cafeterias/services/cafeteria.service"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook para buscar todas as lanchonetes.
 */
export function useCafeterias() {
  return useQuery({
    queryKey: cafeteriaKeys.list(),
    queryFn: () => cafeteriaService.getAll(),
  })
}

/**
 * Hook para buscar uma lanchonete específica pelo ID.
 */
export function useCafeteria(cafeteriaId?: string) {
  return useQuery({
    queryKey: cafeteriaKeys.detail(cafeteriaId),
    queryFn: () => cafeteriaService.getById(cafeteriaId!),
    enabled: !!cafeteriaId, // habilitar apenas se cafeteriaId estiver presente
  })
}
