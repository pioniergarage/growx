import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import ConnectNav from '../nav/ConnectNav';

export default function ConnectLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GROWconnect</title>
                <meta name="description" content="GROWconnect" />
            </Head>
            <UserProvider supabaseClient={supabaseClient}>
                <ConnectNav />
                <main className="pt-14">{children}</main>
            </UserProvider>
        </>
    );
}
