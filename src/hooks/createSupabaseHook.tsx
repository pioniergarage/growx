import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { PostgrestError } from '@supabase/supabase-js';
import { useState } from 'react';

export default function useCreateSupabaseHook<T>(table: string) {
    const { user } = useUser();
    const [values, setValues] = useState<T[]>([]);
    const [error, setError] = useState<PostgrestError>();
    const [loading, setLoading] = useState(false);

    async function fetch() {
        setLoading(true);
        if (!user) return;
        const { data, error } = await supabaseClient.from<T>(table).select('*');
        if (error) {
            setError(error);
        } else {
            setValues(data);
        }
        setLoading(false);
    }

    return { fetch, values, error, loading };
}
