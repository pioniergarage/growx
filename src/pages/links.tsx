import LinkListItem from '@/components/LinkListItem';
import {
    Heading,
    SimpleGrid,
    Spacer,
    VStack
} from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { useEffect, useState } from 'react';

// TODO: this should fetch the link to the final by index from a "Links" table on the database.
const links = [
    { id: 1, title: 'GROW Final 24/25', href: 'https://pretix.eu/GROW/Final/', img: "/images/icons/grow.png" },
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
                    {links.map((link, index) => (
                        <LinkListItem
                            link={link}
                            key={index}
                        />
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
