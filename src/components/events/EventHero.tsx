import { Box, Heading, Image } from '@chakra-ui/react';
import EventTagList from 'modules/events/components/EventTagList';
import { GrowEvent } from 'modules/events/types';

type EventHeroProps = {
    title: string;
    image: string;
    event: GrowEvent;
    imagePosition: string;
};

const EventHero = ({ title, image, event, imagePosition }: EventHeroProps) => (
    <Box
        position="relative"
        className="w-screen max-w-[1264px] mx-auto -mx-4 md:-mx-8 object-cover"
        maxHeight="320"
        overflow="hidden"
    >
        <Image
            alt={title}
            src={`/images/${image}`}
            layout="fill"
            objectFit="cover"
            loading='lazy'
            objectPosition={imagePosition}
            w="100%"
            h={{ base: "250px", md: "350px" }}
            overflow="hidden"
            sx={{
                WebkitMaskImage: {
                    base: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    md: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                },
                maskImage: {
                    base: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                    md: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
                },
            }}
        />
        <Box
            position="absolute"
            width="100%"
            height="100%"
            bottom={0}
            left={0}
            bgGradient="linear(to-b,rgba(24, 25, 34, 0.1) 0%, rgba(24, 25, 34, 1) 100%)"
            opacity={{ base: 0, md: 1 }}
        />

        <Box
            position="absolute"
            width="100%"
            bottom={0}
            left={0}
            p={4}
            pt={14}
        >
            <Heading size="xl">{title}</Heading>
            <EventTagList
                event={event}
                hide_category
                show_date
                gap={2}
                isClickable
            />
        </Box>
    </Box>
);

export default EventHero;