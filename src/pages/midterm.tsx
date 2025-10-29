import { Box, Skeleton, Spacer, Text, VStack } from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import EventHero from '@/components/events/EventHero';
import EventDescription from '@/components/events/EventDescription';
import LaterEvents from '@/components/events/LaterEvents';

// ...existing MidtermProps type...

const MidtermLandingPage = (props: MidtermProps) => {
    const { events, isLoading, error } = useGrowEvents();
    const midtermEvent = events?.find((e) => e.ref === 'midterm');
    const midtermEventTimeline = midtermEvent ? {
        event: midtermEvent,
        title: 'Midterm Event',
        url: '/midterm',
        description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
        image: 'speech.jpg',
    } : undefined;

    const final: GrowEvent = events.filter((e) => e.ref == 'final')[0];
    const today = new Date();

    const laterEvents = final ? [{
        event: final,
        title: 'Grand Final',
        url: '/final',
        description: `Present your results to a huge crowd and show how far you have come. 
            Each participant will have learned a lot and gained a lot of experience by this point. 
            The groups with the greatest progress will receive prizes. This is what you've been working for!`,
        image: 'audimax.jpg',
    }] : [];
    if (isLoading || error) {
        return (
            <Box>
                <Skeleton height="1em" width="100%" />
                <Skeleton height="1em" width="70%" />
            </Box>
        );
    }

    if (!midtermEventTimeline) {
        return <Text></Text>;
    }

    return (
        <VStack>
            <VStack alignItems="stretch">
                <EventHero 
                    title={midtermEventTimeline.title}
                    image={midtermEventTimeline.image}
                    event={midtermEventTimeline.event}
                />
            </VStack>

            <EventDescription 
                description={midtermEventTimeline.description}
                today={today}
                event={midtermEventTimeline.event}
            />

            <Spacer mb={4} />

            <LaterEvents events={laterEvents} />
        </VStack>
    );
};

export default MidtermLandingPage;