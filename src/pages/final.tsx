import LinkListItem from '@/components/LinkListItem';
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
import { TimelineItem } from 'modules/landing/ShortTimeline';
import { getSeason } from 'utils/formatters';

// TODO: this should fetch the link to the final by index from a "Links" table on the database.

const FinalLandingPage = () => {
    const { events, isLoading, error } = useGrowEvents();
    const finalEvent = events?.find((e) => e.ref === 'final');
    const finalEventTimeline = finalEvent ? {
        event: finalEvent,
        title: 'Grand Final',
        url: '/final',
        description: `Present your results to a huge crowd and show how far you have come. 
        Each participant will have learned a lot and gained a lot of experience by this point. 
        The groups with the greatest progress will receive prizes. This is what you've been working for!`,
        image: 'audimax.jpg',
    } : undefined;

    const kickoff = events?.find((e) => e.ref === 'kickoff');
    const season = kickoff ? getSeason(kickoff.date) : "";
    return (
        <VStack>
            <Heading size="lg">GROW {season} Grand Final</Heading>
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
                        <LinkListItem link={{ id: 1, title: finalEvent?.title ?? 'GROW Final 24/25', href: `https://pretix.eu/GROW/${finalEvent?.ref}/`, img: "/images/icons/grow.png" }} />
                    </SimpleGrid>

                </>

            ) : (
                <Text></Text>
            )
            }
        </VStack >
    );
};

export default FinalLandingPage;
