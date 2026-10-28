import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    if (url.pathname === config.matcher) {
        // Extract the token from query parameters (e.g., /signup?token=a1b2c3d4..., /signup?t=a1b2c3d4...)
        const token = url.searchParams.get('t') || url.searchParams.get('token');
        const validToken = process.env.SIGNUP_SECRET_TOKEN;

        console.log('Provided token:', token);
        console.log('Valid token from env:', validToken);

        // If token doesn't match or the window has expired, block access
        if (token !== validToken) {
            return NextResponse.rewrite(new URL('/404', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/connect/signup',
};