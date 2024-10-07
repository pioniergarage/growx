import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Select,
    Switch,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useFormik } from 'formik';

import { useRef } from 'react';
import { EventType, GrowEvent, GrowEventWithSeats } from '../types';

type EventFormProps = {
    onSubmit: (value: GrowEvent) => void;
    onChange: (value: Omit<GrowEvent, 'id'>) => void;
    onCancel: () => void;
    onDelete: () => void;
    initialValue: GrowEventWithSeats;
    isLoading: boolean;
};

type EventFormType = Omit<GrowEventWithSeats, 'date'> & {
    date: string;
    time: string;
};

function formValueToGrowEvent(value: EventFormType, id: number): GrowEvent {
    const { date: dateString, time, ...rest } = value;
    const date = new Date(`${dateString}T${time}`);
    return { ...rest, date: new Date(date.getTime()), id };
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

export default function EventForm({
    onSubmit,
    onChange,
    initialValue,
    isLoading,
    onDelete,
    onCancel,
}: EventFormProps) {
    const initialFormValue: EventFormType = {
        ...initialValue,
        date: formatDate(initialValue.date),
        time: formatTime(initialValue.date),
    };

    const formik = useFormik<EventFormType>({
        initialValues: initialFormValue,
        onSubmit: (formValue) =>
            onSubmit(formValueToGrowEvent(formValue, initialValue.id)),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.date.match(/^\d{4}-\d\d-\d\d$/))
                errors.date = 'Wrong format: Use yyyy-MM-dd';
            if (!values.time.match(/^\d\d:\d\d$/))
                errors.time = 'Wrong format: Use HH:mm';
            if (Object.entries(errors).length === 0) {
                onChange(formValueToGrowEvent(values, initialValue.id));
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
                        <FormControl isDisabled={isLoading}>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                name="title"
                                id="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                borderColor={
                                    formik.values.title !==
                                        initialFormValue.title
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                        </FormControl>
                        <FormControl
                            isDisabled={isLoading}
                            isInvalid={!!formik.errors.date}
                        >
                            <FormLabel htmlFor="date">Date</FormLabel>
                            <Input
                                name="date"
                                id="date"
                                onChange={formik.handleChange}
                                value={formik.values.date}
                                placeholder="2022-08-01"
                                borderColor={
                                    formik.values.date !== initialFormValue.date
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                            <FormErrorMessage>
                                {formik.errors.date}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isDisabled={isLoading}
                            isInvalid={!!formik.errors.time}
                        >
                            <FormLabel htmlFor="time">Time</FormLabel>
                            <Input
                                name="time"
                                id="time"
                                onChange={formik.handleChange}
                                value={formik.values.time}
                                placeholder="00:00"
                                borderColor={
                                    formik.values.time !== initialFormValue.time
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                            <FormErrorMessage>
                                {formik.errors.time}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isDisabled={isLoading}
                            isInvalid={!!formik.errors.duration}
                        >
                            <FormLabel htmlFor="time">Duration</FormLabel>
                            <Input
                                name="duration"
                                id="duration"
                                onChange={formik.handleChange}
                                value={formik.values.duration}
                                placeholder="0"
                                borderColor={
                                    formik.values.duration !==
                                        initialFormValue.duration
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                            <FormErrorMessage>
                                {formik.errors.time}
                            </FormErrorMessage>
                            <FormHelperText>in minutes</FormHelperText>
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl isDisabled={isLoading}>
                            <FormLabel htmlFor="location">Location</FormLabel>
                            <Input
                                name="location"
                                id="location"
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                borderColor={
                                    formik.values.location !==
                                        initialFormValue.location
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                        </FormControl>
                        <FormControl isDisabled={isLoading}>
                            <FormLabel htmlFor="availableSeats">
                                Available Seats
                            </FormLabel>
                            <Input
                                name="availableSeats"
                                id="availableSeats"
                                onChange={formik.handleChange}
                                value={formik.values.availableSeats}
                                borderColor={
                                    formik.values.availableSeats !==
                                        initialFormValue.availableSeats
                                        ? 'green.200'
                                        : undefined
                                }
                            />
                        </FormControl>
                    </HStack>
                    <HStack alignItems="end" gap={4}>
                        <FormControl mt={6}>
                            <FormLabel>How to participate</FormLabel>
                            <Select
                                id="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                            >
                                <option value={EventType.Online}>
                                    {EventType.Online}
                                </option>
                                <option value={EventType.Offline}>
                                    {EventType.Offline}
                                </option>
                                <option value={EventType.Hybrid}>
                                    {EventType.Hybrid}
                                </option>
                            </Select>
                        </FormControl>

                        <FormControl isDisabled={isLoading}>
                            <Switch
                                id="mandatory"
                                isChecked={formik.values.mandatory}
                                onChange={formik.handleChange}
                            >
                                Mandatory
                            </Switch>
                        </FormControl>
                    </HStack>
                    <FormControl isDisabled={isLoading}>
                        <FormLabel htmlFor="description">Description</FormLabel>
                        <Textarea
                            name="description"
                            id="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            borderColor={
                                formik.values.description !==
                                    initialFormValue.description
                                    ? 'green.200'
                                    : undefined
                            }
                        />
                        <FormErrorMessage>
                            {formik.errors.description}
                        </FormErrorMessage>
                    </FormControl>
                    <HStack>
                        <Button
                            color="secondary"
                            isLoading={isLoading}
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            isDisabled={isLoading}
                            onClick={() => {
                                formik.setValues(initialFormValue);
                                onCancel();
                            }}
                        >
                            Cancel
                        </Button>
                        <Box flexGrow={1} />
                        <Button isLoading={isLoading} onClick={openDialog}>
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
