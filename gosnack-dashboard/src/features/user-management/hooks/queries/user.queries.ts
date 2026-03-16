import { getUsersAction } from "@/features/user-management/actions/get-users.action"
import { userKeys } from "@/features/user-management/hooks/queries/user.keys"
import { useQuery } from "@tanstack/react-query"

/**
 * Hook para buscar todos os usuários.
 */
export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsersAction,
  })
}
