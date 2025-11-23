import { Box, Divider, Flex, Icon, Image, Link, Spacer, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <>
            <Flex
                direction="column"
                as="footer"
                p={6}
                mx="auto"
                maxW="container.xl"
            >
                <Divider mb={8} />

                {/* --- 3-Spalten Bereich: Left | Center | Right --- */}
                <Flex
                    w="100%"
                    align="flex-start"
                    position="relative"
                    direction={{ base: 'column', md: 'row' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    gap={{ base: 10, md: 0 }}
                >
                    {/* Right: Follow us + Social Icons - auf Mobile zuerst */}
                    <Flex
                        gap={4}
                        align="center"
                        justify="center"
                        direction="column"
                        position={{ md: 'absolute' }}
                        right={{ md: 0 }}
                        w={{ base: '100%', md: 'auto' }}
                        order={{ base: 1, md: 3 }}
                    >
                        <Text fontSize="xl" textAlign="center">
                            Follow us!
                        </Text>

                        <Flex
                            gap={10}
                            align="center"
                            justify="center"
                            position="relative"
                        >
                            <Box
                                position="absolute"
                                inset={0}
                                zIndex={-1}
                                maxW="container.xl"
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

                            <Link href="https://www.instagram.com/pioniergarage_ev/" isExternal>
                                <Image
                                    height="2rem"
                                    src="/images/icons/instagram.svg"
                                    alt="Pioniergarage Instagram"
                                    objectFit="contain"
                                    _hover={{ transform: "scale(1.2)", color: "#f09433" }}
                                />
                            </Link>
                            <Link href="https://chat.whatsapp.com/L3wQLnRULEb33YkFGS1pDx" isExternal>
                                <Image
                                    height="2rem"
                                    src="/images/icons/whatsapp.svg"
                                    alt="Pioniergarage WhatsApp"
                                    objectFit="contain"
                                    _hover={{ transform: "scale(1.2)", color: "#f09433" }}

                                />
                            </Link>
                            <Link href="https://linkedin.com/company/pioniergarage" isExternal>
                                <Image
                                    height="2rem"
                                    src="/images/icons/linkedin.png"
                                    alt="Pioniergarage LinkedIn"
                                    objectFit="contain"
                                    filter="brightness(0) invert(1)"
                                    _hover={{ transform: "scale(1.2)", color: "#f09433" }}
                                />
                            </Link>
                        </Flex>
                    </Flex>

                    {/* Center: Made by - auf Mobile in der Mitte */}
                    <Flex
                        flexDir="column"
                        align="center"
                        color="gray.400"
                        justify="center"
                        position={{ md: 'absolute' }}
                        left={{ md: '50%' }}
                        transform={{ md: 'translateX(-50%)' }}
                        w={{ base: '100%', md: 'auto' }}
                        order={{ base: 2, md: 2 }}
                    >
                        <Box color="primary" mb={1}>Made by</Box>
                        <Flex gap={3}>
                            <Link href="https://github.com/nimalu001" isExternal>
                                <Icon as={FaGithub} mr={1} />
                                Niklas
                            </Link>
                            <Link href="https://github.com/KanseiHara" isExternal>
                                <Icon as={FaGithub} mr={1} />
                                Kansei
                            </Link>
                            <Link href="https://github.com/JonasDeipenbrock" isExternal>
                                <Icon as={FaGithub} mr={1} />
                                Jonas
                            </Link>
                        </Flex>
                        <Spacer mb={2} />
                        <Box color="primary">{"GROW 24/25"}</Box>
                        <Flex gap={3}>
                            <Link href="https://github.com/hudmarc" isExternal>
                                <Icon as={FaGithub} mr={1} />
                                Marc
                            </Link>
                        </Flex>
                    </Flex>

                    {/* Left: Pioniergarage + Footer-Links */}
                    <Flex
                        gap={6}
                        align="center"
                        justify={{ base: 'center', md: 'flex-start' }}
                        position={{ md: 'absolute' }}
                        left={{ md: 0 }}
                        w={{ base: '100%', md: 'auto' }}
                        order={{ base: 3, md: 1 }}
                        direction={{ base: 'column-reverse', md: 'row' }}
                    >
                        <Link href="https://pioniergarage.de" isExternal>
                            <Image
                                src="/images/pg.webp"
                                alt="Pioniergarage"
                                height="3rem"
                                objectFit="contain"
                            />
                        </Link>

                        <Flex flexDir="column" color="gray.300" gap={1}>
                            <NextLink href="/#faqs" legacyBehavior>
                                <Link>FAQ</Link>
                            </NextLink>
                            <Link href="mailto:grow@pioniergarage.de">Contact</Link>
                            <Link href="https://pioniergarage.de/impressum/" isExternal>
                                Impressum
                            </Link>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}