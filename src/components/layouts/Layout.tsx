import Head from "next/head";
import Nav from "../grow/Nav";
import Footer from "../grow/Footer";
import { PropsWithChildren } from "react";


export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GrowX</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <Nav />
            <main  data-theme='growDark'>
                {children}
            </main>
            <Footer />
        </>
    )
}