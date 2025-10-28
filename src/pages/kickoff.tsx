import KickoffCTA from '@/components/KickoffCTA';
import {
    Box,
    Heading,
    HStack,
    Image,
    SimpleGrid,
    Skeleton,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react';
import EventTagList from 'modules/events/components/EventTagList';

import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import { TimelineItem, TimeLineItemProps } from 'modules/landing/ShortTimeline';


// TODO: this should fetch the link to the final by index from a "Links" table on the database.
type KickoffProps = {
    event: GrowEvent;
    title: string;
    url: string;
    description: string;
    image: string;
    objectPosition?: string;
};

const KickoffLandingPage = (props: KickoffProps) => {
    const { events, isLoading, error } = useGrowEvents();
    const kickoffEvent = events?.find((e) => e.ref === 'kickoff');
    const kickoffEventTimeline = kickoffEvent ? {
        event: kickoffEvent,
        title: 'Kickoff Event',
        url: '/kickoff',
        description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, whether you already applied or you're up for a spontaneous adventure. `,
        image: 'notes.jpg',
    } : undefined;

    const midterm: GrowEvent = events.filter((e) => e.ref == 'midterm')[0]
    const final: GrowEvent = events.filter((e) => e.ref == 'final')[0]
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
        <VStack>
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
            ) : kickoffEventTimeline ? (
                <>
                    <VStack alignItems="stretch">
                        <Box
                            position="relative"
                            className="w-screen max-w-[1264px] mx-auto -mx-4 md:-mx-8 object-cover"
                            maxHeight="320"
                            overflow="hidden"
                        >
                            <Image
                                alt={kickoffEventTimeline.title}
                                src={`/images/${kickoffEventTimeline.image}`}
                                layout="fill"
                                objectFit="cover"
                                loading='lazy'
                            />

                            <Box
                                position="absolute"
                                width="100%"
                                bottom={0}
                                left={0}
                                p={4}
                                pt={10}
                                bgGradient="linear(to-t, #181922 0%, #18192200 100%)"
                            >
                                <Heading size="lg">{kickoffEventTimeline.title}</Heading>
                                <EventTagList
                                    event={kickoffEventTimeline.event}
                                    transparent
                                    hide_category
                                    show_date
                                    gap={0}
                                />
                            </Box>
                        </Box>
                    </VStack>

                    <VStack alignItems='flex-start'>
                        <Text>{kickoffEventTimeline.description}</Text>

                        <HStack padding={5} alignItems='center' justifyContent='center'>
                            <KickoffCTA today={today} kickoff={kickoffEventTimeline.event} />
                        </HStack>

                        <Text>Info: The final of the Ideenwettbewerb by Gründerschmiede takes place just before this kickoff.</Text>
                    </VStack>

                    <Spacer mb={4} />

                    <VStack alignItems='flex-start' width='100%'>
                        <Heading size="md">Later Events</Heading>

                        <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
                            {laterEvents.map((event) => (
                                <TimelineItem {...event} key={event.title} />
                            ))}
                        </SimpleGrid>
                    </VStack>
                </>

            ) : (
                <Text></Text>
            )
            }
        </VStack >
    );
};

export default KickoffLandingPage;
