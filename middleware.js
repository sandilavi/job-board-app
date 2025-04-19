import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(req) {
    const token = getToken({req});
    const {pathname} = req.nextUrl;

    if (!token && pathname !== '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
}