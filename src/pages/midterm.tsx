import EventDescription from '@/components/events/EventDescription';
import EventHero from '@/components/events/EventHero';
import OtherGrowEvents from '@/components/events/OtherGrowEvents';
import { Box, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';

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
    ];
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
            <VStack alignItems="stretch" marginTop={-6}>
                <EventHero
                    title={midtermEventTimeline.title}
                    image={midtermEventTimeline.image}
                    event={midtermEventTimeline.event}
                    imagePosition='top'
                />
            </VStack>

            <EventDescription
                description={midtermEventTimeline.description}
                today={today}
                event={midtermEventTimeline.event}
            />
            <GrowEventVideo event={midtermEventTimeline.event} />

            <OtherGrowEvents previousEvents={previousEvents} laterEvents={laterEvents} />
        </VStack>
    );
};

export default MidtermLandingPage;