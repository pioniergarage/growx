import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaCogs } from 'react-icons/fa';
const NavAdminMenu = () => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Admin"
                icon={<FaCogs />}
                variant="ghost"
            />
            <MenuList>
                <Link href="/connect/admin/profiles">
                    <MenuItem>Profiles</MenuItem>
                </Link>
                <Link href="/connect/admin/sponsors">
                    <MenuItem>Sponsors</MenuItem>
                </Link>
                <Link href="/connect/admin/events">
                    <MenuItem>Events</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    );
};

export default NavAdminMenu;
