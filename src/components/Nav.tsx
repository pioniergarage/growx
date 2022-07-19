import Link from "next/link";
import BurgerIcon from "icons/BurgerIcon";
import { Box, Text, Flex, Stack, Container, useColorMode } from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Button } from "@chakra-ui/button";
import { MouseEventHandler, PropsWithChildren, useState } from "react";

function Logo({ children }: PropsWithChildren) {
    return (
        <Box>
            <Text fontSize="lg" fontWeight="bold">{children}</Text>
        </Box>
    )
}

function MenuToggle({ onClick, isOpen }: PropsWithChildren & { onClick: MouseEventHandler<HTMLButtonElement>, isOpen: boolean }) {
    return (
        <Button display={{ base: "block", md: "none" }} onClick={onClick}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Button>
    )
}

function MenuItem({ children, to }: PropsWithChildren & { to: string }) {
    return (
        <Link href={to}>
            <a>
                <Button
                    variant="ghost"
                >
                    {children}
                </Button>
            </a>
        </Link>
    )
}

function NavBarContainer({ children }: PropsWithChildren) {
    return (
        <Flex
            as="nav"
            justifyContent="center"
            bg="primary"
        >
            <Flex
                flexGrow={1}
                align="center"
                justify="space-between"
                wrap="wrap"
                py={3}
                px={[4, 4, 4, 4, 0]}
                maxW="container.xl"
            >
                {children}
            </Flex>
        </Flex>
    )
}

function MenuLinksContainer({ children, isOpen }: PropsWithChildren & { isOpen: boolean }) {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={4}
                align="center"
                justify={{ base: "center", md: "flex-end" }}
                direction={{ base: "column", md: "row" }}
                pt={{ base: 4, md: 0 }}
            >
                {children}
            </Stack>
        </Box>

    )
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    return (
        <NavBarContainer>
            <Logo>Grow</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <MenuItem to="/faq">FAQ</MenuItem>
                <MenuItem to="/timeline">Timeline</MenuItem>
            </MenuLinksContainer>
        </NavBarContainer>
    )
}
