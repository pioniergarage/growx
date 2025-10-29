import { Box, Heading, Image } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import EventTagList from 'modules/events/components/EventTagList';

type EventHeroProps = {
    title: string;
    image: string;
    event: GrowEvent;
};

const EventHero = ({ title, image, event }: EventHeroProps) => (
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
            <Heading size="lg">{title}</Heading>
            <EventTagList
                event={event}
                transparent
                hide_category
                show_date
                gap={0}
            />
        </Box>
    </Box>
);

export default EventHero;