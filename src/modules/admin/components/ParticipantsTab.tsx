import {
    Box,
    Button,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack
} from '@chakra-ui/react';
import { FullProfile } from 'modules/profile/types';
import {
    FocusEventHandler,
    memo,
    useCallback,
    useMemo,
    useState
} from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import debounce from 'utils/debounce';
import { downloadProfiles } from '../utils';

type ProfileModalProps = {
    onClose: () => void;
    isOpen: boolean;
    profile?: FullProfile;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
    onClose,
    isOpen,
    profile,
}) => {

    const handleSave = async () => {
        if (!profile) {
            return;
        }
        onClose();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {profile && (
                    <>
                        <ModalHeader>Adjust profile</ModalHeader>
                        <ModalBody>
                            <SimpleGrid columns={2} rowGap={4} columnGap={2}>
                                <Box>
                                    {profile.firstName + ' ' + profile.lastName}
                                </Box>
                                <Box>{profile.email}</Box>
                            </SimpleGrid>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleSave} mr={2}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

const SearchInput = ({ onSearch }: { onSearch: (value: string) => void }) => {
    const handleChange: FocusEventHandler<HTMLInputElement> = (e) => {
        const { value } = e.target;
        handleSearch(value);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(
        debounce((val: string) => {
            onSearch(val);
        }, 500),
        []
    );
    return <Input placeholder="Search" onChange={handleChange} size="sm" />;
};

const ProfileRowUnmemod = ({
    firstName,
    lastName,
    email,
    phone,
    isHidden,
    onEdit,
    userId,
}: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    isHidden: boolean;
    onEdit: (userId: string) => void;
}) => {
    return (
        <Tr hidden={isHidden}>
            <Td>
                {firstName} {lastName}
            </Td>
            <Td>{email}</Td>
            <Td>{phone}</Td>
            <Td>
                <IconButton
                    onClick={() => onEdit(userId)}
                    variant="ghost"
                    size="2xs"
                    aria-label="more"
                    icon={<FaEllipsisH />}
                />
            </Td>
        </Tr>
    );
};
const ProfileRow = memo(ProfileRowUnmemod);

const ParticipantsTab = (props: { profiles: FullProfile[] }) => {
    const participants = useMemo(
        () => props.profiles.filter((p) => p.role === 'PARTICIPANT'),
        [props.profiles]
    );
    const [searchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profileOnEdit, setProfileOnEdit] = useState<FullProfile>();

    const filter = useCallback(
        (profile: FullProfile, term: string) => {
            term = term.toLocaleLowerCase();
            return (
                (profile.firstName.toLocaleLowerCase().includes(term) ||
                    profile.lastName.toLocaleLowerCase().includes(term) ||
                    profile.email.includes(term) ||
                    profile.userId.includes(term))
            );
        },
        []
    );

    const handleEdit = useCallback(
        (userId: string) => {
            const profile = participants.find((p) => p.userId === userId);
            setProfileOnEdit(profile);
            onOpen();
        },
        [onOpen, participants]
    );

    return (
        <VStack as="ul" alignItems="stretch" overflow="scroll">
            <HStack>
                <SearchInput onSearch={setSearchTerm} />
                <Button
                    size="sm"
                    onClick={() => downloadProfiles(participants)}
                >
                    Download
                </Button>
            </HStack>
            <TableContainer py={2}>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {participants.map((profile) => (
                            <ProfileRow
                                key={profile.userId}
                                userId={profile.userId}
                                firstName={profile.firstName}
                                lastName={profile.lastName}
                                email={profile.email}
                                phone={profile.phone}
                                isHidden={!filter(profile, searchTerm)}
                                onEdit={handleEdit}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <ProfileModal
                isOpen={isOpen}
                onClose={onClose}
                profile={profileOnEdit}
            />
        </VStack>
    );
};

export default ParticipantsTab;
