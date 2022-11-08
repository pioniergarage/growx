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

function addMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

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

    const eventTimeFormatted = useMemo(() => {
        const start = event.date.toLocaleString('DE-de', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
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
    const over = useMemo(() => new Date() > event.date, [event.date]);

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
                    {eventTimeFormatted}
                </Heading>
                <Heading size="md">{event.title}</Heading>
            </Flex>
            <Text color="gray.400">{event.description}</Text>

            {!over && (
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
            )}
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
                {registration && (
                    <>
                        You have signed up (
                        {registration.present ? 'in person' : 'online'})
                    </>
                )}
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
                {eventType === EventType.Hybrid && (
                    <SignUpDialog
                        isOpen={isOpen}
                        onSubmit={(present) => {
                            onClose();
                            onRegister(present);
                        }}
                        onCancel={onClose}
                    />
                )}
            </>
        );
    }
};

export default GrowEventCard;
