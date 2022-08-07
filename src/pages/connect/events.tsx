import ConnectLayout from '@/components/layouts/ConnectLayout';
import PageLink from '@/components/nav/PageLink';
import {
    Box,
    Button,
    Flex,
    Grid,
    Heading,
    HStack,
    Tag,
    Text,
    Tooltip,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { useProfile } from 'hooks/profile';
import { useEffect, useMemo, useState } from 'react';
import { GrowEvent, NextPageWithLayout } from 'types';

function GrowEventCard({
    event,
    registered,
}: {
    event: GrowEvent;
    registered: boolean;
}) {
    const [registeredLocal, setRegisteredLocal] = useState(registered);
    const { user } = useUser();
    const toast = useToast();
    const { day, month } = useMemo(() => {
        const date = new Date(event.date);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        return { day, month };
    }, [event.date]);
    const over = new Date() > new Date(event.date);

    async function register() {
        const { error } = await supabaseClient
            .from('registrations')
            .insert({ user_id: user?.id, event_id: event.id });
        if (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Registered to ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(true);
        }
    }

    async function withdrawRegistration() {
        const { error } = await supabaseClient
            .from('registrations')
            .delete()
            .match({ event_id: event.id, user_id: user?.id });
        if (error) {
            toast({
                title: 'Something went wrong...',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Unregistered from ' + event.title,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setRegisteredLocal(false);
        }
    }

    let actionButton;
    if (event.mandatory) {
        actionButton = (
            <Tooltip label="Event is mandatory" shouldWrapChildren>
                <Button disabled={true} size="sm" variant="outline">
                    Withdraw Registration
                </Button>
            </Tooltip>
        );
    } else if (registeredLocal) {
        actionButton = (
            <Button onClick={withdrawRegistration} size="sm" variant="outline">
                Withdraw Registration
            </Button>
        );
    } else {
        actionButton = (
            <Button
                onClick={register}
                color="primary"
                size="sm"
                variant="outline"
            >
                Register
            </Button>
        );
    }

    return (
        <HStack
            gap={4}
            alignItems="start"
            color={over ? 'gray.500' : 'inherit'}
        >
            <Flex justify="space-between" w="3.5rem" fontWeight="semibold">
                <Text>{day}</Text>
                <Text>{month}</Text>
            </Flex>
            <VStack alignItems="start">
                <HStack>
                    <Heading size="md">{event.title}</Heading>
                    {event.mandatory ? <Tag>mandatory</Tag> : undefined}
                    {event.online ? <Tag>online</Tag> : undefined}
                </HStack>
                <Text>{event.description}</Text>
                {!over ? actionButton : undefined}
            </VStack>
        </HStack>
    );
}

const EventsPage: NextPageWithLayout = () => {
    const { profile } = useProfile();

    const [events, setEvents] = useState<GrowEvent[]>([]);
    const [registeredTo, setRegisteredTo] = useState<number[]>([]);

    useEffect(() => {
        (async () => {
            if (!profile) return;
            const { data } = await supabaseClient
                .from<GrowEvent>('events')
                .select('*');
            const { data: registered } = await supabaseClient
                .from<{ user_id: string; event_id: number }>('registrations')
                .select('event_id')
                .match({ user_id: profile?.user_id });
            if (registered) {
                setRegisteredTo(registered.map((r) => r.event_id));
            }
            if (data) {
                setEvents(data);
            }
        })();
    }, [profile]);

    return (
        <Box>
            <Heading mb={4}>Events</Heading>
            <VStack alignItems="stretch" gap={4}>
                {events.map((event) => (
                    <GrowEventCard
                        key={event.id}
                        event={event}
                        registered={registeredTo.includes(event.id)}
                    />
                ))}
            </VStack>
        </Box>
    );
};

EventsPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default EventsPage;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
