import EventDescription from '@/components/events/EventDescription';
import EventHero from '@/components/events/EventHero';
import OtherGrowEvents from '@/components/events/OtherGrowEvents';
import {
    Box,
    Skeleton,
    Text,
    VStack
} from '@chakra-ui/react';

import { useGrowEvents } from 'modules/events/hooks';
import { GrowEvent } from 'modules/events/types';
import GrowEventVideo from 'modules/landing/GrowEventVideo';
import { TimeLineItemProps } from 'modules/landing/ShortTimeline';


// TODO: this should fetch the link to the final by index from a "Links" table on the database.
type KickoffProps = {
    event: GrowEvent;
    title: string;
    url: string;
    description: string;
    image: string;
    objectPosition?: string;
    // videoUrl?: string;
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
        // videoUrl: 'https://www.youtube.com/watch?v=H9l3KCKCm00',
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
                        <EventHero
                            title={kickoffEventTimeline.title}
                            image={kickoffEventTimeline.image}
                            event={kickoffEventTimeline.event}
                        />
                    </VStack>

                    <EventDescription
                        description={kickoffEventTimeline.description}
                        today={today}
                        event={kickoffEventTimeline.event}
                    />

                    <GrowEventVideo event={kickoffEventTimeline.event} />

                    <OtherGrowEvents previousEvents={[]} laterEvents={laterEvents} />
                </>

            ) : (
                <Text></Text>
            )
            }
        </VStack >
    );
};

export default KickoffLandingPage;
