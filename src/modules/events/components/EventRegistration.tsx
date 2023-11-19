import {
    Alert,
    AlertIcon,
    Button,
    Text,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useProfile } from 'modules/profile/hooks';
import { useMemo } from 'react';
import {
    useRegisterUserToEvent,
    useRegistrationsOfUser,
    useUnregisterUserFromEvent,
} from '../hooks';
import { GrowEventWithSeats } from '../types';
import SignUpDialog from './SignUpDialog';

type EventRegistrationProps = {
    event: GrowEventWithSeats;
};

const EventRegistraion: React.FC<EventRegistrationProps> = ({ event }) => {
    const toast = useToast();
    const { profile } = useProfile();
    const user = useUser();

    const { registrations } = useRegistrationsOfUser(profile?.userId);
    const registration = useMemo(
        () => (registrations ?? []).find((r) => r.eventId == event.id),
        [event.id, registrations]
    );
    const { registerUser, isLoading: isRegistering } = useRegisterUserToEvent();
    const { unregisterUser, isLoading: isUnregistering } =
        useUnregisterUserFromEvent();

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

    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <>
            {!registration && (
                <Button onClick={onOpen} isLoading={isRegistering}>
                    Sign up
                </Button>
            )}
            {!!registration && (
                <Alert
                    status={registration ? 'success' : 'info'}
                    py={2}
                    pr={2}
                    backgroundColor="transparent"
                    border="1px"
                    borderColor="gray.700"
                    borderRadius={4}
                    fontSize="sm"
                >
                    <AlertIcon />
                    <Text flexGrow={1}>
                        Signed up (
                        {registration.present ? 'presence' : 'online'} seat)
                    </Text>
                    <Button
                        ml={2}
                        size="sm"
                        onClick={deregister}
                        isLoading={isUnregistering}
                    >
                        Cancel
                    </Button>
                </Alert>
            )}
            <a href="https://docs.google.com/spreadsheets/d/1DemeQCLAOJyLVsRaXRPrW-1ILP1diyS_GQZ2eN7KFO8/edit?usp=sharing">
                Sry, for register problems. Type your name here
            </a>
            <SignUpDialog
                isOfflineEnabled={
                    (event.type === 'Hybrid' || event.type === 'Offline') &&
                    event.presenceSeatsLeft > 0
                }
                isOnlineEnabled={
                    event.type === 'Hybrid' || event.type === 'Online'
                }
                location={event.location}
                isOpen={isOpen}
                onSubmit={(e) => {
                    onClose();
                    register(e);
                }}
                onCancel={onClose}
            />
        </>
    );
};

export default EventRegistraion;
