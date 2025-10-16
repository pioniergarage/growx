// Component for the Ajust Sponsor form

import { useSupabaseClient } from '@/components/providers/SupabaseProvider';
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Image,
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

import { uploadLogo } from 'modules/sponsor/api';
import { useEffect, useState } from 'react';
import FileSelect from '../../../components/FileSelect';
import { Sponsor } from '../types';

interface SponsorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (sponsor: Omit<Sponsor, 'id'>) => void;
    onDelete: () => void;
    initialValue: Omit<Sponsor, 'id'>;
}

const SponsorModal: React.FC<SponsorModalProps> = ({
    isOpen,
    onClose,
    onSave,
    onDelete,
    initialValue,
}) => {
    const supabaseClient = useSupabaseClient();
    const [sponsor, setSponsor] = useState(initialValue);
    useEffect(() => setSponsor(initialValue), [initialValue]);

    const onUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) {
            return;
        }

        const url = await uploadLogo(supabaseClient, files[0].name, files[0]);
        setSponsor({ ...sponsor, logo: url });
    };

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
                        <HStack>
                            <Input
                                value={sponsor.logo}
                                onChange={(e) =>
                                    setSponsor({
                                        ...sponsor,
                                        logo: e.target.value,
                                    })
                                }
                                placeholder="http://dsjflsdafj.dsafjlk.jpg"
                            />

                            <FileSelect onSelect={onUpload}>
                                <Button variant="outline">Upload</Button>
                            </FileSelect>
                        </HStack>
                        {sponsor.logo && (
                            <Image
                                mt={2}
                                alt="Sponsor logo preview"
                                src={sponsor.logo}
                                maxH={100}
                            />
                        )}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Type</FormLabel>
                        {/** TODO Why is this hardcoded? Can this be automatically generated from the Supabase types? */}
                        <Select
                            onChange={(e) =>
                                setSponsor({
                                    ...sponsor,
                                    type: e.target.value as Sponsor['type'],
                                })
                            }
                            defaultValue="BRONZE">
                            <option value="BRONZE">Bronze</option>
                            <option value="SILVER">Silver</option>
                            <option value="GOLD">Gold</option>
                            <option value="FLAGSHIP">Flagship</option>
                            <option value="SUPPORTER">Supporter</option>
                            <option value="PATRON">Patron</option>
                        </Select>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={() => onSave(sponsor)} mr={3}>
                        Save
                    </Button>
                    <Button onClick={onDelete} mr={3} colorScheme="red">
                        Delete
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SponsorModal;
