import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Divider, Flex, Heading, HStack, Link, Text, VStack } from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';

import { GrowEvent } from 'modules/events/types';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { getSeason } from 'utils/formatters';

interface LongTimelineProps {
    events: GrowEvent[];
    kickoffDate: Date
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events, kickoffDate }) => {
    const season = getSeason(kickoffDate);
    const past_season = getSeason(kickoffDate, 1);

    const pastEvents = events.filter(
        (event) => event.date < kickoffDate
    );

    const currentEvents = events.filter(
        (event) => event.date >= kickoffDate
    );

    return (
        <Box>
            <VStack maxW="3xl" alignItems='stretch' mx="auto">
                <HStack w="full" justifyContent="center" position="relative" mb={4}>
                    <Text textAlign="center" flex="1">
                        <Heading>Timeline {season} </Heading>
                        All workshops open to the public!
                    </Text>

                    <Link href="webcal://grow.pioniergarage.de/grow_calendar.ics" position="absolute" right="0">
                        <Button className="flex items-center gap-2">
                            <FaRegCalendarPlus />
                            <span>Add to Calendar</span>
                        </Button>
                    </Link>
                </HStack>
                <VStack gap={4} alignItems="stretch" mb={4}>
                    {currentEvents.map(event => (
                        <GrowEventCard key={event.id} event={event} />
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
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" maxWidth='1xl'>
                                        Past Events: {past_season}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                        </VStack>
                        <AccordionPanel padding='0'>
                            <VStack gap={4} alignItems="stretch" pb='8'>
                                {pastEvents.map(event => (
                                    <GrowEventCard key={event.id} event={event} />
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
