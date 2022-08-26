import UserAvatar from '@/components/avatar/UserAvatar';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '@supabase/auth-helpers-react';
import { useProfile } from 'hooks/profile';
import { UserRole } from 'model';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import { QueryClient, QueryClientProvider } from 'react-query';
import AnimatedLogo from '../components/landing/AnimatedLogo';
import { Logo } from '../components/navigation/Nav';

const Countdown = dynamic(import('../components/landing/Countdown'), {
    ssr: false,
});

function ConnectHeader({ role }: { role?: UserRole }) {
    const router = useRouter();
    const { profile } = useProfile();

    async function handleLogout() {
        await supabaseClient.auth.signOut();
        router.push('/');
    }

    return (
        <Flex
            zIndex={100}
            as="header"
            py={6}
            px={4}
            alignItems="center"
            maxW="8xl"
            mx="auto"
            position="sticky"
            top={0}
            bg="var(--chakra-colors-chakra-body-bg)"
        >
            <Box flexGrow={1}>
                <Logo href="/connect/">
                    GROW
                    <Text as="span" color="primary">
                        connect
                    </Text>
                </Logo>
            </Box>
            <Menu placement="bottom-end">
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            display={{ base: 'none', lg: 'block' }}
                            isActive={isOpen}
                            isRound={true}
                            as={IconButton}
                            size="lg"
                            icon={<UserAvatar profile={profile} />}
                        />
                        <MenuList>
                            <MenuItem
                                icon={<FaUser />}
                                onClick={() => router.push('/connect/profile')}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}
                                icon={<FaSignOutAlt />}
                            >
                                Sign out
                            </MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            <Menu placement="bottom-end">
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            display={{ base: 'block', lg: 'none' }}
                            ml={4}
                            isActive={isOpen}
                            as={IconButton}
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            <MenuItem onClick={() => router.push('/connect')}>
                                Home
                            </MenuItem>
                            <MenuItem
                                onClick={() => router.push('/connect/events')}
                            >
                                Events
                            </MenuItem>
                            <MenuItem
                                onClick={() => router.push('/connect/profile')}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem
                                onClick={() => router.push('/connect/teams')}
                            >
                                Teams
                            </MenuItem>
                            <MenuItem
                                onClick={() => router.push('/connect/team')}
                            >
                                Your Team
                            </MenuItem>
                            <MenuItem
                                onClick={handleLogout}
                                icon={<FaSignOutAlt />}
                            >
                                Logout
                            </MenuItem>
                            {role === 'ORGA' ? (
                                <MenuItem
                                    onClick={() =>
                                        router.push('/connect/admin')
                                    }
                                >
                                    Admin
                                </MenuItem>
                            ) : undefined}
                        </MenuList>
                    </>
                )}
            </Menu>
        </Flex>
    );
}

function SideNavItem({ href, children }: PropsWithChildren & { href: string }) {
    const router = useRouter();
    return (
        <li>
            <Link href={href} passHref>
                <Box
                    display="block"
                    as="a"
                    borderRadius={5}
                    px={2}
                    py={1}
                    w="100%"
                    fontWeight="semibold"
                    bg={router.pathname === href ? 'primary-bg' : 'inherit'}
                    color={router.pathname === href ? 'primary' : 'inherit'}
                >
                    {children}
                </Box>
            </Link>
        </li>
    );
}

function SideNav({ role }: { role?: UserRole }) {
    return (
        <Box
            display={{ base: 'none', lg: 'block' }}
            h="min-content"
            width="16rem"
            as="nav"
            position="sticky"
            top="6rem"
            overscrollBehavior="contain"
            pr={10}
            pl={{ base: 4, lg: 0 }}
        >
            <VStack as="ul" alignItems="stretch" gap={1}>
                <SideNavItem href="/connect">Home</SideNavItem>
                <SideNavItem href="/connect/events">Events</SideNavItem>
                <SideNavItem href="/connect/profile">Profile</SideNavItem>
                <SideNavItem href="/connect/team">Your Team</SideNavItem>
                <SideNavItem href="/connect/teams">All Teams</SideNavItem>
                {role === 'ORGA' ? (
                    <SideNavItem href="/connect/admin">Admin</SideNavItem>
                ) : undefined}
            </VStack>
            <VStack mt={10}>
                <AnimatedLogo fill="whiteAlpha.900" boxSize={100} />
                <Countdown fontSize="xl" />
            </VStack>
        </Box>
    );
}

function ContentContainer({ children }: PropsWithChildren) {
    const { profile } = useProfile();
    return (
        <>
            <ConnectHeader role={profile?.role} />
            <Box as="main" maxW="8xl" mx="auto" px={4}>
                <Flex>
                    <SideNav role={profile?.role} />
                    <Box flexGrow={1}>{children}</Box>
                </Flex>
            </Box>
        </>
    );
}

export default function ConnectLayout({ children }: PropsWithChildren) {
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
                    <ContentContainer>{children}</ContentContainer>

                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                </QueryClientProvider>
            </UserProvider>
        </>
    );
}
