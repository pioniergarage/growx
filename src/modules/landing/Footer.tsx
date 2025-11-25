import { Box, Divider, Flex, Icon, Image, Link, Spacer, Text } from '@chakra-ui/react';
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
                <Flex gap={6} alignItems="center">
                    <Link href="https://pioniergarage.de">
                        <Image
                            src="/images/pg.webp"
                            alt="Pioniergarage"
                            height="3rem"
                            objectFit="contain"
                        />
                    </Link>

                    <Flex flexDir="column" color="gray.300">
                        <NextLink href="/#faqs" legacyBehavior>
                            <Link>FAQ</Link>
                        </NextLink>
                        <Link href="mailto:grow@pioniergarage.de">Contact</Link>
                        <Link href="https://pioniergarage.de/impressum/">
                            Impressum
                        </Link>
                    </Flex>

                </Flex>

                <Flex
                    gap={4}
                    alignItems="center"
                    justifyContent="center"
                    flexDirection='column'
                    mt={10}
                >
                    <Text fontSize="xl">
                        Follow us!
                    </Text>

                    <Flex gap={10}
                        alignItems="center"
                        position="relative"
                        justifyContent="center"
                        flexDirection='row'
                        mb='0'
                    >
                        <Link href="https://www.instagram.com/pioniergarage_ev/">
                            <Box
                                maxW="container.xl"
                                top={0}
                                w="100%"
                                h="100%"
                                position="absolute"
                                zIndex={-10}
                            >
                                <Box
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    bgGradient="linear-gradient(128.16deg, #ffffff 8.06% , #5557f777 83.26%)"
                                    borderRadius="50%"
                                    filter="blur(35px)"
                                />
                            </Box>
                            <Image
                                height="2rem"
                                src="/images/icons/instagram.svg"
                                alt="Pioniergarage Instagram"
                                objectFit="contain"
                            />
                        </Link>
                        <Link href="https://chat.whatsapp.com/L3wQLnRULEb33YkFGS1pDx">
                            <Image
                                height="2rem"
                                src="/images/icons/whatsapp.svg"
                                alt="Pioniergarage WhatsApp"
                                objectFit="contain"
                            />
                        </Link>
                        <Link href="https://linkedin.com/company/pioniergarage">
                            <Image
                                height="2rem"
                                src="/images/icons/linkedin.png"
                                alt="Pioniergarage LinkedIn"
                                objectFit="contain"
                            />
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
                    <Box color="primary">{"GROW 24/25"}</Box>
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