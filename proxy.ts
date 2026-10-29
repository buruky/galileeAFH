import { NextResponse, type NextRequest } from "next/server";

// Pre-launch gate: while SITE_PASSWORD is set, every page asks for it (any username).
// Delete the env var in Vercel and redeploy to make the site public.
export function proxy(req: NextRequest) {
  const password = process.env.SITE_PASSWORD;
  if (!password) return NextResponse.next();

  const [scheme, encoded] = req.headers.get("authorization")?.split(" ") ?? [];
  if (scheme === "Basic" && encoded) {
    const decoded = atob(encoded);
    if (decoded.slice(decoded.indexOf(":") + 1) === password) return NextResponse.next();
  }
  return new NextResponse("Password required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Galilee preview"' },
  });
}
