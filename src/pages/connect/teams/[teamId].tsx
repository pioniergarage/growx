import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { getTeam } from 'modules/teams/api';
import LeaveTeamButton from 'modules/teams/components/LeaveTeamButton';
import MemberList from 'modules/teams/components/MemberList';
import RequestButton from 'modules/teams/components/RequestButton';
import SupportRequestInfo from 'modules/teams/components/SupportRequestInfo';
import TeamDescription from 'modules/teams/components/TeamDescriptions';
import TeamDetailsSkeleton from 'modules/teams/components/TeamDetailsSkeleton';
import TeamForm from 'modules/teams/components/TeamForm';
import TeamLogoControl from 'modules/teams/components/TeamLogoControl';
import TeamRequests from 'modules/teams/components/TeamRequests';
import YourMentor from 'modules/teams/components/YourMentor';
import {
    useCurrentRequest,
    useRequestToJoinTeam,
    useTeam,
    useTeamIdOfUser,
    useTeamMembers,
    useUpdateTeam,
    useWithdrawRequest,
} from 'modules/teams/hooks';
import { Team } from 'modules/teams/types';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
const TeamLogo = dynamic(() => import('modules/teams/components/TeamLogo'), {
    ssr: false,
});

interface TeamDetails {
    team: Team;
}

const TeamDetails: React.FC<TeamDetails> = ({ team: serverSideTeam }) => {
    const toast = useToast();
    const teamId = serverSideTeam.id;
    const { team, isLoading } = useTeam(serverSideTeam.id, serverSideTeam);
    const { members } = useTeamMembers(teamId);

    const user = useUser();

    const { request: teamRequested, isLoading: teamRequestedLoading } =
        useCurrentRequest(user?.id);
    const { teamId: teamIdOfUser, isLoading: teamIdOfUserLoading } =
        useTeamIdOfUser(user?.id);
    const isUsersTeam = !!teamIdOfUser && teamIdOfUser == teamId;

    const { makeRequest, isLoading: joining } = useRequestToJoinTeam();
    const { withdrawRequest, isLoading: withdrawing } = useWithdrawRequest();
    const { updateTeam, isLoading: updatingTeam } = useUpdateTeam();

    const [isEditing, setEditing] = useState(false);

    function handleRequest() {
        if (!user) return;
        makeRequest(
            { userId: user.id, teamId: teamId },
            {
                onError: (error) => {
                    toast({
                        title: String(error),
                        status: 'error',
                    });
                },
                onSuccess: () => {
                    toast({
                        title: 'Request sent',
                        status: 'success',
                    });
                },
            }
        );
    }
    function handleWithdraw() {
        if (!user) return;
        withdrawRequest(
            { userId: user.id },
            {
                onError: (error) => {
                    toast({
                        title: String(error),
                        status: 'error',
                    });
                },
                onSuccess: () => {
                    toast({
                        title: 'Request withdrawn',
                        status: 'success',
                    });
                },
            }
        );
    }

    function onSaveTeam(updated: Team) {
        updateTeam(updated, {
            onSuccess: () => {
                toast({
                    title: 'Changes saved',
                    status: 'success',
                });
                setEditing(false);
            },
        });
    }

    return (
        <VStack alignItems="stretch" gap={4}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem>
                    <Link href="/connect/teams" passHref>
                        <BreadcrumbLink>Teams</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href={`/connect/teams/${teamId}`}>
                        {team?.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <TeamDetailsSkeleton isLoading={isLoading}>
                {!isEditing ? (
                    <>
                        <Flex alignItems="start" gap={4} wrap="wrap">
                            {isUsersTeam && team ? (
                                <TeamLogoControl team={team} />
                            ) : (
                                <TeamLogo
                                    logo={team?.logo}
                                    name={team?.name}
                                    size={{ base: 16, sm: 24 }}
                                />
                            )}
                            <Flex
                                alignItems="start"
                                flexDir="column"
                                flexGrow={1}
                            >
                                <Heading>{team?.name}</Heading>
                                <Box color="whiteAlpha.500">
                                    {team?.tags.join(' • ')}
                                </Box>
                                <SupportRequestInfo team={team} />
                            </Flex>
                            {isUsersTeam ? (
                                <Button
                                    onClick={() => setEditing(true)}
                                    size="sm"
                                    isLoading={updatingTeam}
                                >
                                    Edit
                                </Button>
                            ) : team &&
                              !teamIdOfUser &&
                              !teamIdOfUserLoading ? (
                                <RequestButton
                                    team={team}
                                    currentRequestId={teamRequested?.id}
                                    onRequest={handleRequest}
                                    onWithdraw={handleWithdraw}
                                    isLoading={
                                        teamRequestedLoading ||
                                        joining ||
                                        withdrawing
                                    }
                                    size="sm"
                                    w={{ base: '100%', md: '10rem' }}
                                />
                            ) : undefined}
                        </Flex>
                        <TeamDescription description={team?.description} />
                        <MemberList members={members || []} />
                        {team && isUsersTeam && user ? (
                            <>
                                <YourMentor team={team} />
                                <TeamRequests team={team} />
                                <LeaveTeamButton
                                    userId={user?.id}
                                    maxW="10rem"
                                />
                            </>
                        ) : undefined}
                    </>
                ) : team ? (
                    <TeamForm
                        onSave={onSaveTeam}
                        team={team}
                        onCancel={() => setEditing(false)}
                    />
                ) : undefined}
            </TeamDetailsSkeleton>
        </VStack>
    );
};

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context, supabase) => {
        const team = await getTeam(
            supabase,
            parseInt(context.query.teamId as string)
        );
        return { props: { team } };
    },
});
export default TeamDetails;
