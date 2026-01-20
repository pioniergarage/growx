import { Box, Spacer, Text, VStack } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import EventCTA from '../EventCTA';

type EventDescriptionProps = {
  description: string;
  today: Date;
  event: GrowEvent; // das Seiten-Event (midterm/final/…)
  event_start: Date;
  CTA_text?: string;
};

function EventDescription({
  description,
  today,
  event,
  event_start,
  CTA_text,
}: EventDescriptionProps) {
  return (
    <VStack
      alignItems="flex-start"
      alignContent="center"
      gap="0.5em"
      maxW={{ md: '60%' }}
      flex="2"
    >
      {description.split('\n').map((paragraph, key) => (
        <Text key={key}>{paragraph}</Text>
      ))}
      <Spacer mt="1em"></Spacer>
      {CTA_text && (
        <EventCTA
          today={today}
          event={event}
          start={event_start}
          text={CTA_text}
        />
      )}
      <Box mx="auto" maxW="container.xl" flex="1">
        <GrowEventVideo event={event} />
      </Box>
    </VStack>
  );
}

export default EventDescription;
