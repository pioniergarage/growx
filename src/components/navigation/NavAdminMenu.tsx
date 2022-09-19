import {
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Show,
    useBreakpointValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaCogs } from 'react-icons/fa';

const ResponsiveMenuButton = () => {
    const variant = useBreakpointValue({
        base: undefined,
        lg: <FaCogs />,
    });
    return (
        <>
            <Show above="md">
                <Button variant="ghost" leftIcon={variant}>
                    Admin
                </Button>
            </Show>
            <Show below="md">
                <IconButton
                    aria-label="admin-menu-button"
                    icon={<FaCogs />}
                    variant="ghost"
                />
            </Show>
        </>
    );
};

const NavAdminMenu = () => {
    return (
        <Menu>
            <MenuButton><ResponsiveMenuButton /></MenuButton>
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
