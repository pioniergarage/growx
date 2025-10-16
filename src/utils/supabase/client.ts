import { createBrowserClient } from '@supabase/ssr';
import { Database } from 'database/DatabaseDefition';

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // 1. Check if the variables are defined
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase URL or anon key (client).')
    }

    // 2. Create the client without the non-null assertions
    const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

    return supabase
}