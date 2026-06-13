import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("public")
      .upload(path, buffer, { contentType: file.type });
    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("public").getPublicUrl(path);

    const { error: dbError } = await supabase.from("media_files").insert({
      name: file.name,
      url: publicUrl,
      type: file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "other",
      size: file.size,
    });
    if (dbError) throw dbError;

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
