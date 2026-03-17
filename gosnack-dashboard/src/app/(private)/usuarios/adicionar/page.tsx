import ContentWithImageLayout from "@/components/shared/layout/content/content-with-image-layout"
import { IMAGES } from "@/constants/images"
import { USERS_TEXTS } from "@/constants/texts/entities/users.texts"
import CreateUserForm from "@/features/user-management/form/create-user-form"
import { Metadata } from "next"

/**
 * Metadados da página de adicionar usuário.
 */
export const metadata: Metadata = {
  title: USERS_TEXTS.actions.create,
}

/**
 * Página de adicionar usuário.
 */
export default function AddUserPage() {
  return (
    <ContentWithImageLayout title={USERS_TEXTS.actions.create} image={IMAGES.illustrations.addUser}>
      {/* Form */}
      <CreateUserForm />
    </ContentWithImageLayout>
  )
}
