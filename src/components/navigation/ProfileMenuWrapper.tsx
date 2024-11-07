import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import UserAvatar from 'modules/avatar/components/UserAvatar';
import { Profile } from 'modules/profile/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaSignOutAlt, FaUser, FaUsers } from 'react-icons/fa';
import { useQueryClient } from 'react-query';

const ProfileMenu = (props: { profile: Profile; handleLogout: () => void }) => {
    return (
        <Menu placement="bottom-end">
            {({ isOpen }) => (
                <>
                    <MenuButton
                        isActive={isOpen}
                        isRound={true}
                        as={IconButton}
                        size="md"
                        icon={<UserAvatar profile={props.profile} size="sm" />}
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
                <Link href="/connect/login">
                    <a>
                        <Button>Sign in</Button>
                    </a>
                </Link>
                <Link href="/connect/signup">
                    <a>
                        <Button>Sign up</Button> {/** TODO Decide if this should be removed */}
                    </a>
                </Link>
            </>
        );
    }
};

export default ProfileMenuWrapper;
