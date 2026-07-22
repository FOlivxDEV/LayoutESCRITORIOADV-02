import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const protectedAdmin = request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login");
  if (protectedAdmin && (!url || !key)) { const next = request.nextUrl.clone(); next.pathname = "/admin/login"; return NextResponse.redirect(next); }
  if (url && key) {
    const supabase = createServerClient(url, key, { cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookies) { cookies.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, { ...options, httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" })); },
    } });
    const { data: { user } } = await supabase.auth.getUser();
    if (protectedAdmin && !user) { const next = request.nextUrl.clone(); next.pathname = "/admin/login"; next.searchParams.set("next", request.nextUrl.pathname); return NextResponse.redirect(next); }
  }
  return response;
}
export const config = { matcher: ["/admin/:path*", "/auth/:path*"] };
