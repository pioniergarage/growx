import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    if (url.pathname === config.matcher) {
        // Extract the token from query parameters (e.g., /signup?token=a1b2c3d4..., /signup?t=a1b2c3d4...)
        const token = url.searchParams.get('t') || url.searchParams.get('token');
        const validToken = process.env.SIGNUP_SECRET_TOKEN;

        // The token is optional: if no SIGNUP_SECRET_TOKEN is set, the sign up page is open.
        // If a token is set and doesn't match, block access
        if (validToken && token !== validToken) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/connect/signup',
};