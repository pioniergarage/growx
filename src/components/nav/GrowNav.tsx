import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import AvatarWrapper from './avatarWrapper';
import {
    NavItem as MenuItem,
    NavBarContainer,
    Logo,
    MenuToggle,
    MenuLinksContainer,
} from './Nav';

export default function GrowNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer>
            <Logo>GROW X</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <MenuItem onClick={toggle} to="/faq">
                    FAQ
                </MenuItem>
                <MenuItem onClick={toggle} to="/timeline">
                    Timeline
                </MenuItem>
                <Link href='/connect/'>
                    <Button>GROWconnect</Button>
                </Link>
            </MenuLinksContainer>
        </NavBarContainer>
    );
}
