import NavAdminMenu from '@/components/navigation/NavAdminMenu';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
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
import UserAvatar from '../../modules/avatar/components/UserAvatar';
import {
    DesktopMenuButton,
    GrowLogo,
    MenuToggle,
    MobileMenuButton,
    TopNavBar,
} from './Nav';

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

const SideNav: React.FC<{
    profile?: Profile;
    isOpen: boolean;
    onClose: () => void;
}> = ({ profile, isOpen, onClose }) => {
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
                        {profile && (
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

const ProfileMenuWrapper: React.FC<{ profile?: Profile }> = ({ profile }) => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const queryClient = useQueryClient();

    async function handleLogout() {
        await supabaseClient.auth.signOut();
        queryClient.setQueryData('profile', null);
        router.push('/');
    }

    if (profile) {
        return <ProfileMenu profile={profile} handleLogout={handleLogout} />;
    } else {
        return (
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
        );
    }
};

export default function GrowNav() {
    const { profile } = useProfile();

    const {
        isOpen: isSideNavOpen,
        onOpen: onSideNavOpen,
        onClose: onSideNavClose,
    } = useDisclosure();

    return (
        <>
            <SideNav
                profile={profile}
                isOpen={isSideNavOpen}
                onClose={onSideNavClose}
            />
            <TopNavBar>
                <MenuToggle onClick={onSideNavOpen} />
                <GrowLogo flexGrow={1} />
                <DesktopMenu profile={profile} />
                <ProfileMenuWrapper profile={profile} />
            </TopNavBar>
        </>
    );
}
