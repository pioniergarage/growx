import SupabaseProvider, {
    useSupabaseClient,
    useUser,
} from '@/components/providers/SupabaseProvider';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, chakra, HStack, Link, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useGrowEvents } from 'modules/events/hooks';
import Footer from 'modules/landing/Footer';
import GrowNav from 'modules/navigation/GrowNav';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect, useState } from 'react';
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
                    GROW - Germany&apos;s Largest Student Founding Contest
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
                    <FinalBanner />
                    <GrowNav />
                    <MainWrapper>{children}</MainWrapper>
                    <Footer />
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </SupabaseProvider>
        </>
    );
}

const MotionBox = chakra(motion.div);

const FinalBanner: React.FC = () => {
    const { events } = useGrowEvents();
    const [isOpen, setOpen] = useState(false);
    const user = useUser();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const finalEvent = events?.find((e) => e.ref === 'final');
    const today = new Date();
    const title = "Join us at the GROW Final '26";
    const isLoggedIn = user != undefined;
    useEffect(() => {
        supabase.auth.getSession().then(() => {
            setOpen(true);
        });
    }, [supabase.auth]);

    const showClose = isLoggedIn || router.asPath != '/';
    const showBanner = router.asPath == '/' || !isLoggedIn;

    if (finalEvent == undefined || finalEvent.date == undefined || finalEvent?.date < today) {
        return null;
    }

    if (isOpen && showBanner)
        return (
            <MotionBox
                backgroundColor="rgba(85,100,250, 0.35)"
                width="100%"
                paddingEnd="2em"
                initial={{ marginTop: -100 }}
                animate={{ marginTop: 0 }}
                zIndex={10}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore no problem in operation, although type error appears.
                transition={{ delay: 0.5, type: 'tween' }}
            >
                <HStack>
                    <Box
                        mx="auto"
                        maxW="container.xl"
                        padding="1em 2em"
                        fontWeight="semibold"
                        textAlign={'center'}
                    >
                        {finalEvent?.href ? (
                            <Link
                                href={finalEvent?.href}
                                display={'flex'}
                                gap={'2'}
                                alignItems={'center'}
                                justifyContent={'center'}
                            >
                                <ExternalLinkIcon />
                                {title}
                            </Link>
                        ) : (
                            <Text>{title}</Text>
                        )}
                    </Box>
                    {showClose ? (
                        <Link onClick={() => setOpen(false)}>X</Link>
                    ) : (
                        <></>
                    )}
                </HStack>
            </MotionBox>
        );
    return null;
};

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
