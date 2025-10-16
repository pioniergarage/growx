// lib/supabase/withPageAuth.ts
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetServerSidePropsResult,
} from 'next';
import { createServerClient } from './server';


// 1. Introduce a generic type parameter `<P>`
interface WithPageAuthOptions<P> {
    authRequired?: boolean;
    redirectTo?: string;
    getServerSideProps?: (
        ctx: GetServerSidePropsContext,
        supabase: SupabaseClient<Database>
    ) => Promise<GetServerSidePropsResult<P>>; // 2. Replace 'any' with 'P'
}

// 3. Add the generic to the function signature with a constraint
export function withPageAuth<P extends { [key: string]: unknown } = { [key: string]: unknown }>({
    authRequired = false,
    redirectTo = '/',
    getServerSideProps,
}: WithPageAuthOptions<P>): GetServerSideProps<P> { // 4. Use 'P' in the return type
    return async (context: GetServerSidePropsContext) => {
        // This looks like you're using a client-side client on the server.
        // It should be createServerClient(context) from './server'
        const supabase = createServerClient(context); //Cannot find name 'createServerClient'.

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