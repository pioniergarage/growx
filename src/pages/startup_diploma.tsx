import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    Image,
    Link as NuxtLink,
    Text,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';

const StartupDiplomaPage = () => {
    return (
        <>
            <VStack alignItems="stretch" gap={8} maxW="container.xl" mx="auto">
                <Box>
                    <Heading size="sm">For KIT-Students only</Heading>
                    <Text>
                        Together with HoC and EnTechnon, we can offer you this
                        year&apos;s&nbsp;
                        <Text as="span" color="secondary" fontWeight="bold">
                            2 ECTS
                        </Text>
                        &nbsp; as an interdisciplinary qualification for your
                        participation in GROW!
                    </Text>
                </Box>

                <VStack gap={4} alignItems="start">
                    <Heading>Your Startup Diploma</Heading>
                    <Image
                        mt={10}
                        src="https://www.hoc.kit.edu/img/Perspektivenlabor/STARTUP%20DIPLOMA/neue%20Dateien%20September/startup%20diploma_schaubilder2.png"
                        alt="info graphic"
                        objectFit="contain"
                    />
                    <Flex flexDir="column" gap={4}>
                        <Heading size="md">
                            You are thinking about starting your own business?
                        </Heading>
                        <Heading size="md">
                            You are looking for impulses from experienced
                            experts to learn the necessary tools for your
                            startup process?
                        </Heading>
                        <Heading size="md">
                            You want your startup to be value-driven and
                            successful?
                        </Heading>
                    </Flex>
                    <Text>
                        Then this is the right place for you! All KIT students
                        participating in the student startup competition »GROW«
                        of PionierGarage e.V. have the opportunity to go through
                        a special training format, the successful completion of
                        which is rewarded with the &quot;Startup
                        Diploma&quot;certificate.
                    </Text>
                    <Text>
                        The »Startup Diploma« is awarded for successful
                        engagement with startup ideas. Workshops and pitches in
                        the student founding contest »GROW« and selected courses
                        at House of Competence (HoC) combine necessary business
                        know-how with the awareness of a healthy and
                        future-oriented attitude. PionierGarage e.V., EnTechnon
                        and HoC pursue a common goal: to provide students with
                        the necessary tools to realise their startup idea
                        successfully.
                    </Text>
                    <VStack alignItems="start">
                        <Flex flexWrap="wrap">
                            <Text as="span" fontWeight="bold" mr={2}>
                                For more information:
                            </Text>
                            <Link
                                href="https://www.hoc.kit.edu/startupdiploma-en.php"
                                passHref
                            >
                                <NuxtLink
                                    isExternal
                                    color="primary"
                                    wordBreak="break-word"
                                >
                                    https://www.hoc.kit.edu/startupdiploma-en.php
                                    <ExternalLinkIcon mx="2px" />
                                </NuxtLink>
                            </Link>
                        </Flex>
                        <Flex flexWrap="wrap">
                            <Text as="span" fontWeight="bold" mr={2}>
                                For registration @ HoC:
                            </Text>
                            <Link
                                href="https://studium.hoc.kit.edu/index.php/veranstaltungsdetailssp5/?id=795f3115-495a-42a7-a80c-9bf3406de2b2"
                                passHref
                            >
                                <NuxtLink
                                    isExternal
                                    color="primary"
                                    wordBreak="break-word"
                                >
                                    https://studium.hoc.kit.edu/index.php/veranstaltungsdetailssp5/?id=795f3115-495a-42a7-a80c-9bf3406de2b2
                                    <ExternalLinkIcon mx="2px" />
                                </NuxtLink>
                            </Link>
                        </Flex>
                        <Text>
                            <Text as="span" fontWeight="bold" mr={2}>
                                Please note:
                            </Text>
                            You also must register on the grow.pioniergarage.de
                            website during the registration process.
                        </Text>
                        <Text>
                            <Text as="span" fontWeight="bold" mr={2}>
                                Still have a question?
                            </Text>
                            Feel free to contact us at grow@pioniergarage.de
                        </Text>
                    </VStack>
                </VStack>
            </VStack>
        </>
    );
};

export default StartupDiplomaPage;
