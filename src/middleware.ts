import { NextResponse, type NextRequest } from "next/server";

const SECRET =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? "bbk-homepage-secret";

function decodeUtf8Base64Url(s: string): string {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

async function verifyToken(token: string): Promise<{ role?: string } | null> {
  try {
    const [data, sig] = token.split(".");
    if (!data || !sig) return null;

    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signed = await crypto.subtle.sign("HMAC", key, enc.encode(data));
    const expected = btoa(String.fromCharCode(...Array.from(new Uint8Array(signed))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    if (sig !== expected) return null;
    return JSON.parse(decodeUtf8Base64Url(data));
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("bbk_session")?.value;
  const session = token ? await verifyToken(token) : null;

  if (!session || session.role !== "admin") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
