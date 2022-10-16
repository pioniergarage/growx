import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import {
    Box,
    Button,
    Flex,
    Grid,
    LinkBox,
    LinkOverlay,
    Spinner,
    Tag,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import UserAvatar from 'modules/avatar/components/UserAvatar';
import { Profile } from 'modules/profile/types';
import MentorSelect from 'modules/teams/components/MentorSelect';
import TeamLogo from 'modules/teams/components/TeamLogo';
import {
    useAllTeams,
    useAssignMentor,
    useMentorAssignments,
    useTeamMembers,
    useUnassignMentor,
} from 'modules/teams/hooks';
import { Team } from 'modules/teams/types';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const TeamRow = ({ team }: { team: Team }) => {
    const { members } = useTeamMembers(team.id);
    const { mentorAssignments, isLoading } = useMentorAssignments();
    const { assignMentor } = useAssignMentor();
    const { unassignMentor } = useUnassignMentor();
    const [mentorOnHover, setMentorOnHover] = useState<Profile>();
    return (
        <Grid
            gridTemplateColumns="1fr 10rem 4rem"
            px={4}
            borderTop="1px"
            borderColor="whiteAlpha.300"
            py={2}
            justifyItems="start"
            alignItems="center"
        >
            <Flex
                as={LinkBox}
                fontWeight="semibold"
                alignItems="center"
                gap={2}
            >
                <TeamLogo {...team} size={10} />
                <Flex flexDir="column">
                    <Flex gap={2}>
                        <Link
                            href={'/connect/teams/' + team.id}
                            passHref
                            prefetch={false}
                        >
                            <LinkOverlay>{team.name}</LinkOverlay>
                        </Link>
                        {team.archived ? (
                            <Tag size="sm" colorScheme="orange">
                                Archived
                            </Tag>
                        ) : undefined}
                    </Flex>
                    <Flex gap={1}>
                        {team.requestSupport.map((subject) => (
                            <Tag
                                key={subject}
                                size="sm"
                                colorScheme={
                                    mentorOnHover?.skills.includes(subject)
                                        ? 'green'
                                        : undefined
                                }
                            >
                                {subject}
                            </Tag>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
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
            <MentorSelect
                mentor={
                    mentorAssignments ? mentorAssignments[team.id] : undefined
                }
                onSelect={(mentor) =>
                    assignMentor({
                        teamId: team.id,
                        mentorId: mentor.userId,
                    })
                }
                onUnselect={() => {
                    unassignMentor({ teamId: team.id });
                }}
                isLoading={isLoading}
                onHover={setMentorOnHover}
            />
        </Grid>
    );
};

const TeamTable = (props: { teams: Team[] }) => {
    const [showArchivedTeams, setShowArchivedTeams] = useState(false);
    const filteredTeams = useMemo(
        () =>
            showArchivedTeams
                ? props.teams
                : props.teams.filter((t) => !t.archived),
        [props.teams, showArchivedTeams]
    );
    return (
        <Flex alignItems="stretch" flexDir="column">
            <Button
                alignSelf="start"
                size="sm"
                onClick={() => setShowArchivedTeams(!showArchivedTeams)}
            >
                Toggle Archived Teams
            </Button>
            <Grid
                gridTemplateColumns="1fr 10rem 4rem"
                color="gray.400"
                px={4}
                py={3}
                fontSize={14}
            >
                <Box>{filteredTeams.length} Teams</Box>
                <Box>Members</Box>
                <Box>Mentor</Box>
            </Grid>
            {filteredTeams.map((team) => (
                <TeamRow key={team.id} team={team} />
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
