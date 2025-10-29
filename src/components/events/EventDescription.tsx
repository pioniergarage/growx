import { VStack, HStack, Text } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import KickoffCTA from '@/components/KickoffCTA';

type EventDescriptionProps = {
    description: string;
    today: Date;
    event: GrowEvent;
};

const EventDescription = ({ description, today, event }: EventDescriptionProps) => (
    <VStack alignItems='flex-start'>
        <Text>{description}</Text>
        <HStack padding={5} alignItems='center' justifyContent='center'>
            <KickoffCTA today={today} kickoff={event} />
        </HStack>
        <Text>
            <p>
                10 teams, each with a groundbreaking idea, compete for one grand prize. It's time for the GROW final and the stakes are high.
            </p>
            <p>
                Who will rise to the top? Join us at the GROW finale and witness the next big thing in innovation!
            </p>
        </Text>
    </VStack>
);

export default EventDescription;