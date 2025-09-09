import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const session = req.cookies.get("session");

    // If no session cookie, redirect to login
    if (!session) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// Protect specific routes
export const config = {
    matcher: ["/business-plans", "/individual-services"],
};