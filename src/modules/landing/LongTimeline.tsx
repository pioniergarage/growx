import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Flex, Heading, Link, Stack, VStack } from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useRegistrationsOfUser } from 'modules/events/hooks';

import { GrowEvent } from 'modules/events/types';
import { useProfile } from 'modules/profile/hooks';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { getSeason } from 'utils/formatters';

interface LongTimelineProps {
    events: GrowEvent[];
    kickoffDate: Date;
    title?: string;
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events, kickoffDate, title }) => {
    const season = getSeason(kickoffDate);
    const past_season = getSeason(kickoffDate, 1);
    const { profile } = useProfile();

    const { registrations } = useRegistrationsOfUser(profile?.userId);

    const isLoggedIn = !!profile?.userId;


    const pastEvents = events.filter(
        (event) => event.date < kickoffDate
    );

    const currentEvents = events.filter(
        (event) => event.date >= kickoffDate
    );

    return (
        <Box>
            <VStack maxW="3xl" alignItems='stretch' mx="auto">
                <Stack
                    w="full"
                    direction={{ base: "column", md: "row" }}
                    align="space-between"
                    justify="space-between"
                    mb={4}
                    spacing={{ base: 2, md: 0 }}
                >
                    <Heading>{title ?? "Timeline"} {season}</Heading>

                    <Link href="webcal://grow.pioniergarage.de/grow_calendar.ics">
                        <Button className="flex items-center gap-2">
                            <FaRegCalendarPlus />
                            Subscribe to Calendar
                        </Button>
                    </Link>
                </Stack>
                <VStack gap={4} alignItems="stretch" mb={4}>
                    {currentEvents.map(event => (
                        <GrowEventCard key={event.id} event={event} registration={
                            isLoggedIn
                                ? registrations?.find(
                                    (r) => r.eventId === event.id
                                )
                                : undefined
                        } />
                    ))}

                    {currentEvents.length < 3 &&
                        <Flex opacity={0.5} justifyContent='center'>
                            <p> Stay tuned for more...</p>
                        </Flex>
                    }
                </VStack>
                <Divider />
                <Accordion allowToggle pb='0'>
                    <AccordionItem border="none">
                        <VStack alignItems='center'>
                            <AccordionButton>
                                <Box as="span" flex="1" textAlign="left" maxWidth='1xl'>
                                    Past Events: {past_season}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </VStack>
                        <AccordionPanel padding='0'>
                            <VStack gap={4} alignItems="stretch" pb='8'>
                                {pastEvents.map(event => (
                                    <GrowEventCard key={event.id} event={event} registration={
                                        isLoggedIn
                                            ? registrations?.find(
                                                (r) => r.eventId === event.id
                                            )
                                            : undefined
                                    } />
                                ))}
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </VStack >
        </Box>

    );
};

export default LongTimeline;
