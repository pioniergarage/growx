import {
    Box,
    Heading,
    SimpleGrid,
    Skeleton,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react';

import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';

// TODO: this should fetch the link to the final by index from a "Links" table on the database.
// type KickoffProps = {
//     event: GrowEvent;
//     title: string;
//     url: string;
//     description: string;
//     image: string;
//     objectPosition?: string;
//     // videoUrl?: string;
// };

const KickoffLandingPage = () => {
    const { events, isLoading, error } = useGrowEvents();
    const kickoffEvent = events?.find((e) => e.ref === 'kickoff');
    const kickoffEventTimeline = kickoffEvent
        ? {
            event: kickoffEvent,
            title: 'Kickoff Event',
            url: '/kickoff',
            description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, whether you already applied or you're up for a spontaneous adventure. `,
            image: 'notes.jpg',
            // videoUrl: 'https://www.youtube.com/watch?v=H9l3KCKCm00',
        }
        : undefined;

    const midterm: GrowEvent = events.filter((e) => e.ref == 'midterm')[0];
    const final: GrowEvent = events.filter((e) => e.ref == 'final')[0];
    const today = new Date();

    const laterEvents: TimeLineItemProps[] = [
        {
            event: midterm,
            title: 'Midterm Pitch',
            url: '/midterm',
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
            image: 'speech.jpg',
            objectPosition: '0 0',
        },
        {
            event: final,
            title: 'Grand Final',
            url: '/final',
            description: `Present your results to a huge crowd and show how far you have come. 
            Each participant will have learned a lot and gained a lot of experience by this point. 
            The groups with the greatest progress will receive prizes. This is what you've been working for!`,
            image: 'audimax.jpg',
        },
    ];

    return (
        <>
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
                    </SimpleGrid>

                    <GrowEventVideo event={kickoffEventTimeline.event} />

                    <OtherGrowEvents
                        previousEvents={[]}
                        laterEvents={laterEvents}
                    />
                </VStack>
            ) : (
                <Text></Text>
            )}
        </>
    );
};

export default KickoffLandingPage;
