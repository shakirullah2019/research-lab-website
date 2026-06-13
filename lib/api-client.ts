const BASE = "/api/admin";

async function callApi(action: string, table: string, data?: any, id?: string) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, table, data, id }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json.data;
}

export async function list(table: string, order?: string) {
  return callApi("list", table);
}

export async function create(table: string, data: any) {
  return callApi("create", table, data);
}

export async function update(table: string, id: string, data: any) {
  return callApi("update", table, data, id);
}

export async function remove(table: string, id: string) {
  return callApi("delete", table, undefined, id);
}

export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Upload failed");
  return json.url;
}
