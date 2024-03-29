import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { FullProfile } from 'modules/profile/types';
import { useMemo } from 'react';
import { downloadProfiles } from '../utils';

type MentorsTabProps = {
    profiles: FullProfile[];
};

const MentorsTab: React.FC<MentorsTabProps> = ({ profiles }) => {
    const mentors = useMemo(
        () => profiles.filter((p) => p.role === 'MENTOR'),
        [profiles]
    );
    return (
        <VStack alignItems="stretch">
            <Flex>
                <Button size="sm" onClick={() => downloadProfiles(mentors)}>
                    Download
                </Button>
            </Flex>
            <TableContainer py={2}>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {mentors.map((mentor) => (
                            <Tr key={mentor.userId}>
                                <Td>
                                    {mentor.firstName + ' ' + mentor.lastName}
                                </Td>
                                <Td>{mentor.email}</Td>
                                <Td>{mentor.phone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </VStack>
    );
};

export default MentorsTab;
