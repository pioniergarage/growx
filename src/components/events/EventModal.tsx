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
    initialValue: Omit<GrowEvent, 'id'> & { id?: number };
    onCreate: (event: Omit<GrowEvent, 'id'>) => void;
}

// TODO: delete Commits
// View Theme properties
// Modal view type
/*
enum ModalViewType {
    adjust = 'adjust',
    create = 'create',
}
*/

// Adjust:

const adjustTitleText = 'Adjust Event';
const createTitleText = 'Create New Event';

const SavebuttonText = 'Save';
const CreatebuttonText = 'Create';

/*
function getThemeText1(viewTheme: ModalViewType) {
    switch (viewTheme) {
        case ModalViewType.adjust:
            return adjustTitleText;
        case ModalViewType.create:
            return createTitleText;
    }
}
*/

/**
 * Get the Window Headline of the modal, if the event will create or adjust.
 * @param id event id
 * @returns if the id is undefine return create Title String, otherwiese return the adjust title String
 */
function getThemeText(id: number | undefined) {
    if (isIdUndefined(id)) {
        // id is empty -> create new Event
        return createTitleText;
    } else {
        return adjustTitleText;
    }
}

function getButtonText(id: number | undefined) {
    if (isIdUndefined(id)) {
        return CreatebuttonText;
    } else {
        return SavebuttonText;
    }
}

/* 
function getButtonAction(event) {
    if (isIdUndefined(event.id)) {
        return;
    } else {
        return () => onSave(event);
    }
}

function isViewThemeEqual(
    viewTheme1: ModalViewType,
    viewTheme2: ModalViewType
) {
    if (viewTheme1 == viewTheme2) {
        return true;
    } else {
        return false;
    }
}
*/

/**
 * Check if the event id is valid
 * @param id: the event id
 * @returns true if the id is valid, otherwise false
 */
function isIdUndefined(id: number | undefined) {
    if (id == undefined) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * date: Date
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
    onCreate,
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
                <ModalHeader>{getThemeText(event.id)}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            value={event.title}
                            onChange={(e) =>
                                // setSponsor({ ...event, name: e.target.value })

                                // TODO?
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
                        <FormLabel>Mandatory</FormLabel>
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

                    <FormControl mt={6}>
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
                    <Button
                        onClick={() => {
                            if (isIdUndefined(event.id)) {
                                onCreate(event);
                            } else {
                                onSave(event);
                            }
                        }}
                        mr={3}
                    >
                        {getButtonText(event.id)}
                    </Button>
                    <Button
                        onClick={onDelete}
                        colorScheme="red"
                        mr={3}
                        disabled={isIdUndefined(event.id)}
                    >
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
