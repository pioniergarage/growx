// Component for the Ajust Event form

// TODOO copyed from adjust Event.
import {
    Button, FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
// import { Sponsor } from 'model';
import { GrowEvent } from 'model';
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
                <ModalHeader>Adjust Sponsor</ModalHeader>
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
                                setEvent({ ...event, description: e.target.value })
                            }
                            placeholder="Little Discription"
                        />
                    </FormControl>


                    <FormControl mt={4}>
                        <FormLabel>mandatory</FormLabel>
                        <Input
                            type="checkbox"
                            checked={event.mandatory}
                            onChange={(e) =>
                                setEvent({ ...event, mandatory: e.target.checked })
                            }
                            // placeholder="http://dsjflsdafj.dsafjlk.jpg"
                        />
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
                        <FormHelperText>The place where the event takes place</FormHelperText>
                    </FormControl>


                    // todo droped down select menu !!!!!!!!!!!!!!!!
                    <FormControl>
                        <FormLabel>Is it mandatory for Schlüsselqualifikation</FormLabel>
                        <Input
                            value={event.sq_mandatory}
                            onChange{(e) => 
                                setEvent({...event, sq_mandatory: e.target.value})
                            }
                            />
                        <FormHelperText>Some events are mandatory for Schlüsselqualifikation qualification</FormHelperText>
                    </FormControl>
                
                    



                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => onSave(sponsor)} mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button onClick={onDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EventModal;
