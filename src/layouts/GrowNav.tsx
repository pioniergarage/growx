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

const DesktopMenu = () => {
    return (
        <Show above="md">
            <DesktopMenuButton href="/">Home</DesktopMenuButton>
            <DesktopMenuButton href="/startup_diploma">
                Startup Diploma
            </DesktopMenuButton>
            <DesktopMenuButton href="/mentor">Mentors</DesktopMenuButton>
        </Show>
    );
};

const MobileMenu = () => {
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
            <MenuToggle onClick={onOpen} variant="ghost" />
            <Drawer
                onClose={onClose}
                isOpen={isOpen}
                placement="left"
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader as={Flex} alignItems="center" pl={2}>
                        <MenuToggle onClick={onClose} variant="ghost" />
                        <GrowLogo />
                    </DrawerHeader>
                    <DrawerBody p={0} zIndex={20}>
                        <MobileMenuButton href="/">Home</MobileMenuButton>
                        <MobileMenuButton href="/startup_diploma">
                            Startup Diploma
                        </MobileMenuButton>
                        <MobileMenuButton href="/mentor">
                            Mentors
                        </MobileMenuButton>
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
                        <Link href="/connect/team">
                            <MenuItem icon={<FaUsers />}>Your Team</MenuItem>
                        </Link>
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
            <MobileMenu />
            <GrowLogo flexGrow={1} />
            <HStack gap={{ base: 2, sm: 0, lg: 2 }}>
                <DesktopMenu />
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
