import {
    Box,
    Button,
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
import { useProfile } from 'hooks/profile';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';
import {
    FaCalendarAlt,
    FaCogs,
    FaHome,
    FaSignOutAlt,
    FaUser,
    FaUsers,
} from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import UserAvatar from '../avatar/UserAvatar';

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
                    <Button variant="ghost" leftIcon={variant}>
                        {children}
                    </Button>
                </Link>
            </Show>
            <Show below="md">
                <Link {...rest}>
                    <IconButton
                        aria-label={rest['aria-label']}
                        icon={icon}
                        variant="ghost"
                    />
                </Link>
            </Show>
        </>
    );
};

const GrowConnectWrapper: React.FC = () => {
    const { profile, isLoading } = useProfile();
    const router = useRouter();
    const queryClient = useQueryClient();

    async function handleLogout() {
        await supabaseClient.auth.signOut();
        await queryClient.invalidateQueries();
        queryClient.setQueryData('profile', null);
        if (router.route === '/') {
            router.reload();
        } else {
            router.push('/');
        }
    }

    if (!isLoading && profile) {
        return (
            <>
                <Show above="md">
                    <Box
                        h={6}
                        w={0.5}
                        bgColor="whiteAlpha.500"
                        borderRadius={1}
                    />
                </Show>
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
                {profile.role === 'ORGA' ? (
                    <GrowConnectNavButton
                        href="/connect/admin"
                        icon={<FaCogs />}
                        aria-label="Admin"
                    >
                        Admin
                    </GrowConnectNavButton>
                ) : undefined}
                <Menu placement="bottom-end">
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                isRound={true}
                                as={IconButton}
                                size="lg"
                                icon={<UserAvatar {...profile} />}
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
        );
    }

    return (
        <>
            <Button>
                <Link href="/connect/signup">Participate</Link>
            </Button>
            <Button>
                <Link href="/connect/login">Sign in</Link>
            </Button>
        </>
    );
};

export default GrowConnectWrapper;
