import { Box, Flex, Hide, Show, Text } from '@chakra-ui/react';
import { CollapsableText } from 'modules/profile/components/ProfileCard';

import {
    FaBuilding,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { EventType, GrowEvent } from '../types';
import EventTag from './EventTag';

interface TimelineEventProps {
    event: GrowEvent;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ event }) => {
    const over = new Date() > event.date;

    return (
        <Flex
            flexDir="column"
            alignItems="start"
            color={over ? 'gray.500' : 'inherit'}
        >
            <Box color="gray.500" fontSize={14} fontWeight="bold">
                {event.date.toLocaleString()}
            </Box>
            <Box
                fontWeight="600"
                fontSize={{ base: 'lg', md: '2xl' }}
                lineHeight={1.3}
            >
                {event.title}
            </Box>
            <Flex my={2} flexWrap="wrap" gap={2} alignItems="start">
                {event.location && (
                    <EventTag icon={FaMapMarkerAlt}>{event.location}</EventTag>
                )}
                {event.type === EventType.Hybrid && (
                    <EventTag icon={FaChromecast}>Hybrid</EventTag>
                )}
                {event.type === EventType.Online && (
                    <EventTag icon={FaCloud}>Online</EventTag>
                )}
                {event.type === EventType.Offline && (
                    <EventTag icon={FaBuilding}>Offline</EventTag>
                )}
                {event.mandatory && (
                    <EventTag icon={FaExclamation}>Mandatory</EventTag>
                )}
            </Flex>
            <Hide above="md">
                <CollapsableText text={event.description} color="gray.300" />
            </Hide>
            <Show above="md">
                <Text variant="info" color={over ? 'gray.500' : undefined}>
                    {event.description}
                </Text>
            </Show>
        </Flex>
    );
};

export default TimelineEvent;
