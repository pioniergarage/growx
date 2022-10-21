import { Heading, VStack } from '@chakra-ui/react';

import TimelineEvent from 'modules/events/components/TimelineEvent';
import { GrowEvent } from 'modules/events/types';

interface LongTimelineProps {
    events: GrowEvent[];
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events }) => {
    return (
        <VStack gap={4}>
            <Heading>Timeline</Heading>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                {events.map((event) => (
                    <TimelineEvent key={event.id} event={event} />
                ))}
            </VStack>
        </VStack>
    );
};

export default LongTimeline;