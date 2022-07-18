import Head from "next/head";
import { PropsWithChildren } from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";


export default function AdminLayout({ children }: PropsWithChildren) {
    return (
        <UserProvider supabaseClient={supabaseClient}>
            <Head>
                <title>Grow Admin</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <main data-theme="emerald">
                <Link href="/">
                    <a className="btn btn-ghost">
                        → Grow
                    </a>
                </Link>
                <Link href="/growconnect/app">
                    <a className="btn btn-ghost">
                        → GROWconnect
                    </a>
                </Link>
                <div>{supabaseClient.auth.user()?.email}</div>
                <button className="btn " onClick={() => supabaseClient.auth.signOut()}>Logout</button>
                <h1 className="text-4xl font-black">Admin</h1>
                {children}
            </main>
        </UserProvider>
    )
}

