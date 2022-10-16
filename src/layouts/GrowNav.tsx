import {
    Button,
    HStack,
    IconButton,
    IconButtonProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
    useBreakpointValue,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'modules/profile/hooks';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import {
    FaCalendarAlt,
    FaHome,
    FaSignOutAlt,
    FaUser,
    FaUsers,
} from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { isSignUpEnabled } from 'utils/dates';
import { Logo, NavBarContainer } from '../components/navigation/Nav';
import NavAdminMenu from '../components/navigation/NavAdminMenu';
import UserAvatar from '../modules/avatar/components/UserAvatar';

const GrowConnectNavButton: React.FC<
    PropsWithChildren & LinkProps & Pick<IconButtonProps, 'aria-label' | 'icon'>
> = ({ children, icon, ...rest }) => {
    const variant = useBreakpointValue({
        base: undefined,
        lg: icon,
    });
    return (
        <>
            <Show above="md">
                <Link {...rest}>
                    <a>
                        <Button variant="ghost" leftIcon={variant}>
                            {children}
                        </Button>
                    </a>
                </Link>
            </Show>
            <Show below="md">
                <Link {...rest}>
                    <a>
                        <IconButton
                            aria-label={rest['aria-label']}
                            icon={icon}
                            variant="ghost"
                        />
                    </a>
                </Link>
            </Show>
        </>
    );
};

export default function GrowNav() {
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
            <Logo />
            <HStack gap={{ base: 2, sm: 0, lg: 2 }}>
                {!profile ? (
                    <>
                        <Show above="md">
                            <Link href="/#faqs">
                                <Button variant="ghost">FAQs</Button>
                            </Link>
                            <Link href="/#timeline">
                                <Button variant="ghost">Timeline</Button>
                            </Link>
                        </Show>
                        {isSignUpEnabled ? (
                            <Link href="/connect/signup">
                                <a>
                                    <Button>Participate</Button>
                                </a>
                            </Link>
                        ) : (
                            <Button disabled>Participate</Button>
                        )}

                        <Link href="/connect/login">
                            <a>
                                <Button>Sign in</Button>
                            </a>
                        </Link>
                    </>
                ) : (
                    <>
                        <GrowConnectNavButton
                            href="/connect"
                            icon={<FaHome />}
                            aria-label="Home"
                        >
                            Home
                        </GrowConnectNavButton>

                        <GrowConnectNavButton
                            href="/connect/events"
                            icon={<FaCalendarAlt />}
                            aria-label="Events"
                        >
                            Events
                        </GrowConnectNavButton>
                        <GrowConnectNavButton
                            href="/connect/teams"
                            icon={<FaUsers />}
                            aria-label="Teams"
                        >
                            Teams
                        </GrowConnectNavButton>
                        <Show above="sm">
                            {profile.role === 'ORGA' ? (
                                <NavAdminMenu />
                            ) : undefined}
                        </Show>
                        <Menu placement="bottom-end">
                            {({ isOpen }) => (
                                <>
                                    <MenuButton
                                        isActive={isOpen}
                                        isRound={true}
                                        as={IconButton}
                                        size="lg"
                                        icon={
                                            <UserAvatar
                                                userId={profile.userId}
                                                firstName={profile.firstName}
                                                lastName={profile.lastName}
                                                avatar={profile.avatar}
                                            />
                                        }
                                    />
                                    <MenuList>
                                        <Link href="/connect/profile">
                                            <MenuItem icon={<FaUser />}>
                                                Profile
                                            </MenuItem>
                                        </Link>
                                        <Link href="/connect/team">
                                            <MenuItem icon={<FaUsers />}>
                                                Your Team
                                            </MenuItem>
                                        </Link>
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
                    </>
                )}
            </HStack>
        </NavBarContainer>
    );
}
