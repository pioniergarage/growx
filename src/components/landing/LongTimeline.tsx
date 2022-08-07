import { Heading, VStack } from '@chakra-ui/react';
import { GrowEvent } from 'types';
import TimelineEvent from './TimelineEvent';



export default function LongTimeline({ events }: { events: GrowEvent[] }) {
    return (
        <VStack gap={4} mx={6}>
            <Heading>Timeline</Heading>
            <VStack gap={4} alignItems="start" maxW="xl">
                {events.map((event) => (
                    <TimelineEvent key={event.id} {...event} />
                ))}
            </VStack>
        </VStack>
    );
}
