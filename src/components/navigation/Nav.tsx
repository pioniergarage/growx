import { Button } from '@chakra-ui/button';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    ButtonProps,
    Flex,
    LinkBox as ChakraLink,
    Stack,
    Text,
    TextProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import { MouseEventHandler, PropsWithChildren } from 'react';

interface LogoProps extends TextProps {
    href?: string;
}

const Logo: React.FC<LogoProps> = ({ children, href = '/', ...rest }) => {
    return (
        <ChakraLink as="button">
            <Link href={href}>
                <Text color="white" fontWeight="black" fontSize={20} {...rest}>
                    {children}
                </Text>
            </Link>
        </ChakraLink>
    );
};

interface MenuToggleProps extends ButtonProps {
    isOpen: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({
    onClick,
    isOpen,
    ...rest
}) => {
    return (
        <Button
            display={{ base: 'block', md: 'none' }}
            onClick={onClick}
            {...rest}
        >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
    );
};

interface NavItemProps extends PropsWithChildren {
    to: string;
    onClick: MouseEventHandler;
}

const NavItem: React.FC<NavItemProps> = ({ children, to, onClick }) => {
    return (
        <Link href={to}>
            <a>
                <Button onClick={onClick} variant="ghost">
                    {children}
                </Button>
            </a>
        </Link>
    );
};

const NavBarContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            as="nav"
            justifyContent="center"
            position="absolute"
            top={0}
            right={0}
            width="100%"
            bg={{ base: 'whiteAlpha.200', md: 'transparent' }}
            zIndex={3}
        >
            <Flex
                flexGrow={1}
                align="center"
                justify="space-between"
                wrap="wrap"
                py={5}
                px={{ base: 4, xl: 0 }}
                maxW="container.xl"
            >
                {children}
            </Flex>
        </Flex>
    );
};

interface MenuLinksContainerProps extends PropsWithChildren {
    isOpen: boolean;
}

const MenuLinksContainer: React.FC<MenuLinksContainerProps> = ({
    children,
    isOpen,
}) => {
    return (
        <Box
            display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
        >
            <Stack
                spacing={4}
                align="center"
                justify={{ base: 'center', md: 'flex-end' }}
                direction={{ base: 'column', md: 'row' }}
                pt={{ base: 4, md: 0 }}
            >
                {children}
            </Stack>
        </Box>
    );
};

export { MenuLinksContainer, NavBarContainer, NavItem, MenuToggle, Logo };
