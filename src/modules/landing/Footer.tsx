import { Box, Divider, Flex, Icon, Image, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <>
            <Flex
                direction="column"
                as="footer"
                alignItems="center"
                p={6}
                mx="auto"
                maxW="container.xl"
            >
                <Divider mb={8} />
                <Flex gap={6}>
                    <Link href="https://pioniergarage.de">
                        <Image
                            src="https://pioniergarage.de/wp-content/uploads/2020/07/LogoMitNameUndSlogan-wei%C3%9F-e1597431426811.png"
                            alt="Grow Pioniergarage"
                            width="12rem"
                            objectFit="contain"
                        />
                    </Link>
                    <Flex flexDir="column" color="gray.300">
                        <NextLink href="/#faqs">
                            <Link>FAQ</Link>
                        </NextLink>
                        <Link href="mailto:grow@pioniergarage.de">Contact</Link>
                        <Link href="https://pioniergarage.de/impressum/">
                            Impressum
                        </Link>
                    </Flex>
                </Flex>
                <Flex
                    flexDir="column"
                    mt={10}
                    alignItems="center"
                    color="gray.400"
                >
                    <Box color="primary">Made by</Box>
                    <Flex ml={4} gap={3}>
                        <Link href="https://github.com/nimalu001">
                            <Icon as={FaGithub} mr={1} />
                            Niklas
                        </Link>
                        <Link href="https://github.com/KanseiHara">
                            <Icon as={FaGithub} mr={1} />
                            Kansei
                        </Link>
                        <Link href="https://github.com/JonasDeipenbrock">
                            <Icon as={FaGithub} mr={1} />
                            Jonas
                        </Link>
                    </Flex>
                    <Spacer mb={2} />
                    <Box color="primary">{"GROW '24"}</Box>
                    <Flex ml={4} gap={3}>
                        <Link href="https://github.com/hudmarc">
                            <Icon as={FaGithub} mr={1} />
                            Marc
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
