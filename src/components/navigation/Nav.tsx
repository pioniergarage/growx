import { Button } from '@chakra-ui/button';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    ButtonProps,
    Flex,
    LinkBox as ChakraLink,
    Text,
    TextProps,
} from '@chakra-ui/react';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface LogoProps extends TextProps {
    href?: string;
}

const Logo: React.FC<LogoProps> = ({ children, href = '/', ...rest }) => {
    return (
        <ChakraLink as="button">
            <Link href={href}>
                <Text color="white" fontWeight="black" fontSize={{base: 16, md: 20}} {...rest}>
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

const NavBarContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            as="header"
            justifyContent="center"
            position="absolute"
            top={0}
            right={0}
            width="100%"
            bg={{ base: 'blackAlpha.300', md: 'transparent' }}
            zIndex={3}
        >
            <Flex
                as="nav"
                flexGrow={1}
                align="center"
                justify="space-between"
                wrap="wrap"
                py={3}
                px={4}
                maxW="container.xl"
            >
                {children}
            </Flex>
        </Flex>
    );
};

export { NavBarContainer, MenuToggle, Logo };
