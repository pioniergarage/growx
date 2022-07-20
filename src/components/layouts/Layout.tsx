import Head from "next/head";
import Nav from "components/Nav";
import Footer from "components/Footer";
import { PropsWithChildren } from "react";


export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GrowX</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <Nav />
            <main className="pt-14">
                {children}
            </main>
            <Footer /> 
        </>
    )
}