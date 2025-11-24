import { Heading, SimpleGrid, Spacer, VStack } from '@chakra-ui/react';
import { TimelineItem, TimeLineItemProps } from 'modules/landing/ShortTimeline';

type LaterEventsProps = {
    previousEvents: TimeLineItemProps[];
    laterEvents: TimeLineItemProps[];
};

const OtherGrowEvents = ({ previousEvents, laterEvents }: LaterEventsProps) => (
    <VStack alignItems='flex-start' width='100%'>
        {previousEvents.length > 0 && (
            <Heading size="md">Previous Events</Heading>
        )}

        <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
            {previousEvents.map((event) => (
                <TimelineItem {...event} key={event.title} />
            ))}
        </SimpleGrid>

        <Spacer mb={2} />

        {laterEvents.length > 0 && (
            <Heading size="md">Later Events</Heading>
        )}

        <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
            {laterEvents.map((event) => (
                <TimelineItem {...event} key={event.title} />
            ))}
        </SimpleGrid>
    </VStack>
);

export default OtherGrowEvents;