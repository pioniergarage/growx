import { Box, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

type Item = {
    date: string;
    title: string;
    description: string;
    image: string;
    objectPosition?: string;
};

function TimelineItem({
    date,
    title,
    description,
    image,
    objectPosition,
}: Item) {
    return (
        <Box borderRadius={2} overflow="hidden">
            <Box position="relative" height="320px">
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
                    bgGradient="linear(to-t, #000000bb 0%, #00000000 100%)"
                >
                    <Text variant="info">{date}</Text>
                    <Heading size="md">{title}</Heading>
                    <Text mt={2}>{description}</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default function Timeline() {
    const events: Item[] = [
        {
            date: '10. Nov 22',
            title: 'Kickoff Event',
            description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, no matter whether you have already applied or you're up for a spontaneous adventure. `,
            image: 'notes.jpg',
        },
        {
            date: '14. Dec 22',
            title: 'Midterm Pitch',
            description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've accomplished in the last 5 weeks in front of a small audience and the jury. `,
            image: 'speech.jpg',
            objectPosition: '0 0',
        },
        {
            date: '10. Jan 23',
            title: 'Finale',
            description: `Present your results to a huge crowd and show how far you have come. 
            Each participant will have learned a lot and gained a lot of experience by this point. 
            The groups with the greatest progress will receive prizes. This is what you've been working for!`,
            image: 'audimax.jpg',
        },
    ];
    return (
        <VStack alignItems={{ base: 'center', md: 'start' }} spacing={4}>
            <Heading size="lg" textAlign="center">
                From idea to prototype in 11 weeks
            </Heading>
            <SimpleGrid columns={[1, 1, 1, 3]} gap={4} width='100%'>
                {events.map((event) => (
                    <TimelineItem {...event} key={event.title} />
                ))}
            </SimpleGrid>
        </VStack>
    );
}
