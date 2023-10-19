import { Heading, VStack } from '@chakra-ui/react';

import { GrowEvent } from 'modules/events/types';

interface LongTimelineProps {
    events_previous: GrowEvent[];
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events_previous }) => {
    return (
        <VStack gap={4}>
            <Heading>Timeline 22/23 </Heading>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                <p>coming soon...</p>
                {/*                 {events_previous.map((event) => (
                    <GrowEventCard key={event.id} event={event} />
                ))} */}
            </VStack>
        </VStack>
    );
};

export default LongTimeline;
