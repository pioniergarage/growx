import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { EventType, GrowEvent } from 'model';
import { useMemo } from 'react';
import {
    FaBuilding,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import EventTag from './EventTag';

interface TimelineEventProps {
    event: GrowEvent;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
    const { day, month } = useMemo(() => {
        const date = event.date;
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        return { day, month };
    }, [event.date]);

    const over = new Date() > event.date;

    return (
        <HStack
            gap={{ base: 2, md: 4 }}
            alignItems="stretch"
            color={over ? 'gray.500' : 'inherit'}
        >
            <VStack
                lineHeight={0.7}
                alignItems="end"
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="semibold"
                width={{ base: '2.5rem', md: '3.5rem' }}
                flexShrink={0}
            >
                <Text>{day}</Text>
                <Text>{month}</Text>
            </VStack>
            <Flex flexDir="column" alignItems="start">
                <Heading size="md">{event.title}</Heading>
                <Text mt={0}>{event.description}</Text>
                <Flex
                    mt={1}
                    flexWrap="wrap"
                    gap={2}
                    flexDir={{ base: 'column', sm: 'row' }}
                    alignItems="start"
                >
                    {event.location ? (
                        <EventTag icon={FaMapMarkerAlt}>
                            {event.location}
                        </EventTag>
                    ) : undefined}
                    {event.type === EventType.Hybrid ? (
                        <EventTag icon={FaChromecast}>Hybrid</EventTag>
                    ) : event.type === EventType.Online ? (
                        <EventTag icon={FaCloud}>Online</EventTag>
                    ) : event.type === EventType.Offline ? (
                        <EventTag icon={FaBuilding}>Offline</EventTag>
                    ) : undefined}
                    {event.mandatory ? (
                        <EventTag icon={FaExclamation}>Mandatory</EventTag>
                    ) : undefined}
                </Flex>
            </Flex>
        </HStack>
    );
};

export default TimelineEvent;
