import FullTable from '@/components/FullTable';
import TimelineEvent from '@/components/landing/TimelineEvent';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Spinner,
    Switch,
    Textarea,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { supabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    GrowEvent,
    NextPageWithLayout,
    ProfileDto,
} from 'types';

function EventForm({
    onSubmit,
    onChange,
    initialValue = {
        title: '',
        date: '',
        description: '',
        online: false,
        mandatory: false,
    },
    loading,
}: {
    onSubmit: (value: Omit<GrowEvent, 'id'>) => void;
    onChange: (value: Omit<GrowEvent, 'id'>) => void;
    initialValue?: Omit<GrowEvent, 'id'>;
    loading: boolean;
}) {
    const formik = useFormik<Omit<GrowEvent, 'id'>>({
        initialValues: initialValue,
        onSubmit,
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.title) errors.title = 'Required';
            if (Object.entries(errors).length === 0) {
                onChange(values);
            }
            return errors;
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="stretch">
                <HStack>
                    <FormControl isDisabled={loading}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            name="title"
                            id="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                        />
                        <FormErrorMessage>
                            {formik.errors.title}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel htmlFor="date">Date</FormLabel>
                        <Input
                            name="date"
                            id="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                            placeholder="2022-08-01"
                        />
                        <FormErrorMessage>
                            {formik.errors.date}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel htmlFor="mandatory">Mandatory</FormLabel>
                        <Switch
                            id="mandatory"
                            isChecked={formik.values.mandatory}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel htmlFor="online">Online</FormLabel>
                        <Switch
                            id="online"
                            isChecked={formik.values.online}
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                </HStack>
                <FormControl isDisabled={loading}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Textarea
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <FormErrorMessage>
                        {formik.errors.description}
                    </FormErrorMessage>
                </FormControl>
                <HStack>
                    <Button color="secondary" isLoading={loading} type="submit">
                        Save
                    </Button>
                    <Button
                        isDisabled={loading}
                        onClick={() => formik.setValues(initialValue)}
                    >
                        Reset
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
}

type ShortProfile = Pick<
    ProfileDto,
    'first_name' | 'last_name' | 'email' | 'user_id'
>;

function Registrations({ eventId = '' }) {
    const [registrations, setRegistrations] = useState<ShortProfile[]>([]);

    useEffect(() => {
        (async () => {
            const { data } = await supabaseClient
                .from('registrations')
                .select(
                    `
                    profiles (
                        first_name,
                        last_name,
                        email,
                        user_id
                    )
                `
                )
                .match({ event_id: eventId });
            if (data) {
                const registrations = data.map((d) => d.profiles) as ShortProfile[];
                setRegistrations(registrations);
            }
        })();
    }, []);
    return (
        <>
            <FullTable
                values={registrations}
                idProp="user_id"
                heading="Registrations"
            />
        </>
    );
}

const EventDetails: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const { eventId } = router.query;

    const [event, setEvent] = useState<GrowEvent>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data, error } = await supabaseClient
                .from<GrowEvent>('events')
                .select('*')
                .match({ id: eventId })
                .single();
            if (data) {
                setEvent(data);
            }
            if (error) {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }
            setLoading(false);
        })();
    }, []);

    async function saveEvent(patch: Partial<GrowEvent>) {
        if (!event) return;
        setLoading(true);
        const { error } = await supabaseClient
            .from<GrowEvent>('events')
            .update(patch)
            .match({ id: event.id });
        if (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Event saved',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        }
        setLoading(false);
    }

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <Heading>Event</Heading>
            {event ? (
                <>
                    <VStack alignItems='start'>
                        <Heading size="sm">Preview</Heading>
                        <Box maxW="xl">
                            <TimelineEvent {...event} />
                        </Box>
                    </VStack>
                    <Divider />
                    <EventForm
                        onSubmit={saveEvent}
                        onChange={(updated) =>
                            setEvent({ id: event.id, ...updated })
                        }
                        initialValue={event}
                        loading={loading}
                    />
                    <Divider />
                    <Registrations eventId={event.id} />
                </>
            ) : (
                <Spinner />
            )}
        </VStack>
    );
};

EventDetails.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default EventDetails;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
