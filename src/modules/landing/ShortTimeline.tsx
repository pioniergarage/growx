import { Box, Heading, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import { FINALE_DATE, KICKOFF_DATE, MIDTERM_DATE } from 'constants/Dates';
import Image from 'next/image';
import { growFormattedDate } from 'utils/formatters';

type TimeLineItemProps = {
    date: string;
    title: string;
    description: string;
    image: string;
    objectPosition?: string;
};

const TimelineItem: React.FC<TimeLineItemProps> = ({
    date,
    title,
    description,
    image,
    objectPosition,
}) => {
    return (
        <Box borderRadius={2} overflow="hidden">
            <Box
                position="relative"
                height="320px"
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
                        {date}
                    </Tag>
                    <Heading size="md">{title}</Heading>
                    <Text mt={2}>{description}</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default function ShortTimeline() {
    const events: TimeLineItemProps[] = [
        {
            date: growFormattedDate(KICKOFF_DATE),
            title: 'Kickoff Event',
            description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, whether you already applied or you're up for a spontaneous adventure. `,
            image: 'notes.jpg',
        },
        {
            date: growFormattedDate(MIDTERM_DATE),
            title: 'Midterm Pitch',
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
            image: 'speech.jpg',
            objectPosition: '0 0',
        },
        {
            date: growFormattedDate(FINALE_DATE),
            title: 'Finals',
            description: `Present your results to a huge crowd and show how far you have come. 
            Each participant will have learned a lot and gained a lot of experience by this point. 
            The groups with the greatest progress will receive prizes. This is what you've been working for!`,
            image: 'audimax.jpg',
        },
    ];
    return (
        <VStack alignItems={{ base: 'center', md: 'start' }} spacing={8}>
            <Heading size="lg" textAlign="center">
                From the ideation to the launch in 11 weeks
            </Heading>
            <SimpleGrid columns={[1, 1, 1, 3]} gap={8} width="100%">
                {events.map((event) => (
                    <TimelineItem {...event} key={event.title} />
                ))}
            </SimpleGrid>
        </VStack>
    );
}
