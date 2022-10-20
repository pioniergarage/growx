import { Button } from '@chakra-ui/button';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    ButtonProps,
    Center,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const Logo = () => {
    const size = useBreakpointValue({
        base: {
            width: 128 / 2,
            height: 27 / 2,
        },
        sm: {
            width: (128 * 2) / 3,
            height: (27 * 2) / 3,
        },
        md: {
            width: 128,
            height: 27,
        },
    });
    return (
        <Link href="/" passHref>
            <Center as="a">
                <Image
                    alt="Grow Logo"
                    src="/images/GROW.png"
                    layout="fixed"
                    width={size?.width || 128 / 2}
                    height={size?.height || 27 / 2}
                />
            </Center>
        </Link>
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
                py={4}
                px={4}
                maxW="container.xl"
                overflowX="hidden"
            >
                {children}
            </Flex>
        </Flex>
    );
};

export { NavBarContainer, MenuToggle, Logo };
