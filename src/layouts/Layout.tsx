import { Box } from '@chakra-ui/react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import GrowNav from 'layouts/GrowNav';
import Footer from 'modules/landing/Footer';
import Head from 'next/head';
import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Layout({ children }: PropsWithChildren) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0,
            },
        },
    });
    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
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
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <SessionContextProvider supabaseClient={supabaseClient}>
                <QueryClientProvider client={queryClient}>
                    <GrowNav />
                    <Box
                        as="main"
                        maxW="container.xl"
                        mx="auto"
                        py={24}
                        position="relative"
                    >
                        <Box
                            position="absolute"
                            h="10rem"
                            top={0}
                            w="100%"
                            zIndex={-10}
                        >
                            <Box
                                maxW="container.xl"
                                transform="translate(0, -50%)"
                                w="100%"
                                h={{ base: '40rem', md: '100%' }}
                                position="absolute"
                                zIndex={-10}
                            >
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    bgGradient="linear-gradient(128.16deg, #5557f777 8.06%, #d34dbc80 45% , #d6265170 83.26%)"
                                    borderRadius="50%"
                                    filter={{
                                        base: 'blur(100px)',
                                        md: 'blur(150px)',
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box px={4}>{children}</Box>
                    </Box>
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </SessionContextProvider>
            <Footer />
        </>
    );
}
