import LeaveTeamButton from '@/components/teams/LeaveTeamButton';
import MemberList from '@/components/teams/MemberList';
import RequestButton from '@/components/teams/RequestButton';
import TeamForm from '@/components/teams/TeamForm';
import TeamLogo from '@/components/teams/TeamLogo';
import TeamLogoControl from '@/components/teams/TeamLogoControl';
import TeamRequests from '@/components/teams/TeamRequests';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import {
    useCurrentRequest,
    useRequestToJoinTeam,
    useTeam,
    useTeamIdOfUser,
    useTeamMembers,
    useUpdateTeam,
    useWithdrawRequest,
} from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import { Team } from 'model';
import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';
import TeamDescription from '../../../components/teams/TeamDescriptions';

interface TeamDetailsSekeltonProps extends PropsWithChildren {
    isLoading: boolean;
}

const TeamDetailsSkeleton: React.FC<TeamDetailsSekeltonProps> = ({
    isLoading,
    children,
}) => {
    if (!isLoading) return <>{children}</>;
    else
        return (
            <>
                <Flex alignItems="start" gap={4} wrap="wrap">
                    <Skeleton
                        w={{ base: 16, sm: 24 }}
                        h={{ base: 16, sm: 24 }}
                    />
                    <Flex alignItems="start" flexDir="column" flexGrow={1}>
                        <Skeleton w="16rem" h={10} />
                    </Flex>
                </Flex>
                <SkeletonText noOfLines={5} lineHeight={4} skeletonHeight={3} />
                <HStack>
                    <SkeletonCircle size="3rem" />{' '}
                    <SkeletonCircle size="3rem" />{' '}
                    <SkeletonCircle size="3rem" />
                </HStack>
            </>
        );
};

const TeamDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const toast = useToast();

    const teamId = Number.parseInt(router.query.teamId as string);
    const { team, isLoading: teamLoading } = useTeam(teamId);
    const { members, isLoading: membersLoading } = useTeamMembers(teamId);

    const { user } = useUser();
    const { request: teamRequested, isLoading: teamRequestedLoading } =
        useCurrentRequest(user?.id);
    const { teamId: teamIdOfUser, isLoading: usersTeamLoading } =
        useTeamIdOfUser(user?.id);
    const isUsersTeam = !!teamIdOfUser && teamIdOfUser == teamId;

    const { makeRequest, isLoading: joining } = useRequestToJoinTeam();
    const { withdrawRequest, isLoading: withdrawing } = useWithdrawRequest();
    const { updateTeam, isLoading: updatingTeam } = useUpdateTeam();

    const [isEditing, setEditing] = useState(false);

    const loading =
        teamLoading ||
        membersLoading ||
        teamRequestedLoading ||
        usersTeamLoading;

    function handleRequest() {
        if (!user) return;
        makeRequest(
            { userId: user.id, teamId },
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
                    <BreadcrumbLink href="/connect/teams">Teams</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href={`/connect/teams/${teamId}`}>
                        {team?.name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <TeamDetailsSkeleton isLoading={loading}>
                {!isEditing ? (
                    <>
                        <Flex alignItems="start" gap={4} wrap="wrap">
                            {isUsersTeam && team ? (
                                <TeamLogoControl team={team} />
                            ) : (
                                <TeamLogo
                                    {...team}
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
                            </Flex>
                            {team && !isUsersTeam ? (
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
                            ) : (
                                <Button
                                    onClick={() => setEditing(true)}
                                    size="sm"
                                    isLoading={updatingTeam}
                                >
                                    Edit
                                </Button>
                            )}
                        </Flex>
                        <TeamDescription description={team?.description} />
                        <MemberList members={members || []} />
                        {team && isUsersTeam && user ? (
                            <>
                                <TeamRequests team={team} />
                                <LeaveTeamButton
                                    userId={user?.id}
                                    maxW="10rem"
                                />
                            </>
                        ) : undefined}
                    </>
                ) : team ? (
                    <TeamForm onSave={onSaveTeam} team={team} />
                ) : undefined}
            </TeamDetailsSkeleton>
        </VStack>
    );
};

TeamDetails.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
export default TeamDetails;
