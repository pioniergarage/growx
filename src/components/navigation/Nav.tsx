import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
    BoxProps, Button, ButtonProps,
    chakra,
    Flex,
    shouldForwardProp,
    useBreakpointValue
} from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
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
        lg: {
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
            display={{ base: 'flex', lg: 'none' }}
            onClick={onClick}
            className="tap-highlight-transparent"
            variant="ghost"
            {...rest}
        >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
    );
};

const ChakraBox = chakra(motion.header, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) =>
        isValidMotionProp(prop) || shouldForwardProp(prop),
});

const TopNavBar: React.FC<PropsWithChildren & { alpha: number }> = ({
    children,
    alpha,
}) => {
    return (
        <ChakraBox
            className="flex"
            justifyContent="center"
            position="sticky"
            top={0}
            width="100%"
            zIndex={5}
            sx={{ backgroundColor: `rgba(0,0,0,${alpha})` }}
            initial={{ y: '-200%' }}
            animate={{ y: 0 }}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore no problem in operation, although type error appears.
            transition={{ delay: 0.5, type: 'tween' }}
        >
            <Flex
                as="nav"
                flexGrow={1}
                align="center"
                wrap="wrap"
                py={2}
                pr={4}
                pl={4}
                px={{ base: undefined, lg: 6 }}
                maxW="container.xl"
                overflowX="hidden"
                gap={4}
            >
                {children}
            </Flex>
        </ChakraBox>
    );
};

const MobileMenuButton = (
    props: PropsWithChildren & { href: string; icon?: JSX.Element }
) => {
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
                color={
                    router.asPath.endsWith(props.href) ? 'primary' : undefined
                }
                px={6}
                py={4}
                fontWeight="semibold"
                alignItems="center"
                gap={2}
            >
                {props.icon}
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

export { DesktopMenuButton, GrowLogo, MenuToggle, MobileMenuButton, TopNavBar };

