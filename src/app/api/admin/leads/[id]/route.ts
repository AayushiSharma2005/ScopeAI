import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { proposals, toObjectId } from "@/lib/db";
import { STATUSES, type Status } from "@/lib/schema";

export const runtime = "nodejs";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdmin()) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const oid = toObjectId(params.id);
  if (!oid) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const { status } = (await req.json().catch(() => ({}))) as { status?: Status };
  if (!status || !STATUSES.includes(status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  const col = await proposals();
  const result = await col.updateOne({ _id: oid, lead: { $exists: true } }, { $set: { status } });
  if (result.matchedCount === 0) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
