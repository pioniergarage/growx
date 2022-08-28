import { Heading, VStack } from '@chakra-ui/react';
import { GrowEvent } from 'model';
import TimelineEvent from '../events/TimelineEvent';

interface LongTimelineProps {
    events: GrowEvent[];
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events }) => {
    return (
        <VStack gap={4} mx={6}>
            <Heading>Timeline</Heading>
            <VStack gap={4} alignItems="stretch" maxW="xl">
                {events.map((event) => (
                    <TimelineEvent key={event.id} event={event} />
                ))}
            </VStack>
        </VStack>
    );
};

export default LongTimeline;
