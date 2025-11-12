import SupabaseProvider from '@/components/providers/SupabaseProvider';
import { Box } from '@chakra-ui/react';
import Footer from 'modules/landing/Footer';
import GrowNav from 'modules/navigation/GrowNav';
import Head from 'next/head';
import React, { PropsWithChildren } from 'react';
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
                    GROW - Germany&apos;s Largest smallest Founding Contest
                </title>
                <meta
                    name="description"
                    content="GrowX - Founding Contest.  Become an entrepreneur: advance your idea or turn your research into impact over 11
                            weeks. Get support, build your prototype and test your market."
                />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>

            <SupabaseProvider>
                <QueryClientProvider client={queryClient}>
                    <GrowNav />
                    <MainWrapper>{children}</MainWrapper>
                    <Footer />
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </SupabaseProvider>
        </>
    );
}

const MainWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box as="main" maxW="container.xl" mx="auto" pt={6} position="relative">
            <GradientBackground />
            <Box px={{ base: 4, md: 6 }} maxW="100vw">
                {children}
            </Box>
        </Box>
    );
};

const GradientBackground: React.FC = () => {
    return (
        <Box position="absolute" h="10rem" top={0} w="100%" zIndex={-10}>
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
    );
};
