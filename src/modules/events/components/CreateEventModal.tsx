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
} from '@chakra-ui/react';

import { useState } from 'react';
import { GrowEvent } from '../types';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (event: Omit<GrowEvent, 'id'>) => void;
    initialValue?: Partial<GrowEvent>;
}

const emptyEvent = {
    title: '',
    description: '',
    mandatory: false,
    location: '',
    date: new Date(),
    duration: 0,
    availableSeats: 0,
};

const CreateEventModal: React.FC<EventModalProps> = ({
    isOpen,
    onClose,
    initialValue,
}) => {
    const [event, setEvent] = useState({ ...emptyEvent, ...initialValue });
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Event</ModalHeader>
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
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} ml={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateEventModal;
