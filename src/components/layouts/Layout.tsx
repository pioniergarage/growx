import Head from "next/head";
import Nav from "components/Nav";
import Footer from "components/Footer";


export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>GrowX</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <Nav />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}