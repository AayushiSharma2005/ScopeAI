import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { generateProposal } from "@/lib/ai";
import { proposals } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/ratelimit";
import { ideaInputSchema } from "@/lib/schema";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const rl = rateLimit(`gen:${clientIp(req)}`, 6, 10 * 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Too many requests. Please try again in ${Math.ceil(rl.retryAfterSeconds / 60)} minute(s).` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSeconds) } }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const input = ideaInputSchema.parse(body);
    const { proposal, source } = await generateProposal(input);

    const col = await proposals();
    const result = await col.insertOne({
      input,
      proposal,
      source,
      status: "New",
      createdAt: new Date(),
    } as never);

    return NextResponse.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues[0]?.message || "Invalid input." }, { status: 400 });
    }
    console.error("[POST /api/proposals]", err);
    const message = err instanceof Error ? err.message : "Unexpected error.";
    const isConfig = message.includes("MONGODB_URI");
    return NextResponse.json(
      { error: isConfig ? "The server database is not configured." : "We could not generate the proposal. Please try again." },
      { status: 500 }
    );
  }
}
