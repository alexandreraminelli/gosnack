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
