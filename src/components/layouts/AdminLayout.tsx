import Head from "next/head";
import { PropsWithChildren } from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";


export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <UserProvider supabaseClient={supabaseClient}>
            <Head>
                <title>Grow Admin</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <main data-theme="emerald">
                {children}
            </main>
        </UserProvider>
    )
}