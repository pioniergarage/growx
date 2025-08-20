import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, VStack } from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';

import { GrowEvent } from 'modules/events/types';
import { getCurrentSeason } from 'utils/formatters';

interface LongTimelineProps {
    events: GrowEvent[];
    kickoffDate: Date
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events, kickoffDate }) => {
    const season = getCurrentSeason(kickoffDate);

    const pastEvents = events.filter(
        (event) => event.date < kickoffDate
    );

    const currentEvents = events.filter(
        (event) => event.date >= kickoffDate
    );

    return (
        <Box>
            {/* Why is this Vstack pushed all the way to the left of the parent box? */}
            <VStack maxW="3xl" alignItems='stretch' mx="auto">
                <VStack alignItems='center'>
                    <Heading>Timeline {season}</Heading>
                    <p>See something interesting? All workshops are now open to the public!</p>
                </VStack>
                <Accordion allowToggle>
                    <AccordionItem border="none">
                        <VStack alignItems='stretch'>
                            <h2>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left" maxWidth='1xl'>
                                        Past Events
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

                <VStack gap={4} alignItems="stretch">
                    {currentEvents.map(event => (
                        <GrowEventCard key={event.id} event={event} />
                    ))}

                </VStack>

            </VStack >
        </Box>

    );
};

export default LongTimeline;
