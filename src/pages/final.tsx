import EventDescription from '@/components/events/EventDescription';
import EventHero from '@/components/events/EventHero';
import OtherGrowEvents from '@/components/events/OtherGrowEvents';
import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';

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
  const midterm: GrowEvent = events.filter((e) => e.ref == 'midterm')[0]
  const kickoff: GrowEvent = events.filter((e) => e.ref == 'kickoff')[0]
  const previousEvents: TimeLineItemProps[] = [
    {
      event: kickoff,
      title: 'Kickoff Event',
      url: '/kickoff',
      description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, whether you already applied or you're up for a spontaneous adventure. `,
      image: 'notes.jpg',
    },
    {
      event: midterm,
      title: 'Midterm Pitch',
      url: '/midterm',
      description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
              Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
      image: 'speech.jpg',
      objectPosition: '0 0',
    },
  ];

  return (
    <VStack>
      <VStack alignItems="stretch" marginTop={-6}>
        <EventHero
          title={finalEventTimeline.title}
          image={finalEventTimeline.image}
          event={finalEventTimeline.event}
          imagePosition='center'
        />
      </VStack>

      <EventDescription
        description={finalEventTimeline.description}
        today={today}
        event={finalEventTimeline.event}
      />

      <GrowEventVideo event={finalEventTimeline.event} />

      <OtherGrowEvents previousEvents={previousEvents} laterEvents={[]} />
    </VStack>
  );
};

export default FinalLandingPage;
