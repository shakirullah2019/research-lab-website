import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createServiceClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createServiceClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { action, table, data, id } = body;

    let result;

    switch (action) {
      case "list":
        result = await supabase
          .from(table)
          .select("*")
          .order("created_at", { ascending: false });
        break;
      case "get":
        result = await supabase.from(table).select("*").eq("id", id).single();
        break;
      case "create":
        result = await supabase.from(table).insert(data).select();
        break;
      case "update":
        result = await supabase.from(table).update(data).eq("id", id).select();
        break;
      case "delete":
        result = await supabase.from(table).delete().eq("id", id);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json({ data: result.data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
