import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Button,
    MenuButton,
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
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useFullProfiles } from 'modules/admin/hooks';
import { ContactInformation } from 'modules/contactInformation/types';

import ChangeRoleMenu from 'modules/profile/components/ChangeRole';
import { Profile } from 'modules/profile/types';
import { useState } from 'react';
import { downloadCSV } from 'utils/csv';

const ProfileList = (props: { profiles: (Profile & ContactInformation)[] }) => {
    const [isMenuVisible, setMenuVisible] = useState<string | null>(null);
    const [isOpen, setOpen] = useState<string | null>(null);

    return (
        <VStack as="ul" alignItems="stretch" overflow="scroll">
            <TableContainer py={2}>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name ({props.profiles.length})</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>Gender</Th>
                            <Th>Adjust Role</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.profiles.map((profile) => (
                            <Tr
                                key={profile.userId}
                                onMouseEnter={() =>
                                    setMenuVisible(profile.userId)
                                }
                                onMouseLeave={() => {
                                    setMenuVisible(null);
                                    setOpen(null);
                                }}
                            >
                                <Td>
                                    {profile.firstName} {profile.lastName}
                                </Td>
                                <Td>{profile.email}</Td>
                                <Td>{profile.phone}</Td>
                                <Td>{profile.gender}</Td>
                                <Td>
                                    <ChangeRoleMenu
                                        isOpen={
                                            isMenuVisible === profile.userId &&
                                            isOpen === profile.userId
                                        }
                                        onClose={() => {
                                            setOpen(null);
                                            setMenuVisible(null);
                                        }}
                                        profile={profile}
                                    >
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<ChevronDownIcon />}
                                            size="sm"
                                            visibility={
                                                isMenuVisible === profile.userId
                                                    ? 'visible'
                                                    : 'hidden'
                                            }
                                            onClick={() =>
                                                setOpen(profile.userId)
                                            }
                                        >
                                            Role
                                        </MenuButton>
                                    </ChangeRoleMenu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
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
