import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Card,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    SimpleGrid,
    Spacer,
    VStack
} from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Sample link data
const links = [
    { id: 1, title: 'GROW Sign Up', href: 'https://form.jotform.com/242815674829065', img: "/images/GROW.png" },
    { id: 1, title: 'PionierGarage Site', href: 'https://www.pioniergarage.de/', img: "/images/icons/pg.png" },
    { id: 2, title: 'PionierGarage WhatsApp Group', href: 'https://chat.whatsapp.com/GuhNZppcwLz3ngxY79LcWb', img: "/images/icons/whatsapp.svg" },
    { id: 3, title: 'PionierGarage On LinkedIn', href: 'https://linkedin.com/company/pioniergarage', img: "/images/icons/linkedin.png" },
    { id: 4, title: 'PionierGarage On Instagram', href: 'https://www.instagram.com/pioniergarage_ev/', img: "/images/icons/instagram.svg" },
];

// Function to get the next upcoming event
const getNextUpcomingEvent = (events: GrowEvent[]) => {
    const now = new Date();
    return events
        .filter(event => event.date > now)
        .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
};

const LinkListPage = () => {
    const [nextEvent, setNextEvent] = useState<GrowEvent | null>(null);
    const { events } = useGrowEvents();

    useEffect(() => {
        const next = getNextUpcomingEvent(events);
        setNextEvent(next);
    }, [events]);

    return (
        <>
            <VStack>
                <Heading size="lg">@pioniergarage</Heading>
                <Spacer mb={4} />
            </VStack>
            <VStack alignItems="stretch" spacing={4}>
                <SimpleGrid columns={{ base: 1 }} spacing={12}>
                    {links.map((link) => (
                        <Link href={link.href} passHref key={link.id}>
                            <Card
                                as={Grid}
                                alignItems="left"
                                gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
                                px={3}
                                pt={4}
                                pb={3}
                                columnGap={{ base: 2, md: 4 }}
                                opacity={1}
                                cursor="pointer"
                                _hover={{ bgColor: 'whiteAlpha.100' }}
                                _focus={{ bgColor: 'whiteAlpha.200' }}
                            >
                                <Flex flexDir={{ base: 'column', md: 'row' }} gap={4}>
                                    <Image
                                        src={link.img}
                                        alt="Grow Pioniergarage"
                                        maxWidth="4rem"
                                        objectFit="contain"
                                    />
                                    <Box>
                                        <GridItem>
                                            <Heading size="md">{link.title}</Heading>
                                        </GridItem>
                                        <GridItem>
                                            <Button
                                                leftIcon={<ExternalLinkIcon />}
                                                size="sm"
                                                variant="link"
                                                onClick={() => { window.location.href = link.href }}
                                            >
                                                Go to Link
                                            </Button>
                                        </GridItem>
                                    </Box>
                                </Flex>

                            </Card>
                        </Link>
                    ))}
                </SimpleGrid>

                <Heading size="md">
                    Next Event
                </Heading>

                {nextEvent && (
                    <GrowEventCard event={nextEvent} />
                )}
            </VStack>
        </>
    );
};

export default LinkListPage;
