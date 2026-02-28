import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const studentProtected = ["/apply", "/portal"];
const adminProtected = ["/admin"];
type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options as Parameters<typeof res.cookies.set>[2])
          );
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;
  const needsStudent = studentProtected.some((path) => pathname === path || pathname.startsWith(`${path}/`));
  const needsAdmin = adminProtected.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if ((needsStudent || needsAdmin) && !user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (needsAdmin && user) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (!profile || profile.role !== "admin") {
      const url = req.nextUrl.clone();
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/apply/:path*", "/portal/:path*", "/admin/:path*"]
};
