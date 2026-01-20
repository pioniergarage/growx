import EventDescription from '@/components/events/EventDescription';
import EventHero from '@/components/events/EventHero';
import OtherGrowEvents from '@/components/events/OtherGrowEvents';
import {
  Box,
  Flex,
  HStack,
  Show,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import AnimatedLogo from 'modules/landing/AnimatedLogo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';

// ...existing FinalProps type...

const FinalLandingPage = () => {
  const { events, isLoading, error } = useGrowEvents();

  if (isLoading) {
    return (
      <Box>
        <Skeleton height="1em" width="100%" />
        <Skeleton height="1em" width="70%" />
      </Box>
    );
  }

  console.log(events);

  if (error) {
    return (
      <Text color="red.500">
        Konnte Events nicht laden: {String(error)}
      </Text>
    );
  }

  // Einheitlich mit Kleinbuchstaben
  const finalEvent = events?.find((e) => e.ref === 'final');

  if (!finalEvent) {
    return <Text>Final-Event wurde nicht gefunden.</Text>;
  }

  const today = new Date();
  const midterm: GrowEvent = events.filter((e) => e.ref == 'midterm')[0];
  const kickoff: GrowEvent = events.filter((e) => e.ref == 'kickoff')[0];

  const finalEventTimeline = {
    event: finalEvent,
    title: 'GROW Final',
    url: '/final',
    description: `IN AN AUDIMAX NEAR YOU...\n After months of hard work the participants in this year's GROW competition will pitch their startups to our panel of expert judges and a huge audience.\n The teams are in a breakneck race for our top three prizes as well as the Aurel Steinert Foundation Sustainabillity Award, and more from our sponsors.\n\n Only one question remains: who will make it to the top?`,
    image: 'audimax.jpg',
  };

  const previousEvents: TimeLineItemProps[] = [
    {
      event: kickoff,
      title: 'Kickoff',
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
      <VStack
        alignItems="stretch"
        marginTop={-6}
        maxW={{ base: 'container.xl', md: '100%' }}
      >
        <EventHero
          title={finalEventTimeline.title}
          image={finalEventTimeline.image}
          event={finalEventTimeline.event}
          imagePosition="center"
        ></EventHero>
      </VStack>
      <HStack justifyContent="space-between">
        <EventDescription
          description={finalEventTimeline.description}
          today={today}
          event={finalEvent}
          event_start={midterm.date}
          CTA_text="Find out at the GROW final!"
        />
        <Show above="md">
          <Flex className=" flex-col">
            <AnimatedLogo boxSize={250} />
          </Flex>
        </Show>
      </HStack>
      <Spacer></Spacer>

      <OtherGrowEvents previousEvents={previousEvents} laterEvents={[]} />
    </VStack>
  );
};

export default FinalLandingPage;
