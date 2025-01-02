import Card from '@/components/Card';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, GridItem, Heading, Link, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FaUsersCog } from 'react-icons/fa';
import { EventCategory, GrowEvent } from '../types';
import EventTagList from './EventTagList';

export type GrowEventCardProps = {
    event: GrowEvent;
    registration?: { present: boolean };
};

const GrowEventCard: React.FC<GrowEventCardProps> = ({
    event,
    registration
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const over = useMemo(() => new Date() > event.date, [event.date]);

    const handleCardClick = () => {
        setIsExpanded(!isExpanded);
    };



    return (
        <Card
            as={Grid}
            alignItems="center"
            gridTemplateColumns={{ base: '1fr 2fr', md: '10rem 2fr' }}
            px={3}
            pt={4}
            pb={3}
            columnGap={{ base: 2, md: 4 }}
            opacity={over ? 0.33 : 1}
            cursor="pointer"
            bgColor={event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.25)" : "whiteAlpha.50"}
            _hover={{ bgColor: event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.5)" : "whiteAlpha.100" }}
            _focus={{ bgColor: event.eventCategory === EventCategory.Grow ? "rgba(211, 77, 188, 0.75)" : "whiteAlpha.200" }}
            onClick={handleCardClick}
        >
            <GridItem rowSpan={{ base: undefined, md: 3 }}>
                <Heading
                    lineHeight={1}
                    textAlign="center"
                    textTransform="uppercase"
                    fontSize="2xl"
                    color={over ? 'gray.500' : undefined}
                >
                    <Text as="span" fontSize="sm">
                        {event.date.toLocaleString('en-US', {
                            weekday: 'short',
                        })}
                    </Text>
                    <br />
                    {event.date.toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'short',
                    })}
                </Heading>
            </GridItem>
            <Box>
                <Flex
                    mt={1}
                    flexWrap="wrap"
                    gap={8}
                    flexDir={{ base: 'column', sm: 'row' }}
                    alignItems="center"
                >
                    <Heading size={{ base: 'xs', sm: 'md' }}>
                        {event.title}
                    </Heading>

                    {event.href &&
                        <Button leftIcon={<ExternalLinkIcon />} size='xs' onClick={(e) => {
                            e.stopPropagation(); // Prevent the click event from triggering the card click
                            window.location.href = event.href as string;
                        }}>
                            Link
                        </Button>
                    }
                </Flex>

                <EventTagList
                    event={event}
                    registration={over ? undefined : registration}
                    transparent
                    gap={0}
                />

                {(isExpanded && event.description != undefined && event.description.length > 0) && (

                    <Flex
                        mt={1}
                        flexWrap="wrap"
                        gap={2}
                        flexDir={{ base: 'column', sm: 'row' }}
                        alignItems="center"
                    >
                        <Text>{event.description}</Text>
                        <Link href={'/connect/events/' + event.id} mt={2}>
                            <Button leftIcon={<FaUsersCog />}>Go to Event</Button>
                        </Link>

                    </Flex>
                )}
            </Box>
        </Card>
    );
};

export default GrowEventCard;
