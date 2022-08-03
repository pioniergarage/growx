import { Box } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import ConnectNav from '../nav/ConnectNav';

export default function ConnectLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GROWconnect</title>
                <meta name="description" content="GROWconnect" />
            </Head>
            <UserProvider supabaseClient={supabaseClient}>
                <ConnectNav />
                <main className="pt-14">
                    <Box maxW='container.xl' mx='auto' py={12} px={{base: 4, md: 0}}>
                    {children}
                    </Box>
                </main>
            </UserProvider>
        </>
    );
}
