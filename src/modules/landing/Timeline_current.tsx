import { Heading, VStack } from '@chakra-ui/react';
import GrowEventCard from 'modules/events/components/GrowEventCard';

import { GrowEvent } from 'modules/events/types';
import { getCurrentSeason } from 'utils/formatters';

interface LongTimelineProps {
    events: GrowEvent[];
    kickoffDate: Date
}

const LongTimeline: React.FC<LongTimelineProps> = ({ events, kickoffDate }) => {
    const season = getCurrentSeason(kickoffDate);
    return (
        <VStack gap={4}>
            <Heading>Timeline {season}</Heading>
            <p>New for 2024: All workshops are now open to the public!</p>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                {events.map((event) => (
                    <GrowEventCard key={event.id} event={event} />
                ))}
            </VStack>
        </VStack>
    );
};

export default LongTimeline;
