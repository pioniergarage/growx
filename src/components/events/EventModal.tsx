// Component for the Ajust and create Event modl
import {
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
} from '@chakra-ui/react';
import { EventType, GrowEvent } from 'model';
import { useEffect, useState } from 'react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Omit<GrowEvent, 'id'>) => void;
    onDelete: () => void;
    initialValue: Omit<GrowEvent, 'id'> & { id?: number };
    onCreate: (event: Omit<GrowEvent, 'id'>) => void;
}

// Adjust:

const adjustTitleText = 'Adjust Event';
const createTitleText = 'Create new Event';

const SavebuttonText = 'Save';
const CreatebuttonText = 'Create';

/**
 * Get the Window Headline for modal, if the event will create or adjust.
 * @param id is the checking parameter. new events has undefined id.
 * @returns if the id is undefine return create Title String, otherwise return the adjust title String
 */
function getThemeText(id: number | undefined) {
    if (id === undefined) {
        // id is empty -> create new Event
        return createTitleText;
    } else {
        return adjustTitleText;
    }
}

const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onCreate,
    onDelete,
    initialValue,
}) => {
    const [event, setEvent] = useState(initialValue);
    useEffect(() => setEvent(initialValue), [initialValue]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{getThemeText(event.id)}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={event.title}
                            onChange={(e) =>
                                setEvent({ ...event, title: e.target.value })
                            }
                            placeholder="Enter Title"
                        />
                    </FormControl>
                    <FormControl mt={6}>
                        <FormLabel>Description</FormLabel>
                        <Input
                            value={event.description}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Discribe the event here"
                        />
                    </FormControl>
                    <FormControl mt={6}>
                        <Checkbox
                            isChecked={event.mandatory}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    mandatory: e.target.checked,
                                })
                            }
                        >
                            Mandatory
                        </Checkbox>
                    </FormControl>

                    <FormControl mt={6}>
                        <Checkbox
                            isChecked={event.sq_mandatory}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    sq_mandatory: e.target.checked,
                                })
                            }
                        >
                            Mandatory for Schlüsselqualifikation
                        </Checkbox>
                        <FormHelperText>
                            Some events are mandatory for Schlüsselqualifikation
                            qualification
                        </FormHelperText>
                    </FormControl>

                    <FormControl mt={6}>
                        <FormLabel>Location</FormLabel>
                        <Input
                            value={event.location}
                            onChange={(e) =>
                                setEvent({ ...event, location: e.target.value })
                            }
                            placeholder="Launchpad"
                        />
                        <FormHelperText>
                            The place where the event takes place
                        </FormHelperText>
                    </FormControl>

                    <FormControl mt={6}>
                        <FormLabel>How to participate</FormLabel>
                        <Select
                            name="SelectEventSQMandatory"
                            value={event.type}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    type: e.target.value as EventType,
                                })
                            }
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
                </ModalBody>

                <ModalFooter>
                    {event.id === undefined ? (
                        <Button onClick={() => onCreate(event)}>Create</Button>
                    ) : (
                        <Button onClick={() => onSave(event)}>Save</Button>
                    )}
                    <Button
                        onClick={onDelete}
                        colorScheme="red"
                        hidden={event.id === undefined}
                        ml={3}
                    >
                        Delete
                    </Button>
                    <Button onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventModal;
