import { VStack, HStack, Text } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import KickoffCTA from '@/components/KickoffCTA';

type EventDescriptionProps = {
  description: string;
  today: Date;
  event: GrowEvent;           // das Seiten-Event (midterm/final/…)
  kickoff?: GrowEvent | null; // explizit das Kickoff-Event
};


const EventDescription = ({ description, today, event, kickoff }: EventDescriptionProps) => (
  <VStack alignItems="flex-start">
    <Text>{description}</Text>
    <HStack p={5} alignItems="center" justifyContent="center">
      {kickoff && <KickoffCTA today={today} kickoff={kickoff} />}
    </HStack>
    {/* … */}
  </VStack>
);

export default EventDescription;