import { HStack, Text, VStack } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import EventCTA from '../EventCTA';

type EventDescriptionProps = {
  description: string;
  today: Date;
  event: GrowEvent; // das Seiten-Event (midterm/final/…)
  kickoff?: GrowEvent | null; // explizit das Kickoff-Event
};

const EventDescription = ({
  description,
  today,
  kickoff,
}: EventDescriptionProps) => (
  <VStack alignItems="flex-start">
    <Text>{description}</Text>
    <HStack p={5} alignItems="center" justifyContent="center">
      {kickoff && <EventCTA today={today} event={kickoff} text={''} />}
    </HStack>
    {/* … */}
  </VStack>
);

export default EventDescription;
