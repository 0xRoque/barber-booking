import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
  const role = req.auth?.user.role;
  const isClient = role === "CLIENT";
  const isBarber = role === "BARBER";

  if (req.nextUrl.pathname === "/") {
    if (isBarber)
      return NextResponse.redirect(new URL("/dashboard/barber", req.url));
    if (isClient)
      return NextResponse.redirect(new URL("/dashboard/client", req.url));
  }

  if (isClient && req.nextUrl.pathname.startsWith("/dashboard/barber")) {
    return NextResponse.redirect(new URL("/dashboard/client", req.url));
  }

  if (isBarber && req.nextUrl.pathname.startsWith("/dashboard/client")) {
    return NextResponse.redirect(new URL("/dashboard/barber", req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
