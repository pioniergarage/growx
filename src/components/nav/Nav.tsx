import Link from 'next/link';
import {
    Box,
    Text,
    Flex,
    Stack,
    LinkBox as ChakraLink,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import { MouseEventHandler, PropsWithChildren } from 'react';

export function Logo({children, href = '/'}: PropsWithChildren & {href?: string}) {
    return (
        <ChakraLink as="button">
            <Link href={href}>
                <Text color="white" fontWeight="black" fontSize={20}>
                    {children}
                </Text>
            </Link>
        </ChakraLink>
    );
}

export function MenuToggle({
    onClick,
    isOpen,
}: PropsWithChildren & {
    onClick: MouseEventHandler<HTMLButtonElement>;
    isOpen: boolean;
}) {
    return (
        <Button display={{ base: 'block', md: 'none' }} onClick={onClick}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
    );
}

export function NavItem({
    children,
    to,
    onClick,
}: PropsWithChildren & { to: string; onClick: MouseEventHandler }) {
    return (
        <Link href={to}>
            <a>
                <Button onClick={onClick} variant="ghost">
                    {children}
                </Button>
            </a>
        </Link>
    );
}

export function NavBarContainer({ children }: PropsWithChildren) {
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
}

export function MenuLinksContainer({
    children,
    isOpen,
}: PropsWithChildren & { isOpen: boolean }) {
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
}

