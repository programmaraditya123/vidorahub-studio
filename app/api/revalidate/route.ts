import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { Discovery } from "@/lib/discovery";
export async function POST(request: NextRequest) {
  const configured = process.env.REVALIDATE_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer /, "") || request.nextUrl.searchParams.get("secret");
  if (!configured || supplied !== configured) return Response.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body || !["creator", "brand"].includes(body.type) || typeof body.id !== "string" || !/^[a-f\d]{24}$/i.test(body.id)) {
    return Response.json({ ok: false, message: "Expected creator or brand type and a valid profile id" }, { status: 400 });
  }
  revalidateTag(body.type === "creator" ? "discovery:creators" : "discovery:brands", { expire: 0 });
  revalidatePath("/creator/[slug]", "page");
  revalidatePath("/brand/[slug]", "page");
  for (const kind of ["categories", "platforms", "cities", "states"]) {
    revalidatePath("/" + kind);
    revalidatePath("/" + kind + "/[slug]", "page");
  }
  revalidatePath("/search/[...segments]", "page");
  const paths = await Discovery.cache.revalidate(body.type, body.id, revalidatePath);
  return Response.json({ ok: true, revalidated: { type: body.type, id: body.id, paths } });
}
