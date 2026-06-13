import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, table, data, id } = body;

    const supabase = await createServiceClient();

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
      case "upload":
        const { fileName, fileType, fileSize, fileBuffer } = data;
        const ext = fileName.split(".").pop();
        const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
        const buffer = Buffer.from(fileBuffer.data);
        const { error: uploadError } = await supabase.storage
          .from("public")
          .upload(path, buffer, { contentType: fileType });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage
          .from("public")
          .getPublicUrl(path);
        const { error: dbError } = await supabase.from("media_files").insert({
          name: fileName,
          url: publicUrl,
          type: fileType.startsWith("image/") ? "image" : fileType === "application/pdf" ? "pdf" : "other",
          size: fileSize,
        }).select();
        if (dbError) throw dbError;
        return NextResponse.json({ data: { url: publicUrl } });
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
