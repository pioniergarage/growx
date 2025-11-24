import { Flex, FlexProps } from '@chakra-ui/react';
import { useMemo } from 'react';

import {
    FaCalendarAlt,
    FaCheck,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaInfo,
    FaMapMarkerAlt,
    FaStar,
    FaUser
} from 'react-icons/fa';
import { growFormattedDate } from 'utils/formatters';
import { EventCategory, EventType, GrowEvent } from '../types';
import { formatEventTime } from '../utils';
import EventTag from './EventTag';
import { GrowEventCardProps } from './GrowEventCard';


type EventTagListProps = FlexProps & {
    event: GrowEvent;
    transparent?: boolean;
    hide_category?: boolean;
    show_date?: boolean;
    registration?: GrowEventCardProps['registration'];
};

const EventTagList = ({
    event,
    transparent = false,
    hide_category = false,
    show_date = false,
    registration,
    ...flexProps
}: EventTagListProps) => {
    const eventTimeFormatted = useMemo(
        () => formatEventTime(event.date, event.duration),
        [event.date, event.duration]
    );

    function truncateText(text: string, maxLength = 20): string {
        if (text.length <= maxLength) return text;
        const truncated = text.slice(0, maxLength);
        return truncated.slice(0, truncated.lastIndexOf(" ")) + "...";
    }

    return (
        <Flex
            mt={1}
            flexWrap="wrap"
            gap={2}
            flexDir={'row'}
            alignItems="start"
            {...flexProps}
        >
            <EventTag icon={FaCalendarAlt} transparent={transparent}>
                {show_date ? growFormattedDate(event.date, undefined, undefined, true) : eventTimeFormatted}
            </EventTag>
            {event.location && (
                <EventTag icon={FaMapMarkerAlt} transparent={transparent}>
                    {truncateText(event.location)}
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
            {/* {event.type === EventType.Offline && (
                <EventTag icon={FaBuilding} transparent={transparent}>
                    Offline
                </EventTag>
            )} */}

            {!hide_category &&
                <>
                    {event.eventCategory === EventCategory.Grow && (
                        <EventTag icon={FaStar} transparent={transparent} >
                            GROW
                        </EventTag>
                    )}
                    {event.eventCategory === EventCategory.Info && (
                        <EventTag icon={FaInfo} transparent={transparent}>
                            Info Session
                        </EventTag>
                    )}
                    {event.eventCategory === EventCategory.Workshop && (
                        <EventTag icon={FaUser} transparent={transparent}>
                            Workshop
                        </EventTag>
                    )}
                </>
            }



            {registration && (
                <EventTag
                    icon={FaCheck}
                    transparent={transparent}
                    colorScheme="green"
                >
                    Signed up
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
