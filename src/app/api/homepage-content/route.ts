import { NextResponse } from "next/server";
import { getAllContent } from "@/lib/homepage-content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await getAllContent();
    return NextResponse.json({ content });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
