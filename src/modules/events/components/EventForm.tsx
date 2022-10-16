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
import { EventType, GrowEvent } from '../types';

type EventFormProps = {
    onSubmit: (value: Omit<GrowEvent, 'id'>) => void | Promise<unknown>;
    onChange: (value: Omit<GrowEvent, 'id'>) => void;
    onCancel: () => void;
    initialValue: GrowEvent;
    loading: boolean;
    onDelete: () => void;
};

type EventFormType = Omit<GrowEvent, 'date'> & {
    date: string;
    time: string;
};

function formValueToGrowEvent(value: EventFormType): Omit<GrowEvent, 'id'> {
    const { date: dateString, time, ...rest } = value;
    const date = new Date(`${dateString}T${time}`);
    return { ...rest, date: new Date(date.getTime() + 1000 * 60 * 60) }; // temp fix: add 1 hour
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
    loading,
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
                                borderColor={
                                    formik.values.title !==
                                    initialFormValue.title
                                        ? 'green.200'
                                        : undefined
                                }
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
                        <FormControl isDisabled={loading}>
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

                        <FormControl isDisabled={loading}>
                            <Switch
                                id="mandatory"
                                isChecked={formik.values.mandatory}
                                onChange={formik.handleChange}
                            >
                                Mandatory
                            </Switch>
                        </FormControl>
                        <FormControl isDisabled={loading}>
                            <Switch
                                id="sq_mandatory"
                                isChecked={formik.values.sq_mandatory}
                                onChange={formik.handleChange}
                            >
                                Mandatory for SQ
                            </Switch>
                        </FormControl>
                    </HStack>
                    <FormControl isDisabled={loading}>
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
                            isLoading={loading}
                            type="submit"
                        >
                            Save
                        </Button>
                        <Button
                            isDisabled={loading}
                            onClick={() => {
                                formik.setValues(initialFormValue);
                                onCancel();
                            }}
                        >
                            Cancel
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
