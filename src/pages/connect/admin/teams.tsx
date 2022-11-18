import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import {
    AvatarGroup,
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
import { allowOrga } from 'modules/admin/utils';

import UserAvatar from 'modules/avatar/components/UserAvatar';
import {
    useAssignMentor,
    useMentorAssignments,
    useUnassignMentor,
} from 'modules/mentor/hooks';
import { Profile } from 'modules/profile/types';
import MentorSelect from 'modules/teams/components/MentorSelect';
import TeamLogo from 'modules/teams/components/TeamLogo';
import { useAllTeamsWithMembers } from 'modules/teams/hooks';
import { TeamWithMembers } from 'modules/teams/types';
import Link from 'next/link';
import { memo, useCallback, useMemo, useState } from 'react';

type TeamRowProps = {
    team: TeamWithMembers;
    mentor: Profile;
};

const TeamRow: React.FC<TeamRowProps> = ({ team, mentor }) => {
    const { assignMentor } = useAssignMentor();
    const { unassignMentor } = useUnassignMentor();
    const [mentorOnHover, setMentorOnHover] = useState<Profile>();

    const handleMentorSelect = useCallback(
        (mentor: Profile) => {
            assignMentor({
                teamId: team.id,
                mentorId: mentor.userId,
            });
        },
        [assignMentor, team.id]
    );

    const handleMentorUnselect = useCallback(() => {
        unassignMentor({ teamId: team.id });
    }, [unassignMentor, team.id]);

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
                <TeamLogo logo={team.logo} name={team.name} size={10} />
                <Flex flexDir="column">
                    <Flex gap={2}>
                        <Link
                            href={'/connect/teams/' + team.id}
                            passHref
                            prefetch={false}
                        >
                            <LinkOverlay>{team.name}</LinkOverlay>
                        </Link>
                        {team.isArchived && (
                            <Tag size="sm" colorScheme="orange">
                                Archived
                            </Tag>
                        )}
                    </Flex>
                    <Flex gap={1} flexWrap="wrap">
                        {team.requestSupport.map((subject) => (
                            <Tag
                                key={subject}
                                size="sm"
                                colorScheme={
                                    mentorOnHover?.skills.includes(subject)
                                        ? 'green'
                                        : undefined
                                }
                                whiteSpace="nowrap"
                                fontSize="x-small"
                            >
                                {subject}
                            </Tag>
                        ))}
                    </Flex>
                </Flex>
            </Flex>
            <AvatarGroup max={4} size="sm">
                {team.members.map((m) => (
                    <UserAvatar
                        key={m.userId}
                        profile={m}
                        size="sm"
                        noSkeleton={true}
                    />
                ))}
            </AvatarGroup>
            <MentorSelect
                mentor={mentor}
                onSelect={handleMentorSelect}
                onUnselect={handleMentorUnselect}
                onHover={setMentorOnHover}
            />
        </Grid>
    );
};

const MemorizedTeamRow = memo(TeamRow);

const TeamTable = (props: { teams: TeamWithMembers[] }) => {
    const [showArchivedTeams, setShowArchivedTeams] = useState(false);
    const { mentorAssignments } = useMentorAssignments();

    const filteredTeams = useMemo(
        () => props.teams.filter((t) => !t.isArchived || showArchivedTeams),
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
                <Box>{props.teams.length} Teams</Box>
                <Box>Members</Box>
                <Box>Mentor</Box>
            </Grid>
            {filteredTeams.map((team) => (
                <MemorizedTeamRow
                    key={team.id}
                    team={team}
                    mentor={(mentorAssignments ?? {})[team.id]}
                />
            ))}
        </Flex>
    );
};

const TeamAdmin = () => {
    const { teams } = useAllTeamsWithMembers();
    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/teams">
                    Teams
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>
            {teams === undefined ? <Spinner /> : <TeamTable teams={teams} />}
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: allowOrga,
});

export default TeamAdmin;
