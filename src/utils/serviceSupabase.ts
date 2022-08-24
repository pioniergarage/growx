import { createClient } from '@supabase/supabase-js';

if (process.env.NEXT_PUPLIC_SUPABASE_SERVICE_KEY === undefined) {
    throw Error(
        'Env variable NEXT_PUPLIC_SUPABASE_SERVICE_KEY must be defined!'
    );
}

export const getServiceSupabase = () =>
    createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUPLIC_SUPABASE_SERVICE_KEY as string
    );
