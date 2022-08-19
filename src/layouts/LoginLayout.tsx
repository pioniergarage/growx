import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>GROWconnect</title>
                <meta name="description" content="GROWconnect" />
            </Head>
            <UserProvider supabaseClient={supabaseClient}>
                <Flex
                    as="main"
                    height="100vh"
                    justifyContent="center"
                    alignItems="center"
                    bg="whiteAlpha.100"
                >
                    <Box
                        bg="var(--chakra-colors-chakra-body-bg)"
                        p={8}
                        borderRadius={4}
                    >
                        {children}
                    </Box>
                </Flex>
            </UserProvider>
        </>
    );
}