import { Box, Flex } from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Layout({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
            },
        },
    });
    return (
        <>
            <Head>
                <title>GROWconnect</title>
                <meta name="description" content="GROWconnect" />
            </Head>
            <UserProvider supabaseClient={supabaseClient}>
                <QueryClientProvider client={queryClient}>
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
                </QueryClientProvider>
            </UserProvider>
        </>
    );
}
