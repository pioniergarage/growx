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
                <title>GROW</title>
            </Head>
            <UserProvider supabaseClient={supabaseClient}>
                <QueryClientProvider client={queryClient}>
                    <Flex
                        as="main"
                        height="100vh"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                    >
                        <Box
                            position="absolute"
                            width="50%"
                            height="50%"
                            bgGradient="linear-gradient(128.16deg, #5557f777 8.06%, #d34dbc80 45% , #d6265170 83.26%)"
                            borderRadius="50%"
                            filter="blur(150px)"
                        />
                        <Box
                            bg="blackAlpha.500"
                            p={6}
                            w="100%"
                            h={{base: "100%", sm: "auto"}}
                            maxW={{sm: '80%', md: "container.sm"}}
                            borderRadius={4}
                            zIndex={12}
                        >
                            {children}
                        </Box>
                    </Flex>
                </QueryClientProvider>
            </UserProvider>
        </>
    );
}
