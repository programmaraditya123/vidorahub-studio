import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { Discovery } from "@/lib/discovery";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, message: "Invalid revalidation secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const type = body.type as "creator" | "brand" | undefined;
  const id = body.id as string | undefined;

  const paths = await Discovery.cache.revalidate(type, id, revalidatePath);
  return Response.json({ ok: true, revalidated: { type, id, paths } });
}
