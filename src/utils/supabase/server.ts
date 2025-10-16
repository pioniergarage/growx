// lib/supabase/server.ts

// 1. Import 'createServerClient' and rename it using 'as' to avoid a conflict
import { createServerClient as createClient, serializeCookieHeader } from '@supabase/ssr';

import type { GetServerSidePropsContext } from 'next';

// Your exported function can keep its name
export function createServerClient(context: GetServerSidePropsContext) {
    // Validate environment variables when this module is loaded
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
        throw new Error('Missing Supabase environment variables for server client.')
    }
    // 2. Use the renamed import to create the client
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return Object.keys(context.req.cookies).map((name) => ({ name, value: context.req.cookies[name] || '' }))
                },
                setAll(cookiesToSet) {
                    context.res.setHeader(
                        'Set-Cookie',
                        cookiesToSet.map(({ name, value, options }) =>
                            serializeCookieHeader(name, value, options)
                        )
                    )
                },
            },
        }
    )
    return supabase
}