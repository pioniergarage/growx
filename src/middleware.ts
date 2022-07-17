import { NextFetchEvent, NextRequest } from 'next/server'
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import { User } from '@supabase/supabase-js'
import { kMaxLength } from 'buffer'
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies'

/*
const pioniergarageGuard = {
    isPermitted: async (user: User) => user.email?.endsWith('@pioniergarage.de') ?? false,
    redirectTo: '/insufficient-permissions'
}
*/ 


export function middleware(request: NextRequest, event: NextFetchEvent) {
    const path = request.nextUrl.pathname
    if (path.startsWith('/growconnect') && path !== '/growconnect/login') {

        // withMiddlewareAuth expects cookies to be an object instead of a set 😵‍💫
        const cookies = Object.fromEntries(request.cookies)
        Object.assign(request.cookies, cookies)
        

        return withMiddlewareAuth({
            redirectTo: '/growconnect/login'
            // authGuard: pioniergarageGuard
        })(request, event)
    }
}