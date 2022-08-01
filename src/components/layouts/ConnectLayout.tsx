import Head from 'next/head';
import Footer from 'components/Footer';
import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ConnectNav from '../nav/ConnectNav';

export default function ConnectLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>
                    GROWconnect
                </title>
                <meta
                    name="description"
                    content="GROWconnect"
                />
            </Head>
            <ConnectNav />
            <main className="pt-14">{children}</main>
            
        </>
    );
}
