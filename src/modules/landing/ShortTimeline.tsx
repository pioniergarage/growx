import { Box, Heading, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import EventTagList from 'modules/events/components/EventTagList';
import { GrowEvent } from 'modules/events/types';
import Image from "next/legacy/image";
import { growFormattedDate } from 'utils/formatters';

type TimeLineItemProps = {
    event: GrowEvent;
    title: string;
    url: string;
    description: string;
    image: string;
    objectPosition?: string;
};

type ShortTimeLineProps = {
    kickoff: GrowEvent;
    midterm: GrowEvent;
    final: GrowEvent;
};

export const TimelineItem: React.FC<TimeLineItemProps> = ({
    event,
    title,
    // url,
    description,
    image,
    objectPosition,
}) => {
    return (
        <Box borderRadius={2} overflow="hidden">
            <Box
                position="relative"
                minHeight="320px"
                sx={{
                    '&:hover img': {
                        transform: 'scale(1.05)',
                    },
                    img: {
                        transition: 'all 0.2s',
                    },
                }}
            >
                <Image
                    alt={title}
                    src={`/images/${image}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition={objectPosition}
                />

                <Box
                    position="absolute"
                    width="100%"
                    bottom={0}
                    left={0}
                    p={6}
                    pt={14}
                    bgGradient="linear(to-t, #000000cc 30%, #00000000 100%)"
                >
                    <Tag bgColor="blackAlpha.600" mb={2}>
                        {growFormattedDate(event.date, new Date())}
                    </Tag>
                    <Heading size="md">{title}</Heading>
                    <Text mt={2}>{description}</Text>
                    <EventTagList
                        event={event}
                        transparent
                        hide_category
                        gap={0}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const ShortTimeline: React.FC<ShortTimeLineProps> = ({
    kickoff,
    midterm,
    final
}) => {
    const events: TimeLineItemProps[] = [
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
        <VStack alignItems={{ base: 'center', md: 'start' }} spacing={8}>
            <Heading size="lg" textAlign="left">
                From idea to launch in 11 weeks
            </Heading>
            <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
                {events.map((event) => (
                    <TimelineItem {...event} key={event.title} />
                ))}
            </SimpleGrid>
        </VStack>
    );
}

export default ShortTimeline;