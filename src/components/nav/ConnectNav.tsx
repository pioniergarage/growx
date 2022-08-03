import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { useState } from 'react';
import AvatarWrapper from './avatarWrapper';
import { NavBarContainer, Logo, MenuToggle, MenuLinksContainer } from './Nav';

export default function ConnectNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const router = useRouter();

    async function handleLogout() {
        await supabaseClient.auth.signOut();
        router.push('/');
    }

    return (
        <NavBarContainer>
            <Logo href="/connect/">GROWconnect</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <Link href="/">
                    <Button size="sm">GROW X</Button>
                </Link>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                isActive={isOpen}
                                as={IconButton}
                                isRound={true}
                                icon={<AvatarWrapper />}
                            />
                            <MenuList>
                                <MenuItem>
                                    <Link href="/connect/profile">Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </MenuLinksContainer>
        </NavBarContainer>
    );
}
