import UserAvatar from '@/components/avatar/UserAvatar';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import TeamLogo from '@/components/teams/TeamLogo';
import { Box, Flex, Grid, Spinner, Tag, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useAllTeams, useTeamMembers } from 'hooks/team';
import { Team } from 'model';
import { useMemo } from 'react';

const AvatarList = (props: { team: Team }) => {
    const { members } = useTeamMembers(props.team.id);
    return (
        <Flex alignItems="center" gap={1}>
            {members?.map((m) => (
                <UserAvatar
                    key={m.userId}
                    firstName={m.firstName}
                    lastName={m.lastName}
                    avatar={m.avatar}
                    userId={m.userId}
                    size="sm"
                />
            ))}
        </Flex>
    );
};

const TeamTable = (props: { teams: Team[] }) => {
    const activeTeams = useMemo(
        () => props.teams.filter((t) => !t.archived),
        [props.teams]
    );
    return (
        <Flex alignItems="stretch" flexDir="column">
            <Grid
                gridTemplateColumns="1fr 10rem"
                color="gray.400"
                px={4}
                py={3}
                fontSize={14}
            >
                <Box>{activeTeams.length} Teams</Box>
                <Box>Members</Box>
            </Grid>
            {activeTeams.map((team) => (
                <Grid
                    key={team.id}
                    gridTemplateColumns="1fr 10rem"
                    px={4}
                    borderTop="1px"
                    borderColor="whiteAlpha.300"
                    py={2}
                >
                    <Flex fontWeight="semibold" alignItems="center" gap={2}>
                        <TeamLogo {...team} size={10} />
                        <Flex flexDir="column">
                            {team.name}
                            <Flex gap={1}>
                                {team.requestSupport.map((subject) => (
                                    <Tag key={subject} size="sm">
                                        {subject}
                                    </Tag>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                    <AvatarList team={team} />
                </Grid>
            ))}
        </Flex>
    );
};

const TeamAdmin = () => {
    const { teams } = useAllTeams([]);
    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs route={[['Teams', '/connect/admin/teams']]} />
            {teams === undefined ? <Spinner /> : <TeamTable teams={teams} />}
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamAdmin;
