import Head from "next/head";
import Nav from "components/Nav";
import Footer from "components/Footer";
import { PropsWithChildren } from "react";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";


export default function GrowConnectLayout({ children }: PropsWithChildren) {
    return (
        <UserProvider supabaseClient={supabaseClient}>
            <Head>
                <title>GrowX</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </UserProvider>
    )
}