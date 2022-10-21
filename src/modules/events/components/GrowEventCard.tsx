import {
    Alert,
    AlertIcon,
    Button,
    Flex,
    Heading,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';

import {
    useRegisterUserToEvent,
    useUnregisterUserFromEvent,
} from 'modules/events/hooks';
import { useProfile } from 'modules/profile/hooks';
import { useMemo } from 'react';
import { EventType, GrowEvent } from '../types';
import EventTagList from './EventTagList';
import SignUpDialog from './SignUpDialog';

type GrowEventCardProps = {
    event: GrowEvent;
    registration?: { present: boolean };
};

/**
 * Event element component for the grow connact page
 * @param event the event contain all important information of the event.
 * @param registered This parameter set the state for the registration
 * @returns HTML code that display one event with the date, title, description, location, type and if the event is mandatory.
 */
const GrowEventCard: React.FC<GrowEventCardProps> = ({
    event,
    registration,
}) => {
    const { registerUser, isLoading: isRegistering } = useRegisterUserToEvent();
    const { unregisterUser, isLoading: isUnregistering } =
        useUnregisterUserFromEvent();
    const user = useUser();
    const { profile } = useProfile();
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

    async function register(present: boolean) {
        if (!user) return;
        try {
            await registerUser({ user, event, present });
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    async function deregister() {
        if (!user) return;
        try {
            await unregisterUser({ user, event });
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    return (
        <Flex flexDir="column" color={over ? 'gray.500' : 'inherit'}>
            <Flex gap="2px" flexDir="column">
                <Heading size="xs" color="primary">
                    {month} {day}, {time}
                </Heading>
                <Heading size="md">{event.title}</Heading>
            </Flex>
            <Text color="gray.400">{event.description}</Text>

            {!over ? (
                <>
                    <EventTagList
                        event={event}
                        isSQTagVisible={profile?.keyQualification}
                    />
                    <EventRegistration
                        registration={registration}
                        onDeregister={deregister}
                        isLoading={isRegistering || isUnregistering}
                        eventType={event.type || EventType.Online}
                        onRegister={register}
                    />
                </>
            ) : undefined}
        </Flex>
    );
};

type EventRegistrationProps = {
    registration: GrowEventCardProps['registration'];
    onDeregister: () => void;
    onRegister: (present: boolean) => void;
    isLoading: boolean;
    eventType: EventType;
};
const EventRegistration = ({
    registration,
    onDeregister,
    eventType,
    isLoading,
    onRegister,
}: EventRegistrationProps) => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleRegisterClick = () => {
        if (eventType === EventType.Hybrid) {
            onOpen();
        } else {
            onRegister(eventType === EventType.Offline);
        }
    };

    if (registration) {
        return (
            <Alert
                status={registration ? 'success' : 'info'}
                mt={2}
                py={2}
                pr={2}
                backgroundColor="transparent"
                border="1px"
                borderColor="gray.700"
                borderRadius={4}
            >
                <AlertIcon />
                {registration ? (
                    <>
                        You have signed up (
                        {registration.present ? 'in person' : 'online'})
                    </>
                ) : undefined}
                <Button
                    onClick={onDeregister}
                    size="sm"
                    isLoading={isLoading}
                    variant="solid"
                    ml="auto"
                >
                    Deregister
                </Button>
            </Alert>
        );
    } else {
        return (
            <>
                <Button
                    variant="solid"
                    mt={2}
                    maxW={{ md: '20rem' }}
                    size="sm"
                    isLoading={isLoading}
                    onClick={handleRegisterClick}
                >
                    Register
                </Button>
                {eventType === EventType.Hybrid ? (
                    <SignUpDialog
                        isOpen={isOpen}
                        onSubmit={(present) => {
                            onClose();
                            onRegister(present);
                        }}
                        onCancel={onClose}
                    />
                ) : undefined}
            </>
        );
    }
};

export default GrowEventCard;