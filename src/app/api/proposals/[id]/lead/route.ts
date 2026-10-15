import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { proposals, toObjectId } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/ratelimit";
import { leadSchema } from "@/lib/schema";

export const runtime = "nodejs";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const rl = rateLimit(`lead:${clientIp(req)}`, 10, 10 * 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

  const oid = toObjectId(params.id);
  if (!oid) return NextResponse.json({ error: "Proposal not found." }, { status: 404 });

  try {
    const lead = leadSchema.parse(await req.json().catch(() => ({})));
    const col = await proposals();
    const result = await col.updateOne({ _id: oid }, { $set: { lead: { ...lead, createdAt: new Date() } } });
    if (result.matchedCount === 0) return NextResponse.json({ error: "Proposal not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Invalid input." }, { status: 400 });
    }
    console.error("[POST /api/proposals/:id/lead]", err);
    return NextResponse.json({ error: "Could not save your details. Please try again." }, { status: 500 });
  }
}
