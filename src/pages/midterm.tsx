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
import { getSeasonFromFinal } from 'utils/formatters';

// TODO: this should fetch the link to the final by index from a "Links" table on the database.

const MidtermLandingPage = () => {
    const { events, isLoading, error } = useGrowEvents();
    const midtermEvent = events?.find((e) => e.ref === 'final');
    const finalEventTimeline = midtermEvent ? {
        event: midtermEvent,
        title: 'Midterm Pitch',
        url: '/midterm',
        description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
        image: 'speech.jpg',
    } : undefined;

    const kickoff = events?.find((e) => e.ref === 'kickoff');
    const season = kickoff ? getSeasonFromFinal(kickoff.date) : "";
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
                        <LinkListItem link={{ id: 1, title: 'GROW Final 24/25', href: 'https://pretix.eu/GROW/Final/', img: "/images/icons/grow.png" }} />
                    </SimpleGrid>

                </>

            ) : (
                <Text></Text>
            )
            }
        </VStack >
    );
};

export default MidtermLandingPage;
