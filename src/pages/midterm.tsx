import EventDescription from '@/components/events/EventDescription';
import EventHero from '@/components/events/EventHero';
import OtherGrowEvents from '@/components/events/OtherGrowEvents';
import { Box, HStack, Skeleton, Text, VStack } from '@chakra-ui/react';
import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';

// ...existing MidtermProps type...

const MidtermLandingPage = () => {
    const { events, isLoading, error } = useGrowEvents();
    const midtermEvent = events?.find((e) => e.ref === 'midterm');
    const finalEventTimeline = midtermEvent ? {
        event: midtermEvent,
        title: 'Midterm Pitch',
        url: '/midterm',
        description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
            image: 'speech.jpg',
        }
        : undefined;

    const final: GrowEvent = events.filter((e) => e.ref == 'final')[0];
    const today = new Date();
    const kickoff: GrowEvent = events.filter((e) => e.ref == 'kickoff')[0];
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
    const laterEvents = final
        ? [
            {
                event: final,
                title: 'Grand Final',
                url: '/final',
                description: `Present your results to a huge crowd and show how far you have come. 
            Each participant will have learned a lot and gained a lot of experience by this point. 
            The groups with the greatest progress will receive prizes. This is what you've been working for!`,
                image: 'audimax.jpg',
            },
        ]
        : [];
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
            <Heading size="lg">GROW {season} Midterm Pitch</Heading>
            <Spacer mb={4} />
            {isLoading ? (
                <Box>
                    <Skeleton height="1em" width="100%" />
                    <Skeleton height="1em" width="70%" />
                </Box>
            ) : error ? (
                <Box>
                    <Skeleton height="1em" width="100%" />
                    <Skeleton height="1em" width="70%" />
                </Box>
            ) : finalEventTimeline ? (
                <>
                    <SimpleGrid columns={[1, 1]} gap={8}>
                        <TimelineItem {...finalEventTimeline} key={finalEventTimeline.title} />
                        <VStack flexGrow={1} alignItems="stretch" gap={6}>
                            <p>
                                10 teams, each with a groundbreaking idea, compete for one grand prize.
                            </p>
                            <p>
                                It’s time for the GROW final and the stakes are high.
                            </p>
                            <p>
                                Who will rise to the top?
                            </p>
                            <p>
                                Join us at the GROW finale and witness the next big thing in innovation!
                            </p>
                        </VStack>
                        <LinkListItem link={{ id: 1, title: midtermEvent?.title ?? 'GROW Midterm 24/25', href: `https://pretix.eu/GROW/${midtermEvent?.ref}/`, img: "/images/icons/grow.png" }} />
                    </SimpleGrid>

            <HStack width={'100%'} justifyContent="space-between">
                <EventDescription
                    description={midtermEventTimeline.description}
                    today={today}
                    event={midtermEventTimeline.event}
                    event_start={kickoff.date}
                />
            </HStack>
            <GrowEventVideo event={midtermEventTimeline.event} />

            <OtherGrowEvents
                previousEvents={previousEvents}
                laterEvents={laterEvents}
            />
        </VStack>
    );
};

export default MidtermLandingPage;
