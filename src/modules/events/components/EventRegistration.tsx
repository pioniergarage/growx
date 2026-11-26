import { useUser } from '@/components/providers/SupabaseProvider';
import {
    Alert,
    AlertIcon,
    Button,
    HStack,
    Text,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import { useProfile } from 'modules/profile/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import QRCode from 'react-qr-code';
import {
    useRegisterUserToEvent,
    useRegistrationsOfUser,
    useUnregisterUserFromEvent,
} from '../hooks';
import { GrowEvent } from '../types';
import { getEventExternalUrl } from '../utils';
import SignUpDialog from './SignUpDialog';

type EventRegistrationProps = {
    event: GrowEvent;
    midtermSignupUrl?: string | null;
};

const EventRegistration = ({ event, midtermSignupUrl }: EventRegistrationProps) => {
    if (event.ref === 'midterm') {
        const href = midtermSignupUrl === undefined ? getEventExternalUrl(event) : midtermSignupUrl;
        return (
            <VStack>
                {href ? (
                    <Button as="a" href={href}>Sign up on Luma</Button>
                ) : (
                    <Text fontSize="sm">Midterm registration is not available yet.</Text>
                )}
            </VStack>
        );
    }

    return <ConnectEventRegistration event={event} />;
};

const ConnectEventRegistration = ({ event }: { event: GrowEvent }) => {
    const toast = useToast();
    const { profile } = useProfile();
    const user = useUser();
    const router = useRouter();

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
            if (typeof error === 'object' && error !== null && 'message' in error && (error as { message: string }).message) {
                toast({
                    title: (error as { message: string }).message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Something went wrong...',
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                });
            }
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
    const handleSignUp = profile == null ? () => { void router.push('/connect/login'); } : onOpen;
    return (
        <VStack>
            {!registration && (
                <Button onClick={handleSignUp} isLoading={isRegistering}>
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
                    flexDir='column'
                    justifyContent={'center'}
                    gap='1em'
                >
                    <HStack>
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
                    </HStack>

                    <QRCode
                        size={400}
                        style={{ height: "auto", maxWidth: "90%", width: "400px", padding: '1em' }}
                        value={`${window.location.origin}/connect/registration?user=${user?.email}_${user?.id}&event=${event.id}`}
                        viewBox={`0 0 256 256`}
                    />
                    <Text flexGrow={1}>
                        Please show this code to check in.
                    </Text>
                </Alert>
            )}


            <SignUpDialog
                isOfflineEnabled={
                    (event.type === 'Hybrid' || event.type === 'Offline')
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
        </VStack>
    );
};

export default EventRegistration;
