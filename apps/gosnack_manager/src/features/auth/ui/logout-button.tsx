"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/core/supabase/client";
import { Button } from "@/core/components/ui/button";
import { useTranslations } from "next-intl";
import { HugeiconsIcon } from "@hugeicons/react";
import { ICONS } from "@/core/constants/icons";
import { toast } from "@/core/components/ui/toast";

/**
 * Botão de logout.
 *
 * @see https://supabase.com/library/docs/nextjs/password-based-auth
 */
export function LogoutButton() {
  // Textos
  const text = useTranslations("core.auth.logout");

  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();

    // Toast de logout
    toast.promise(
      supabase.auth.signOut(), //
      {
        loading: text("loading.title"),
        success: text("success.title"),
        error: text("error.title"),
      },
    );

    // TODO(Routes): usar constantes de rotas
    router.push("/auth/login");
  };

  return (
    <Button onClick={logout} variant="outline">
      <HugeiconsIcon icon={ICONS.auth.logout} />
      <span>{text("label")}</span>
    </Button>
  );
}
