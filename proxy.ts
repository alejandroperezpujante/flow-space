import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const AUTH_ROUTES = ["/sign-in"];

export function proxy(request: NextRequest) {
    const session = getSessionCookie(request);
    const isAuthRoute = AUTH_ROUTES.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isAuthRoute) {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in"],
};
