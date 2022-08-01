import Head from 'next/head';
import { PropsWithChildren } from 'react';
import ConnectNav from '../nav/ConnectNav';
import RouteGuard from '../RouteGuard';

export default function ConnectLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GROWconnect</title>
                <meta name="description" content="GROWconnect" />
            </Head>
            <RouteGuard>
                <ConnectNav />
                <main className="pt-14">{children}</main>
            </RouteGuard>
        </>
    );
}
