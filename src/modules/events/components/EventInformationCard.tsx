import Card from '@/components/Card';
import { Box, Flex, FlexProps, Icon, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IconType } from 'react-icons';
import {
    FaCalendar,
    FaChromecast,
    FaClock,
    FaExclamation,
    FaMapMarkerAlt,
    FaTicketAlt,
} from 'react-icons/fa';
import { EventType, GrowEventWithSeats } from '../types';
import { formatEventTime } from '../utils';

const InfoRow: React.FC<
    FlexProps & {
        icon: IconType;
        label: string;
    }
> = ({ children, icon, label, ...rest }) => {
    return (
        <Flex alignItems='flex-start' whiteSpace='normal' {...rest} overflow='hidden'>
            <Flex alignItems={'center'} flexGrow={1}>
                <Icon as={icon} mr={2} />
                <Text as="div" variant="info" fontWeight="light" >
                    {label}
                </Text>
            </Flex>

            <Box fontWeight="bold" ml={4} alignItems={'stretch'} minWidth={0} textAlign={'right'}>
                {children}
            </Box>
        </Flex>
    );
};

type EventInformationCardProps = {
    event: GrowEventWithSeats;
    auth: boolean;
};

const EventInformationCard: React.FC<EventInformationCardProps> = ({
    event,
    auth
}) => {
    const eventTimeFormatted = useMemo(
        () => formatEventTime(event.date, event.duration),
        [event.date, event.duration]
    );
    return (
        <Card p={4}>
            <InfoRow label="Date" icon={FaCalendar}>
                {event.date.toLocaleString('de-DE', {
                    day: '2-digit',
                    month: 'long',
                })}
            </InfoRow>
            <InfoRow label="Time" icon={FaClock}>
                {eventTimeFormatted}
            </InfoRow>
            <InfoRow label="Location" icon={FaMapMarkerAlt}>
                {event.location}
            </InfoRow>
            {(auth && event.type != EventType.Offline) &&
                <InfoRow label="Online seats left" icon={FaChromecast}>
                    ∞
                </InfoRow>
            }
            {(auth && event.type != EventType.Online) &&
                <InfoRow label="Presence seats left" icon={FaTicketAlt}>
                    {Math.max(event.presenceSeatsLeft, 0)}
                </InfoRow>
            }
            {event.mandatory && (
                <InfoRow
                    label="Mandatory"
                    icon={FaExclamation}
                    color="primary"
                />
            )}
        </Card>
    );
};

export default EventInformationCard;
