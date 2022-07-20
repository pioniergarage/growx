import Link from "next/link";
import BurgerIcon from "icons/BurgerIcon";
import {
  Box,
  Text,
  Flex,
  Stack,
  Container,
  useColorMode,
  LinkBox as ChakraLink,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import { MouseEventHandler, PropsWithChildren, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";

function Logo() {
  return (
    <ChakraLink as="button">
      <Link href="/">
        <Text color="white" fontWeight="black" fontSize={20}>
          GROW X
        </Text>
      </Link>
    </ChakraLink>
  );
}

function MenuToggle({
  onClick,
  isOpen,
}: PropsWithChildren & {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
}) {
  return (
    <Button display={{ base: "block", md: "none" }} onClick={onClick}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Button>
  );
}

function MenuItem({
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

function NavBarContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      as="nav"
      justifyContent="center"
      position="absolute"
      top={0}
      right={0}
      width="100%"
      bg={{ base: "whiteAlpha.200", md: "transparent" }}
      zIndex={3}
    >
      <Flex
        flexGrow={1}
        align="center"
        justify="space-between"
        wrap="wrap"
        py={5}
        px={[4, 4, 4, 4, 0]}
        maxW="container.xl"
      >
        {children}
      </Flex>
    </Flex>
  );
}

function MenuLinksContainer({
  children,
  isOpen,
}: PropsWithChildren & { isOpen: boolean }) {
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
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer>
      <Logo />
      <MenuToggle onClick={toggle} isOpen={isOpen} />
      <MenuLinksContainer isOpen={isOpen}>
        <MenuItem onClick={toggle} to="/faq">
          FAQ
        </MenuItem>
        <MenuItem onClick={toggle} to="/timeline">
          Timeline
        </MenuItem>
      </MenuLinksContainer>
    </NavBarContainer>
  );
}
