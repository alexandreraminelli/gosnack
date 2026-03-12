import PageHeader from "@/components/shared/layout/headers/page-header"
import { Button } from "@/components/ui/button"
import { ICONS } from "@/constants/icons"
import { ROUTES } from "@/constants/navigation/routes"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import { HugeiconsIcon } from "@hugeicons/react"
import Link from "next/link"

/**
 * Página de gerenciamento de usuários.
 */
export default function UsersManagementPage() {
  return (
    <section>
      <PageHeader title={USERS_TEXTS.management}>
        {/* Botão de adicionar usuário */}
        <Button asChild>
          <Link href={ROUTES.users.add}>
            <HugeiconsIcon icon={ICONS.actions.create} />
            {USERS_TEXTS.actions.create}
          </Link>
        </Button>
      </PageHeader>

      {/* Tabela de usuários */}
      <main></main>
    </section>
  )
}
