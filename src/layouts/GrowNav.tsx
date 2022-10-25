import NavAdminMenu from '@/components/navigation/NavAdminMenu';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
    useDisclosure,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useProfile } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import {
    DesktopMenuButton,
    GrowLogo,
    MenuToggle,
    MobileMenuButton,
    NavBarContainer,
} from '../components/navigation/Nav';
import UserAvatar from '../modules/avatar/components/UserAvatar';

const DesktopMenu = (props: { profile?: Profile }) => {
    return (
        <Show above="lg">
            <DesktopMenuButton href="/">Home</DesktopMenuButton>
            <DesktopMenuButton href="/startup_diploma">
                Startup Diploma
            </DesktopMenuButton>
            <DesktopMenuButton href="/mentor">Mentors</DesktopMenuButton>

            {props.profile && (
                <>
                    <DesktopMenuButton href="/connect">News</DesktopMenuButton>
                    <DesktopMenuButton href="/connect/teams">
                        Teams
                    </DesktopMenuButton>
                    <DesktopMenuButton href="/connect/events">
                        Events
                    </DesktopMenuButton>
                    {props.profile.role === 'ORGA' && <NavAdminMenu />}
                </>
            )}
        </Show>
    );
};

const MobileMenu = (props: { profile?: Profile }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        if (onClose) {
            router.events.on('routeChangeComplete', onClose);

            return () => {
                router.events.off('routeChangeComplete', onClose);
            };
        }
    }, [router, onClose]);

    return (
        <>
            <MenuToggle onClick={onOpen} />
            <Drawer
                onClose={onClose}
                isOpen={isOpen}
                placement="left"
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent bg="gray.900">
                    <DrawerHeader as={Flex} alignItems="center" pl={4} pt={5}>
                        <MenuToggle onClick={onClose} variant="ghost" mr={4} />
                        <GrowLogo />
                    </DrawerHeader>
                    <DrawerBody p={0} mt={1} zIndex={20}>
                        <MobileMenuButton href="/">Home</MobileMenuButton>
                        <MobileMenuButton href="/startup_diploma">
                            Startup Diploma
                        </MobileMenuButton>
                        <MobileMenuButton href="/mentor">
                            Mentors
                        </MobileMenuButton>
                        {props.profile && (
                            <>
                                <MobileMenuButton href="/connect">
                                    News
                                </MobileMenuButton>
                                <MobileMenuButton href="/connect/teams">
                                    Teams
                                </MobileMenuButton>
                                <MobileMenuButton href="/connect/events">
                                    Events
                                </MobileMenuButton>
                            </>
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

const ProfileMenu = (props: { profile: Profile; handleLogout: () => void }) => {
    return (
        <Menu placement="bottom-end">
            {({ isOpen }) => (
                <>
                    <MenuButton
                        isActive={isOpen}
                        isRound={true}
                        as={IconButton}
                        size="lg"
                        icon={<UserAvatar profile={props.profile} />}
                    />
                    <MenuList>
                        <Link href="/connect/profile">
                            <MenuItem icon={<FaUser />}>Profile</MenuItem>
                        </Link>
                        {['PARTICIPANT', 'ORGA'].includes(
                            props.profile.role
                        ) && (
                            <Link href="/connect/team">
                                <MenuItem icon={<FaUsers />}>
                                    Your Team
                                </MenuItem>
                            </Link>
                        )}
                        <MenuItem
                            onClick={props.handleLogout}
                            icon={<FaSignOutAlt />}
                        >
                            Sign out
                        </MenuItem>
                    </MenuList>
                </>
            )}
        </Menu>
    );
};

export default function GrowNav() {
    const supabaseClient = useSupabaseClient();
    const { profile } = useProfile();
    const router = useRouter();
    const queryClient = useQueryClient();

    async function handleLogout() {
        await supabaseClient.auth.signOut();
        queryClient.setQueryData('profile', null);
        router.push('/');
    }

    return (
        <NavBarContainer>
            <MobileMenu profile={profile} />
            <GrowLogo flexGrow={1} />
            <HStack gap={{ base: 2, sm: 0, lg: 2 }}>
                <DesktopMenu profile={profile} />
                {!profile ? (
                    <>
                        <Show above="md">
                            <Link href="/connect/signup">
                                <a>
                                    <Button>Participate</Button>
                                </a>
                            </Link>
                        </Show>

                        <Link href="/connect/login">
                            <a>
                                <Button>Sign in</Button>
                            </a>
                        </Link>
                    </>
                ) : (
                    <ProfileMenu
                        profile={profile}
                        handleLogout={handleLogout}
                    />
                )}
            </HStack>
        </NavBarContainer>
    );
}
