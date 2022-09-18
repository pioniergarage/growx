import TimelineEvent from '@/components/events/TimelineEvent';
import FullTable from '@/components/FullTable';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
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
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import {
    useDeleteEvent,
    useGrowEvent,
    useRegistrationsToEvent,
    useUpdateEvent,
} from 'hooks/event';
import { GrowEvent } from 'model';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

type EventFormType = Pick<GrowEvent, 'title' | 'description' | 'mandatory'> & {
    date: string;
    time: string;
};

type EventFormProps = {
    onSubmit: (value: Omit<GrowEvent, 'id'>) => void | Promise<unknown>;
    onChange: (value: Omit<GrowEvent, 'id'>) => void;
    initialValue: GrowEvent;
    loading: boolean;
    onDelete: () => void;
};

function formValueToGrowEvent(value: EventFormType): Omit<GrowEvent, 'id'> {
    const date = new Date(`${value.date}T${value.time}`);
    return {
        date,
        title: value.title,
        description: value.description,
        mandatory: value.mandatory,
    };
}

/**
 * @param date date to be formatted
 * @returns date in format 'yyy-MM-dd'
 */
function formatDate(date: Date) {
    const month = String(date.getMonth() + 1),
        day = String(date.getDate()),
        year = String(date.getFullYear());

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

/**
 * @param date date to be formatted
 * @returns date in format 'HH:mm'
 */
function formatTime(date: Date) {
    const hours = String(date.getHours()),
        minutes = String(date.getMinutes());

    return [hours.padStart(2, '0'), minutes.padStart(2, '0')].join(':');
}

function EventForm({
    onSubmit,
    onChange,
    initialValue,
    loading,
    onDelete,
}: EventFormProps) {
    const initialFormValue: EventFormType = {
        ...initialValue,
        date: formatDate(initialValue.date),
        time: formatTime(initialValue.date),
    };
    const formik = useFormik<EventFormType>({
        initialValues: initialFormValue,
        onSubmit: (formValue) => onSubmit(formValueToGrowEvent(formValue)),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.date.match(/^\d{4}-\d\d-\d\d$/))
                errors.date = 'Wrong format: Use yyyy-MM-dd';
            if (!values.time.match(/^\d\d:\d\d$/))
                errors.time = 'Wrong format: Use HH:mm';
            if (Object.entries(errors).length === 0) {
                onChange(formValueToGrowEvent(values));
            }
            return errors;
        },
    });

    const { isOpen, onOpen: openDialog, onClose } = useDisclosure();
    const cancelRef = useRef<FocusableElement & HTMLButtonElement>(null);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <VStack alignItems="stretch">
                    <HStack alignItems="start">
                        <FormControl isDisabled={loading}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                            />
                        </FormControl>
                        <FormControl
                            isDisabled={loading}
                            isInvalid={!!formik.errors.date}
                        >
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
                        <FormControl
                            isDisabled={loading}
                            isInvalid={!!formik.errors.time}
                        >
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <Input
                                name="time"
                                id="time"
                                onChange={formik.handleChange}
                                value={formik.values.time}
                                placeholder="00:00"
                            />
                            <FormErrorMessage>
                                {formik.errors.time}
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
                        <Button
                            color="secondary"
                            isLoading={loading}
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            isDisabled={loading}
                            onClick={() => formik.setValues(initialFormValue)}
                        >
                            Reset
                        </Button>
                        <Box flexGrow={1} />
                        <Button isLoading={loading} onClick={openDialog}>
                            Delete
                        </Button>
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader
                                        fontSize="lg"
                                        fontWeight="bold"
                                    >
                                        Delete Event
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure? You can&apos;t undo this
                                        action afterwards.
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button
                                            ref={cancelRef}
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            colorScheme="red"
                                            onClick={() => {
                                                onClose();
                                                onDelete();
                                            }}
                                            ml={3}
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </HStack>
                </VStack>
            </form>
        </>
    );
}

function Registrations(event: GrowEvent) {
    const { registeredUsers, isLoading } = useRegistrationsToEvent(event);

    return (
        <FullTable
            loading={isLoading}
            values={registeredUsers || []}
            idProp="userId"
            heading="Registrations"
        />
    );
}

const EventDetails: NextPageWithLayout = () => {
    const toast = useToast();
    const router = useRouter();
    const eventId = Number.parseInt(router.query.eventId as string);

    const { event } = useGrowEvent(eventId);
    const [editingEvent, setEditingEvent] = useState(event);
    const { updateEvent, isLoading: updating } = useUpdateEvent();
    const { deleteEvent } = useDeleteEvent();

    async function saveEvent(patch: Partial<GrowEvent>) {
        if (!event) return;
        try {
            updateEvent({ ...patch, id: event.id });
            toast({
                title: 'Event saved',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Could not save event',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    async function handleDeleteEvent() {
        try {
            await deleteEvent(eventId);
            router.push('/connect/admin');
        } catch (error) {
            toast({
                title: 'Could not delete event',
                status: 'error',
            });
        }
    }

    return (
        <VStack maxW="container.lg" alignItems="stretch" gap={4}>
            <AdminBreadcrumbs
                route={[
                    ['Events', '/connect/admin/events'],
                    [
                        event?.title || '',
                        `/connect/admin/events/${event?.id}`,
                    ],
                ]}
            />
            <Heading>Event</Heading>
            {event && editingEvent ? (
                <>
                    <VStack alignItems="start">
                        <Heading size="sm">Preview</Heading>
                        <Box maxW="xl">
                            <TimelineEvent event={editingEvent} />
                        </Box>
                    </VStack>
                    <Divider />
                    <EventForm
                        onSubmit={saveEvent}
                        onChange={(updated) =>
                            setEditingEvent({ id: event.id, ...updated })
                        }
                        initialValue={event}
                        loading={updating}
                        onDelete={handleDeleteEvent}
                    />
                    <Divider />
                    <Registrations {...event} />
                </>
            ) : (
                <Spinner />
            )}
        </VStack>
    );
};

export default EventDetails;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
