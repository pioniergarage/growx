import { Flex, FlexProps } from '@chakra-ui/react';
import { useMemo } from 'react';

import {
    FaBuilding,
    FaCheck,
    FaChromecast,
    FaClock,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { EventType, GrowEvent } from '../types';
import EventTag from './EventTag';
import { GrowEventCardProps } from './GrowEventCard';

type EventTagListProps = FlexProps & {
    event: GrowEvent;
    isSQTagVisible?: boolean;
    transparent?: boolean;
    registration?: GrowEventCardProps['registration'];
};
function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

const EventTagList = ({
    event,
    isSQTagVisible,
    transparent = false,
    registration,
    ...flexProps
}: EventTagListProps) => {
    const eventTimeFormatted = useMemo(() => {
        const start = event.date.toLocaleString('DE-de', {
            hour: '2-digit',
            minute: '2-digit',
        });
        if (event.duration <= 0) {
            return start;
        }
        const endTime = addMinutes(event.date, event.duration).toLocaleString(
            'DE-de',
            { hour: '2-digit', minute: '2-digit' }
        );
        return start + ' - ' + endTime;
    }, [event.date, event.duration]);
    return (
        <Flex
            mt={1}
            flexWrap="wrap"
            gap={2}
            flexDir={{ base: 'column', sm: 'row' }}
            alignItems="start"
            {...flexProps}
        >
            <EventTag icon={FaClock} transparent={transparent}>
                {eventTimeFormatted}
            </EventTag>
            {event.location && (
                <EventTag icon={FaMapMarkerAlt} transparent={transparent}>
                    {event.location}
                </EventTag>
            )}
            {event.type === EventType.Hybrid && (
                <EventTag icon={FaChromecast} transparent={transparent}>
                    Hybrid
                </EventTag>
            )}
            {event.type === EventType.Online && (
                <EventTag icon={FaCloud} transparent={transparent}>
                    Online
                </EventTag>
            )}
            {event.type === EventType.Offline && (
                <EventTag icon={FaBuilding} transparent={transparent}>
                    Offline
                </EventTag>
            )}
            {registration && (
                <EventTag icon={FaCheck} transparent={transparent}>
                    Signed up
                </EventTag>
            )}
            {event.sq_mandatory && isSQTagVisible && (
                <EventTag icon={FaExclamation} transparent={transparent}>
                    Mandatory for SQ
                </EventTag>
            )}
            {event.mandatory && (
                <EventTag
                    icon={FaExclamation}
                    colorScheme="red"
                    transparent={transparent}
                >
                    Mandatory
                </EventTag>
            )}
        </Flex>
    );
};

export default EventTagList;
