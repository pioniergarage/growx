import { Button, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import {
    useRegisterUserToEvent,
    useUnregisterUserFromEvent,
} from 'hooks/event';
import { EventType, GrowEvent } from 'model';
import { useMemo, useState } from 'react';
import {
    FaBuilding,
    FaChromecast,
    FaCloud,
    FaExclamation,
    FaMapMarkerAlt,
} from 'react-icons/fa';
import EventTag from './EventTag';

type GrowEventCardProps = {
    event: GrowEvent;
    registered: boolean;
};

/**
 * Event element component for the grow connact page
 * @param event the event contain all important information of the event.
 * @param registered This parameter set the state for the registration
 * @returns HTML code that display one event with the date, title, description, location, type and if the event is mandatory.
 */
const GrowEventCard: React.FC<GrowEventCardProps> = ({ event, registered }) => {
    const [registeredLocal, setRegisteredLocal] = useState(registered);
    const { registerUser } = useRegisterUserToEvent();
    const { unregisterUser } = useUnregisterUserFromEvent();
    const { user } = useUser();
    const toast = useToast();
    const { day, month, time, over } = useMemo(() => {
        const day = String(event.date.getDate()).padStart(2, '0');
        const month = event.date.toLocaleString('en-US', { month: 'short' });
        const time = event.date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const over = new Date() > event.date;
        return { day, month, time, over };
    }, [event.date]);

    async function register() {
        if (!user) return;
        try {
            await registerUser({ user, event });
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(true);
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    async function withdrawRegistration() {
        if (!user) return;
        try {
            await unregisterUser({ user, event });
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(false);
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    let actionButton;
    if (event.mandatory) {
        actionButton = (
            <Button
                disabled
                variant="outline"
                size="sm"
                mt={2}
                maxW={{ md: '20rem' }}
            >
                Signed up
            </Button>
        );
    } else if (registeredLocal) {
        actionButton = (
            <Button
                onClick={withdrawRegistration}
                variant="outline"
                size="sm"
                mt={2}
                maxW={{ md: '20rem' }}
            >
                Withdraw Registration
            </Button>
        );
    } else {
        actionButton = (
            <Button
                size="sm"
                onClick={register}
                variant="outline"
                mt={2}
                maxW={{ md: '20rem' }}
            >
                Sign up
            </Button>
        );
    }

    return (
        <Flex flexDir="column" color={over ? 'gray.500' : 'inherit'}>
            <Flex gap="2px" flexDir="column">
                <Heading size="xs" color="primary">{month} {day}, {time}</Heading>
                <Heading size="md">{event.title}</Heading>
            </Flex>
            <Text color="gray.400">{event.description}</Text>
            <Flex
                mt={1}
                flexWrap="wrap"
                gap={2}
                flexDir={{ base: 'column', sm: 'row' }}
                alignItems="start"
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
                {event.mandatory ? (
                    <EventTag icon={FaExclamation}>Mandatory</EventTag>
                ) : undefined}
            </Flex>

            {!over ? actionButton : undefined}
        </Flex>
    );
};

export default GrowEventCard;
