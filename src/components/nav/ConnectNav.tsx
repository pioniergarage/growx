import {
    Box,
    Button,
    forwardRef,
    IconButton,
    IconButtonProps,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useRadio,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement, useState } from 'react';
import AvatarWrapper from './avatarWrapper';
import { NavBarContainer, Logo, MenuToggle, MenuLinksContainer } from './Nav';

export default function ConnectNav() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const router = useRouter()

    async function handleLogout() {
        await supabaseClient.auth.signOut()
        router.push('/')
    }

    return (
        <NavBarContainer>
            <Logo href="/connect/">GROWconnect</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <Link href="/">
                    <Button>GROW X</Button>
                </Link>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton isActive={isOpen} as={IconButton} isRound={true} icon={<AvatarWrapper />} />
                            <MenuList>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </MenuLinksContainer>
        </NavBarContainer>
    );
}
