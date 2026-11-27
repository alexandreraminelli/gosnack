"use server";

import { createClient } from "@/core/supabase/server";
import { signOut } from "@/domains/auth";

export async function logoutAction() {
  // Executar logout com Supabase
  const supabase = await createClient();
  return signOut(supabase);
}
