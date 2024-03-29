import {
    Box,
    Button,
    Flex,
    Heading,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import UserAvatar from 'modules/avatar/components/UserAvatar';
import { ContactInformation } from 'modules/contactInformation/types';
import { Profile } from 'modules/profile/types';
import { FaLaptop } from 'react-icons/fa';
import { downloadCSV } from 'utils/csv';
import { useRegistrationsToEvent } from '../hooks';
import { GrowEvent } from '../types';

type RegistraionsProps = {
    eventId: GrowEvent["id"];
    eventName: string;
};

const Registrations: React.FC<RegistraionsProps> = ({ eventId, eventName }) => {
    const { registrations } = useRegistrationsToEvent(eventId);

    function downloadRegistrations(
        registrations: {
            present: boolean;
            profile: Profile;
            contact_information: ContactInformation;
        }[] = []
    ) {
        downloadCSV(
            ['name', 'email', 'phone', 'online/person', 'role'],
            registrations.map(({ present, profile, contact_information }) => [
                profile.firstName + ' ' + profile.lastName,
                contact_information.email,
                contact_information.phone || '',
                present ? 'in person' : 'online',
                profile.role,
            ]),
            `${eventName}-registrations.csv`
        );
    }

    return (
        <Box>
            <Flex justifyContent="space-between">
                <Heading size="sm" mb={2}>
                    {registrations?.length || 0} Registrations
                </Heading>
                <Button
                    onClick={() => downloadRegistrations(registrations)}
                    disabled={!registrations}
                    size="sm"
                    variant="link"
                >
                    Download as CSV
                </Button>
            </Flex>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th />
                            <Th>Name</Th>
                            <Th>Online</Th>
                            <Th>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations?.map((r) => (
                            <Tr key={r.profile.userId}>
                                <Td py={0}>
                                    <UserAvatar profile={r.profile} size="sm" />
                                </Td>
                                <Td>
                                    {r.profile.firstName +
                                        ' ' +
                                        r.profile.lastName}
                                    {r.profile.role != 'PARTICIPANT' && (
                                        <Tag size="sm" ml={2}>
                                            {r.profile.role}
                                        </Tag>
                                    )}
                                </Td>
                                <Td>{r.present ? <FaLaptop /> : undefined}</Td>
                                <Td>{r.contact_information.email}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Registrations;
