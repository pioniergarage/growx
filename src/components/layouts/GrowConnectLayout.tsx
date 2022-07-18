import Head from "next/head";
import { PropsWithChildren } from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import GrowConnectNav from "../growconnect/GrowConnectNav";


export default function GrowConnectLayout({ children }: PropsWithChildren) {
    return (
        <UserProvider supabaseClient={supabaseClient}>
            <div data-theme='emerald'>
                <Head>
                    <title>GrowX</title>
                    <meta name="description" content="GrowX - Founding Contest" />
                </Head>
                <GrowConnectNav />
                <main>
                    {children}
                </main>
            </div>
        </UserProvider>
    )
}