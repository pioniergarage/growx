// Component for the Ajust Event form

// TODOO copyed from adjust Event.
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
} from '@chakra-ui/react';
// import { Sponsor } from 'model';
import { EventType, GrowEvent } from 'model';
import { useEffect, useState } from 'react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Omit<GrowEvent, 'id'>) => void;
    onDelete: () => void;
    initialValue: Omit<GrowEvent, 'id'>;
}

/**
 * 
 * date: Date;
    id: number;
    Done: title: string; 
    DONE: description: string;
    mandatory: boolean;
    location?: string;
    sq_mandatory?: boolean;
    type?: EventType;
 */

// const PartnerModal: React.FC<PartnerModalProps> = ({
const EventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialValue,
}) => {
    //  const [sponsor, setSponsor] = useState(initialValue);
    const [event, setEvent] = useState(initialValue);
    useEffect(() => setEvent(initialValue), [initialValue]);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adjust Event</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            value={event.title}
                            onChange={(e) =>
                                // setSponsor({ ...event, name: e.target.value })

                                // TODO?
                                setEvent({ ...event, title: e.target.value })
                            }
                            placeholder="XYZ Gmbh"
                        />
                    </FormControl>
                    <FormControl mt={4}>
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
                    <FormControl mt={4}>
                        <FormLabel>mandatory</FormLabel>
                        <Checkbox
                            isChecked={event.mandatory}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    mandatory: e.target.checked,
                                })
                            }
                        ></Checkbox>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>
                            Mandatory for Schlüsselqualifikation
                        </FormLabel>
                        <Checkbox
                            isChecked={event.sq_mandatory}
                            onChange={(e) =>
                                setEvent({
                                    ...event,
                                    sq_mandatory: e.target.checked,
                                })
                            }
                        ></Checkbox>
                        <FormHelperText>
                            Some events are mandatory for Schlüsselqualifikation
                            qualification
                        </FormHelperText>
                    </FormControl>

                    <FormControl mt={4}>
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

                    <FormControl>
                        <FormLabel>How to participate</FormLabel>
                        <select
                            name="SelectEventSQMandatory"
                            placeholder="Select event type"
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
                        </select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => onSave(event)} mr={3}>
                        Save
                    </Button>
                    <Button onClick={onDelete} colorScheme="red" mr={3}>
                        Delete
                    </Button>
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventModal;
