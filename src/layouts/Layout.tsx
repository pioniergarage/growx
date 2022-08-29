import Footer from '@/components/landing/Footer';
import GrowNav from '@/components/navigation/GrowNav';
import { Box } from '@chakra-ui/react';
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
                <title>
                    GROW X - Germany&apos;s Largest Student Founding Contest
                </title>
                <meta
                    name="description"
                    content="GrowX - Founding Contest. Become an entrepreneur and advance your idea over 11 weeks. Get support, build your prototype and test your market."
                />
            </Head>

            <UserProvider supabaseClient={supabaseClient}>
                <QueryClientProvider client={queryClient}>
                    <GrowNav />
                    <Box as="main" maxW="container.xl" mx="auto" pt={20} px={4}>
                        <Box
                            position="absolute"
                            h="10rem"
                            top={0}
                            left={0}
                            w="100%"
                            zIndex={-10}
                        >
                            <Box
                                maxW="container.xl"
                                transform="translate(-1rem, -50%)"
                                top={0}
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
                                        base: 'blur(20px)',
                                        md: 'blur(150px)',
                                    }}
                                />
                            </Box>
                        </Box>
                        {children}
                    </Box>
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </UserProvider>
            <Footer />
        </>
    );
}
