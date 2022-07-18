import { NextFetchEvent, NextRequest } from 'next/server'
import { withMiddlewareAuth } from '@supabase/auth-helpers-nextjs/dist/middleware'
import { User } from '@supabase/supabase-js'
import { kMaxLength } from 'buffer'
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'


function withMiddlewareAuthCookieFix(request: NextRequest) {
    // withMiddlewareAuth expects cookies to be an object instead of a set 😵‍💫
    const cookies = Object.fromEntries(request.cookies)
    Object.assign(request.cookies, cookies)
}

function growConnectMiddleware(request: NextRequest, event: NextFetchEvent) {
    const allowedRoutes = ['/growconnect/login']
    if (allowedRoutes.find(r => request.nextUrl.pathname.startsWith(r))) {
        return
    }

    withMiddlewareAuthCookieFix(request)
    return withMiddlewareAuth({
        redirectTo: '/growconnect/login'
    })(request, event)
}

function adminMiddleware(request: NextRequest, event: NextFetchEvent) {
    const allowedRoutes = ['/admin/login']
    if (allowedRoutes.find(r => request.nextUrl.pathname.startsWith(r))) {
        return
    }

    withMiddlewareAuthCookieFix(request)
    const pioniergarageGuard = {
        isPermitted: async (user: User) => {
            if (!user.email) return false
            if (!user.email.endsWith('@pioniergarage.de')) return false

            const { data, error } = await supabaseClient
                .from('admins')
                .select('*')
                .eq('email', user.email)
                .single()
            return !error && data
        },
        redirectTo: '/'
    }
    return withMiddlewareAuth({
        redirectTo: '/admin/login',
        authGuard: pioniergarageGuard
    })(request, event)
}


export function middleware(request: NextRequest, event: NextFetchEvent) {
    const path = request.nextUrl.pathname
    if (path.startsWith('/growconnect')) {
        return growConnectMiddleware(request, event)
    } else if (path.startsWith('/admin')) {
        return adminMiddleware(request, event)
    }
}