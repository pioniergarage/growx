import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import AvatarWrapper from './avatarWrapper';
import {
    MenuItem,
    NavBarContainer,
    Logo,
    MenuToggle,
    MenuLinksContainer,
} from './Nav';

export default function ConnectNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer>
            <Logo href="/connect/">GROWconnect</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <Link href="/">
                    <Button>GROW X</Button>
                </Link>
                <AvatarWrapper />
            </MenuLinksContainer>
        </NavBarContainer>
    );
}
