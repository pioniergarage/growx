import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';

const NavAdminMenu = () => {
    const variant = useBreakpointValue({
        base: IconButton,
        lg: Button,
    });
    return (
        <Menu>
            <MenuButton as={variant} variant="ghost">
                Admin
            </MenuButton>
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
                <Link href="/connect/admin/teams">
                    <MenuItem>Teams</MenuItem>
                </Link>
            </MenuList>
        </Menu>
    );
};

export default NavAdminMenu;
