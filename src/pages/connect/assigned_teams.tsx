import {
    Box,
    Flex,
    Heading,
    LinkBox,
    LinkOverlay,
    Spinner,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useGetAssignedTeamLeads } from 'modules/mentor/hooks';

const AssignedTeamsPage: React.FC = () => {
    const { teamLeads, isLoading } = useGetAssignedTeamLeads();

    if (isLoading) {
        return <Spinner />;
    }

    if (teamLeads?.length === 0) {
        return <Box color="gray.400">No teams assigned yet</Box>;
    }

    return (
        <Flex flexDir="column" gap={4}>
            <Box color="gray.400">Assigned Teams</Box>
            <Flex as="ul" flexDir="column" gap={6}>
                {(teamLeads ?? []).map((team) => (
                    <LinkBox key={team.team_id}>
                        <Box as="li">
                            <LinkOverlay
                                href={'/connect/teams/' + team.team_id}
                            >
                                <Heading size="sm">{team.name}</Heading>
                            </LinkOverlay>
                            <Flex gap={2} color="gray.400">
                                {[
                                    team.first_name + ' ' + team.last_name,
                                    team.email,
                                    team.phone,
                                ].map((el, i, arr) => (
                                    <>
                                        <Box as="span">{el}</Box>
                                        {i !== arr.length - 1 && <>&bull;</>}
                                    </>
                                ))}
                            </Flex>
                        </Box>
                    </LinkBox>
                ))}
            </Flex>
        </Flex>
    );
};

export default AssignedTeamsPage;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
