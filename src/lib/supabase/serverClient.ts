import { createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";

export const createClient = (cookies: ReturnType<typeof cookies>) =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );
