// lib/supabase/withPageAuth.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { createServerClient } from './server';


interface WithPageAuthOptions<P> {
    authRequired?: boolean;
    redirectTo?: string;
    getServerSideProps?: (
        ctx: GetServerSidePropsContext,
        supabase: SupabaseClient<Database>
    ) => Promise<GetServerSidePropsResult<P>>;
}

export function withPageAuth<P extends { [key: string]: unknown } = { [key: string]: unknown }>({
    authRequired = false,
    redirectTo = '/',
    getServerSideProps,
}: WithPageAuthOptions<P>): GetServerSideProps<P> {
    return async (context: GetServerSidePropsContext) => {
        const supabase = createServerClient(context);

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (authRequired && !user) {
            return {
                redirect: {
                    destination: redirectTo,
                    permanent: false,
                },
            };
        }

        if (getServerSideProps) {
            return await getServerSideProps(context, supabase);
        }

        // We need to cast the empty props to the correct type
        return { props: {} as P };
    };
}