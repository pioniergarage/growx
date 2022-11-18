import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import {
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Tab,
    Table,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useFullProfiles } from 'modules/admin/hooks';
import { ContactInformation } from 'modules/contactInformation/types';

import { Profile } from 'modules/profile/types';
import { FocusEventHandler, memo, useCallback, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { downloadCSV } from 'utils/csv';
import debounce from 'utils/debounce';

type ProfileModalProps = {
    onClose: () => void;
    isOpen: boolean;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, isOpen }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adjust profile</ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
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
    profile,
    isHidden,
    onEdit,
}: {
    profile: Profile & ContactInformation;
    isHidden: boolean;
    onEdit: () => void;
}) => {
    return (
        <Tr key={profile.userId} hidden={isHidden}>
            <Td>
                {profile.firstName} {profile.lastName}
            </Td>
            <Td>{profile.email}</Td>
            <Td>{profile.phone}</Td>
            <Td>
                <IconButton
                    onClick={onEdit}
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

const ProfileList = (props: { profiles: (Profile & ContactInformation)[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const filter = useCallback(
        (profile: Profile & ContactInformation, term: string) => {
            term = term.toLocaleLowerCase();
            return (
                profile.firstName.toLocaleLowerCase().includes(term) ||
                profile.lastName.toLocaleLowerCase().includes(term) ||
                profile.email.includes(term) ||
                profile.userId.includes(term)
            );
        },
        []
    );

    return (
        <VStack as="ul" alignItems="stretch" overflow="scroll">
            <SearchInput onSearch={setSearchTerm} />
            <TableContainer py={2}>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name ({props.profiles.length})</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.profiles.map((profile) => (
                            <ProfileRow
                                key={profile.userId}
                                profile={profile}
                                isHidden={!filter(profile, searchTerm)}
                                onEdit={onOpen}
                            />
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <ProfileModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
};

export default function ProfilesAdmin() {
    const { profiles, isLoading } = useFullProfiles();

    function downloadProfiles(profiles: (Profile & ContactInformation)[]) {
        downloadCSV(
            [
                'Forename',
                'Surename',
                'Email',
                'Phone',
                'Gender',
                'Country',
                'Studies',
                'Uni',
                'Country of uni',
                'SQ',
                'skills',
            ],
            profiles.map((p) =>
                [
                    p.firstName,
                    p.lastName,
                    p.email,
                    p.phone,
                    p.gender,
                    p.homeland,
                    p.studies,
                    p.university,
                    p.universityCountry,
                    p.keyQualification,
                    p.skills.join(' - '),
                ].map((a) => (a ? a : ''))
            ),
            `profiles.csv`
        );
    }

    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/profiles">
                    Profiles
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>
            {isLoading || !profiles ? (
                <Spinner />
            ) : (
                <Tabs>
                    <TabList overflowX="scroll" pb={1} maxW="100%">
                        <Tab>Participants</Tab>
                        <Tab>Mentors</Tab>
                        <Tab>Experts</Tab>
                        <Tab>Buddies</Tab>
                        <Tab>Orga</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={0}>
                            <ProfileList
                                profiles={profiles.filter(
                                    (p) => p.role === 'PARTICIPANT'
                                )}
                            />
                            <Button
                                onClick={() =>
                                    downloadProfiles(
                                        profiles.filter(
                                            (p) => p.role === 'PARTICIPANT'
                                        )
                                    )
                                }
                            >
                                Download
                            </Button>
                        </TabPanel>
                        <TabPanel px={0}>
                            <ProfileList
                                profiles={profiles.filter(
                                    (p) => p.role === 'MENTOR'
                                )}
                            />
                            <Button
                                onClick={() =>
                                    downloadProfiles(
                                        profiles.filter(
                                            (p) => p.role === 'MENTOR'
                                        )
                                    )
                                }
                            >
                                Download
                            </Button>
                        </TabPanel>
                        <TabPanel px={0}>
                            <ProfileList
                                profiles={profiles.filter(
                                    (p) => p.role === 'EXPERT'
                                )}
                            />
                        </TabPanel>
                        <TabPanel px={0}>
                            <ProfileList
                                profiles={profiles.filter(
                                    (p) => p.role === 'BUDDY'
                                )}
                            />
                        </TabPanel>
                        <TabPanel px={0}>
                            <ProfileList
                                profiles={profiles.filter(
                                    (p) => p.role === 'ORGA'
                                )}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
