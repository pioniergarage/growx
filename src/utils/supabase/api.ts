import { createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { type NextApiRequest, type NextApiResponse } from 'next'

export default function createClient(req: NextApiRequest, res: NextApiResponse) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase URL or anon key. (api).')
        /**
         * If you are testing locally and you get this error: Do you have the following files under the root project directory (alongside /src/), 
         * with the exact names inside the single quotes (excluding the single quotes), with the following content? 
         * 
         * [file: '.env.production']
         * NEXT_PUBLIC_SUPABASE_URL = <SUPABASE PUBLIC URL GOES HERE>
         * NEXT_PUBLIC_SUPABASE_ANON_KEY = <SUPABASE PUBLIC ANON KEY GOES HERE>
         * 
         * [file: '.env.development']
         * NEXT_PUBLIC_SUPABASE_URL = <SUPABASE PUBLIC URL GOES HERE>
         * NEXT_PUBLIC_SUPABASE_ANON_KEY = <SUPABASE PUBLIC ANON KEY GOES HERE>
         * NEXT_PUPLIC_SUPABASE_SERVICE_KEY= <SUPABASE SERVICE KEY GOES HERE>
         * 
         * If you are missing the above keys, check Coolify. If you don't have access to Coolify, talk to your Head of IT.
         */
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return Object.keys(req.cookies).map((name) => ({ name, value: req.cookies[name] || '' }))
                },
                setAll(cookiesToSet) {
                    res.setHeader(
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