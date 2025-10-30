import { Box, Skeleton, Spacer, Text, VStack } from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import EventHero from '@/components/events/EventHero';
import EventDescription from '@/components/events/EventDescription';
import LinkListItem from '@/components/LinkListItem';

// ...existing FinalProps type...

const FinalLandingPage = (props: FinalProps) => {
  const { events, isLoading, error } = useGrowEvents();

  if (isLoading) {
    return (
      <Box>
        <Skeleton height="1em" width="100%" />
        <Skeleton height="1em" width="70%" />
      </Box>
    );
  }

  if (error) {
    return <Text color="red.500">Konnte Events nicht laden: {String(error)}</Text>;
  }

  // Einheitlich mit Kleinbuchstaben
  const finalEvent = events?.find((e) => e.ref === 'final');

  const finalEventTimeline = finalEvent
    ? {
        event: finalEvent,
        title: 'Final Event',
        url: '/final',
        description: `Present your results to a huge crowd and show how far you have come. 
Each participant will have learned a lot and gained a lot of experience by this point. 
The groups with the greatest progress will receive prizes. This is what you've been working for!`,
        image: 'audimax.jpg',
      }
    : undefined;

  if (!finalEventTimeline) {
    return <Text>Final-Event wurde nicht gefunden.</Text>;
  }

  const today = new Date();

  return (
    <VStack>
      <VStack alignItems="stretch">
        <EventHero
          title={finalEventTimeline.title}
          image={finalEventTimeline.image}
          event={finalEventTimeline.event}
        />
      </VStack>

      <EventDescription
      description={finalEventTimeline.description}
      today={today}
      event={finalEventTimeline.event}
      />

      <Spacer mb={4} />

      {/* Link to former GROW events */}
      <LinkListItem
        link={{
          id: 1,
          title: 'GROW Final 24/25',
          href: 'https://pretix.eu/GROW/Final/',
          img: '/images/icons/grow.png',
        }}
      />
    </VStack>
  );
};

export default FinalLandingPage;
