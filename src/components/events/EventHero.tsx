import { Box, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import EventTag from 'modules/events/components/EventTag';
import EventTagList from 'modules/events/components/EventTagList';
import { GrowEvent } from 'modules/events/types';
import { ReactNode } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type EventHeroProps = {
    title: string;
    image: string;
    event: GrowEvent;
    imagePosition: string;
    children?: ReactNode;
};

const EventHero = ({
    title,
    image,
    event,
    imagePosition,
    children,
}: EventHeroProps) => (
    <Box
        position="relative"
        className="w-screen max-w-[1264px] object-cover"
        mx={{ md: -4 }}
        maxHeight="320"
        overflow="hidden"
        maxW={'100%'}
    >
        <Image
            alt={title}
            src={`/images/${image}`}
            objectFit="cover"
            loading="lazy"
            objectPosition={imagePosition}
            w="100%"
            h={{ base: '250px', md: '350px' }}
            overflow="hidden"
            sx={{
                WebkitMaskImage: {
                    base: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                    md: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                },
                maskImage: {
                    base: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                    md: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                },
            }}
        />
        <Box
            position="absolute"
            width="100%"
            height="100%"
            bottom={0}
            left={0}
            bgGradient="linear(to-b,rgba(24, 25, 34, 0.1) 50%, rgba(24, 25, 34, 1) 100%)"
            opacity={{ base: 0, md: 1 }}
        />
        <Box position="absolute" width="100%" bottom={0} left={0} p={4} pt={14}>
            <HStack>
                <VStack alignItems="flex-start" flex="2">
                    <Heading size="xl">{title}</Heading>
                    <EventTagList
                        event={event}
                        hide_category
                        show_date
                        gap={2}
                        isClickable
                    >
                        <EventTag
                            icon={FaExternalLinkAlt}
                            onClick={() => {
                                if (event.href) window.open(event.href);
                            }}
                        >
                            Visit Final Event
                        </EventTag>
                    </EventTagList>
                </VStack>
                <VStack
                    alignItems="flex-start"
                    flex="1"
                    flexShrink="1"
                    gap="1em"
                >
                    {children}
                </VStack>
            </HStack>
        </Box>
    </Box>
);

export default EventHero;
