import { Button } from '@chakra-ui/button';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    BoxProps,
    ButtonProps,
    Flex,
    useBreakpointValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

const GrowLogo = (boxProps: BoxProps) => {
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
            <Flex as="a" {...boxProps}>
                <Image
                    alt="Grow Logo"
                    src="/images/GROW.png"
                    layout="fixed"
                    width={size?.width || 128 / 2}
                    height={size?.height || 27 / 2}
                />
            </Flex>
        </Link>
    );
};

interface MenuToggleProps extends ButtonProps {
    isOpen?: boolean;
}

const MenuToggle: React.FC<MenuToggleProps> = ({
    onClick,
    isOpen,
    ...rest
}) => {
    return (
        <Button
            display={{ base: 'flex', md: 'none' }}
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
                wrap="wrap"
                py={4}
                pr={4}
                pl={2}
                px={{ base: undefined, md: 6 }}
                maxW="container.xl"
                overflowX="hidden"
                gap={2}
            >
                {children}
            </Flex>
        </Flex>
    );
};

const MobileMenuButton = (props: PropsWithChildren & { href: string }) => {
    const router = useRouter();

    return (
        <Link href={props.href} passHref>
            <Flex
                as="a"
                _hover={{
                    backgroundColor: 'whiteAlpha.200',
                }}
                _focus={{
                    backgroundColor: 'whiteAlpha.300',
                }}
                bgColor={
                    router.asPath.endsWith(props.href)
                        ? 'whiteAlpha.200'
                        : undefined
                }
                px={6}
                py={4}
                fontWeight="semibold"
            >
                {props.children}
            </Flex>
        </Link>
    );
};

const DesktopMenuButton = (props: PropsWithChildren & { href: string }) => {
    return (
        <Link href={props.href} passHref>
            <a>
                <Button variant="ghost">{props.children}</Button>
            </a>
        </Link>
    );
};

export {
    NavBarContainer,
    MenuToggle,
    GrowLogo,
    MobileMenuButton,
    DesktopMenuButton,
};
