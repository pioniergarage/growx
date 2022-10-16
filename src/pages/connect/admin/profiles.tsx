import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    Heading,
    MenuButton,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import ChangeRoleMenu from 'modules/profile/components/ChangeRole';
import { useProfiles } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import { useState } from 'react';
import { downloadCSV } from 'utils/csv';

const ProfileList = (props: { profiles: Profile[] }) => {
    const [isMenuVisible, setMenuVisible] = useState<string | null>(null);
    const [isOpen, setOpen] = useState<string | null>(null);

    return (
        <VStack as="ul" alignItems="stretch" overflow="scroll">
            <TableContainer py={2}>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
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
    const { profiles, isLoading } = useProfiles();

    function downloadProfiles(profiles: Profile[]) {
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
            <AdminBreadcrumbs
                route={[['Profiles', '/connect/admin/profiles']]}
            />
            {isLoading || !profiles ? (
                <Spinner />
            ) : (
                <VStack alignItems="stretch" gap={8}>
                    <Box>
                        <Flex justifyContent="space-between" mb={1}>
                            <Heading size="md">Participants</Heading>

                            <Button
                                onClick={() =>
                                    downloadProfiles(
                                        profiles.filter(
                                            (p) => p.role === 'PARTICIPANT'
                                        )
                                    )
                                }
                                size="sm"
                                variant="link"
                            >
                                Download
                            </Button>
                        </Flex>
                        <ProfileList
                            profiles={profiles.filter(
                                (p) => p.role === 'PARTICIPANT'
                            )}
                        />
                    </Box>
                    <Box>
                        <Heading size="md">Mentors</Heading>
                        <ProfileList
                            profiles={profiles.filter(
                                (p) => p.role === 'MENTOR'
                            )}
                        />
                    </Box>
                    <Box>
                        <Heading size="md">Experts</Heading>
                        <ProfileList
                            profiles={profiles.filter(
                                (p) => p.role === 'EXPERT'
                            )}
                        />
                    </Box>
                    <Box>
                        <Heading size="md">Buddies</Heading>
                        <ProfileList
                            profiles={profiles.filter(
                                (p) => p.role === 'BUDDY'
                            )}
                        />
                    </Box>
                    <Box>
                        <Heading size="md">Orga</Heading>
                        <ProfileList
                            profiles={profiles.filter((p) => p.role === 'ORGA')}
                        />
                    </Box>
                </VStack>
            )}
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
