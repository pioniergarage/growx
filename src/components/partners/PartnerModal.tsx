import {
    Button,
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
import { Sponsor } from 'model';
import { useEffect, useState } from 'react';

interface PartnerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (sponsor: Omit<Sponsor, 'id'>) => void;
    onDelete: () => void;
    initialValue: Omit<Sponsor, 'id'>;
}

const PartnerModal: React.FC<PartnerModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialValue,
}) => {
    const [sponsor, setSponsor] = useState(initialValue);
    useEffect(() => setSponsor(initialValue), [initialValue]);
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
                            value={sponsor.name}
                            onChange={(e) =>
                                setSponsor({ ...sponsor, name: e.target.value })
                            }
                            placeholder="XYZ Gmbh"
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Link</FormLabel>
                        <Input
                            value={sponsor.link}
                            onChange={(e) =>
                                setSponsor({ ...sponsor, link: e.target.value })
                            }
                            placeholder="http://dsjflsdafj.dsafjlk.de"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Logo</FormLabel>
                        <Input
                            value={sponsor.logo}
                            onChange={(e) =>
                                setSponsor({ ...sponsor, logo: e.target.value })
                            }
                            placeholder="http://dsjflsdafj.dsafjlk.jpg"
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Type</FormLabel>
                        <Input
                            type="number"
                            value={sponsor.type}
                            onChange={(e) =>
                                setSponsor({
                                    ...sponsor,
                                    type: Number.parseInt(e.target.value),
                                })
                            }
                            placeholder="1"
                        />
                        <FormHelperText>1 = GOLD, 2 = SILVER</FormHelperText>
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

export default PartnerModal;
