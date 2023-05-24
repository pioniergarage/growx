import { Heading, VStack } from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';

import { GrowEvent } from 'modules/events/types';

interface LongTimelineProps {
    events: GrowEvent[];
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events }) => {
    return (
        <VStack gap={4}>
            <Heading>Timeline 22/23 - LAST TIME</Heading>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                {events.map((event) => (
                    <GrowEventCard key={event.id} event={event} />
                ))}
            </VStack>
        </VStack>
    );
};

export default LongTimeline;
