import {
    Box,
    Button,
    FormControl,
    FormLabel,
    GridItem,
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
    Switch,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FullProfile } from 'modules/profile/types';
import {
    FocusEventHandler,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import debounce from 'utils/debounce';
import { useUpsertMatriculation } from '../hooks';
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
    const [matriculation, setMatriculation] = useState(
        profile?.matriculation || ''
    );
    const { upsertMatriculation } = useUpsertMatriculation();
    useEffect(
        () => setMatriculation(profile?.matriculation || ''),
        [profile?.matriculation]
    );

    const handleSave = async () => {
        if (!profile) {
            return;
        }
        const { userId } = profile;
        await upsertMatriculation({ userId, matriculation });
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
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel>Matriculation</FormLabel>
                                        <Input
                                            value={matriculation}
                                            onChange={(e) =>
                                                setMatriculation(e.target.value)
                                            }
                                        />
                                    </FormControl>
                                </GridItem>
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
    matriculation,
    isHidden,
    onEdit,
    sq,
    userId,
}: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    matriculation?: string;
    isHidden: boolean;
    sq: boolean;
    onEdit: (userId: string) => void;
}) => {
    return (
        <Tr hidden={isHidden}>
            <Td>
                {firstName} {lastName}
                {sq && (
                    <Tag ml={1} size="sm" fontSize="xs">
                        SQ
                    </Tag>
                )}
            </Td>
            <Td>{email}</Td>
            <Td>{phone}</Td>
            <Td>{matriculation}</Td>
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
    const [sqOnly, setSQOnly] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [profileOnEdit, setProfileOnEdit] = useState<FullProfile>();

    const filter = useCallback(
        (profile: FullProfile, term: string, sqOnly: boolean) => {
            term = term.toLocaleLowerCase();
            return (
                (!sqOnly || profile.keyQualification) &&
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
                <Switch
                    isChecked={sqOnly}
                    onChange={() => setSQOnly(!sqOnly)}
                    size="sm"
                    w={36}
                >
                    SQ only
                </Switch>
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
                            <Th>Matr.</Th>
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
                                matriculation={profile.matriculation}
                                isHidden={!filter(profile, searchTerm, sqOnly)}
                                onEdit={handleEdit}
                                sq={profile.keyQualification}
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
