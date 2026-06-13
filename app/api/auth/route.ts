import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const supabase = await createServiceClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      authenticated: true,
      user: { id: user.id, email: user.email, role: profile?.role || "editor" },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
