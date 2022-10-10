import { Flex, FlexProps } from '@chakra-ui/react';
import { EventType, GrowEvent } from 'model';
import {
    FaBuilding,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import EventTag from './EventTag';

type EventTagListProps = FlexProps & {
    event: Pick<GrowEvent, 'location' | 'mandatory' | 'sq_mandatory' | 'type'>;
};

const EventTagList = ({ event, ...flexProps }: EventTagListProps) => {
    return (
        <Flex
            mt={1}
            flexWrap="wrap"
            gap={2}
            flexDir={{ base: 'column', sm: 'row' }}
            alignItems="start"
            {...flexProps}
        >
            {event.location ? (
                <EventTag icon={FaMapMarkerAlt}>{event.location}</EventTag>
            ) : undefined}
            {event.type === EventType.Hybrid ? (
                <EventTag icon={FaChromecast}>Hybrid</EventTag>
            ) : event.type === EventType.Online ? (
                <EventTag icon={FaCloud}>Online</EventTag>
            ) : event.type === EventType.Offline ? (
                <EventTag icon={FaBuilding}>Offline</EventTag>
            ) : undefined}
            {event.sq_mandatory ? (
                <EventTag icon={FaExclamation}>Mandatory for SQ</EventTag>
            ) : undefined}
            {event.mandatory ? (
                <EventTag icon={FaExclamation} colorScheme="red">
                    Mandatory
                </EventTag>
            ) : undefined}
        </Flex>
    );
};

export default EventTagList;
