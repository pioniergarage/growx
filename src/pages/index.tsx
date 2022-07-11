import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import Nav from "../components/layout/Nav";
import MainInfoBlock from "../components/layout/MainInfoBlock";

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>GrowX</title>
                <meta name="description" content="GrowX - Founding Contest" />
            </Head>
            <main>
                <Nav />
                <div className="flex flex-col items-center text-center gap-4 p-4">
                    <MainInfoBlock />
                </div>
            </main>
        </div>
    );
};

export default Home;
