import { createBrowserClient } from '@supabase/ssr';
import { Database } from 'database/DatabaseDefition';

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase URL or anon key (client).')
    }

    const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

    return supabase
}