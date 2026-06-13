import { createClient } from "@supabase/supabase-js";

export async function createServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || supabaseUrl.includes("your_supabase")) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL — add it to Vercel env vars or .env.local");
  }
  if (!supabaseKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY — add it to Vercel env vars or .env.local");
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
