// lib/supabase/withPageAuth.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { createClient } from './client';

// Define the shape of the options object
interface WithPageAuthOptions {
    authRequired?: boolean;
    redirectTo?: string;
    getServerSideProps?: (
        ctx: GetServerSidePropsContext,
        supabase: SupabaseClient<Database>
    ) => Promise<GetServerSidePropsResult<any>>;
}

export function withPageAuth({
    authRequired = false,
    redirectTo = '/',
    getServerSideProps,
}: WithPageAuthOptions): GetServerSideProps {
    // Return a standard getServerSideProps function
    return async (context: GetServerSidePropsContext) => {
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        // If auth is required and there is no user, redirect
        if (authRequired && !user) {
            return {
                redirect: {
                    destination: redirectTo,
                    permanent: false,
                },
            };
        }

        // If a custom getServerSideProps is provided, call it with the context and client
        if (getServerSideProps) {
            return await getServerSideProps(context, supabase);
        }

        // Otherwise, just return empty props
        return { props: {} };
    };
}