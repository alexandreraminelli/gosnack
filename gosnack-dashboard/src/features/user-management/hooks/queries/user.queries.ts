import { userKeys } from "@/features/user-management/hooks/queries/user.keys"
import { userService } from "@/features/user-management/services/user.service"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook para buscar todos os usuários.
 */
export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: () => userService.listAll(),
  })
}
