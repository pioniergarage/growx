import { VStack, Heading, SimpleGrid } from '@chakra-ui/react';
import { TimelineItem, TimeLineItemProps } from 'modules/landing/ShortTimeline';

type LaterEventsProps = {
    events: TimeLineItemProps[];
};

const LaterEvents = ({ events }: LaterEventsProps) => (
    <VStack alignItems='flex-start' width='100%'>
        <Heading size="md">Later Events</Heading>
        <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
            {events.map((event) => (
                <TimelineItem {...event} key={event.title} />
            ))}
        </SimpleGrid>
    </VStack>
);

export default LaterEvents;