import Head from 'next/head';
import Footer from '@/components/landing/Footer';
import { PropsWithChildren } from 'react';
import GrowNav from '../nav/GrowNav';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>
                    GROW X - Germany&apos;s Largest Student Founding Contest
                </title>
                <meta
                    name="description"
                    content="GrowX - Founding Contest. Become an entrepreneur and advance your idea over 11 weeks. Get support, build your prototype and test your market."
                />
            </Head>
            <GrowNav />
            <main className="pt-14">{children}</main>
            <Footer />
        </>
    );
}
