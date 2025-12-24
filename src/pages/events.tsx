import {
    Box,
    VStack,
} from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import LongTimeline from 'modules/landing/LongTimeline';
import TimelinePlaceholder from 'modules/landing/Timeline_placeholder';
import { getSeasonFromFinal } from 'utils/formatters';

const EventsPage = () => {
    const { events } = useGrowEvents();
    const kickoff: GrowEvent = events.filter((e) => e.ref == 'kickoff')[0]
    return (
        <Box>
            <VStack alignItems="stretch" gap={2}>
                {
                    events.length > 3 ?
                        <LongTimeline events={events} kickoffDate={kickoff.date} title='Events' />
                        :
                        <TimelinePlaceholder season={kickoff && getSeasonFromFinal(kickoff.date)} />
                }
            </VStack>
        </Box>
    );
};

export default EventsPage;
