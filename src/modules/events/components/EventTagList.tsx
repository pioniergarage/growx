import { Flex, FlexProps } from '@chakra-ui/react';

import {
    FaBuilding,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import { EventType, GrowEvent } from '../types';
import EventTag from './EventTag';

type EventTagListProps = FlexProps & {
    event: Pick<GrowEvent, 'location' | 'mandatory' | 'sq_mandatory' | 'type'>;
    isSQTagVisible?: boolean;
};

const EventTagList = ({
    event,
    isSQTagVisible,
    ...flexProps
}: EventTagListProps) => {
    return (
        <Flex
            mt={1}
            flexWrap="wrap"
            gap={2}
            flexDir={{ base: 'column', sm: 'row' }}
            alignItems="start"
            {...flexProps}
        >
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
            {event.sq_mandatory && isSQTagVisible && (
                <EventTag icon={FaExclamation}>Mandatory for SQ</EventTag>
            )}
            {event.mandatory && (
                <EventTag icon={FaExclamation} colorScheme="red">
                    Mandatory
                </EventTag>
            )}
        </Flex>
    );
};

export default EventTagList;
