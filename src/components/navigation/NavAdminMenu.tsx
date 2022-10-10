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
import { FaCogs } from 'react-icons/fa';

const NavAdminMenu = () => {
    const variant = useBreakpointValue({
        base: IconButton,
        lg: Button,
    });
    return (
        <Menu>
            <MenuButton
                as={variant}
                variant="ghost"
                icon={<FaCogs />}
                leftIcon={variant === Button ? <FaCogs /> : undefined}
            >
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
            </MenuList>
        </Menu>
    );
};

export default NavAdminMenu;
