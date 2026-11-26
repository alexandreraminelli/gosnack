import { UpdatePasswordForm } from "@/features/auth/ui/forms/update-password-form";

// TODO: Adaptar esse arquivo gerado automaticamente pelo `pnpm dlx shadcn@latest add @supabase/password-based-auth-nextjs` para o projeto

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
