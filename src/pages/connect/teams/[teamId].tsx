import MemberList from '@/components/teams/MemberList';
import RequestButton from '@/components/teams/RequestButton';
import TeamLogo from '@/components/teams/TeamLogo';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
    Skeleton,
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
    useWithdrawRequest,
} from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';
const TeamDescription = dynamic(
    import('../../../components/teams/TeamDescriptions')
);

const TeamDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const teamId = Number.parseInt(router.query.teamId as string);
    const { user } = useUser();
    const { team, isLoading: teamLoading } = useTeam(teamId);
    const { members, isLoading: membersLoading } = useTeamMembers(teamId);
    const { request: teamRequested, isLoading: teamRequestedLoading } =
        useCurrentRequest(user?.id);

    const { teamId: teamIdOfUser, isLoading: usersTeamLoading } =
        useTeamIdOfUser(user?.id);
    const { makeRequest } = useRequestToJoinTeam();
    const { withdrawRequest } = useWithdrawRequest();

    const [requestButtonLoading, setRequestButtonLoading] = useState(false);
    const toast = useToast();

    const loading =
        teamLoading ||
        membersLoading ||
        teamRequestedLoading ||
        usersTeamLoading;

    async function handleRequest() {
        if (!user) return;
        setRequestButtonLoading(true);
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
    async function handleWithdraw() {
        if (!user) return;
        setRequestButtonLoading(true);
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
            <Flex alignItems="start" gap={4} wrap="wrap">
                <Skeleton isLoaded={!loading}>
                    <TeamLogo {...team} size={{ base: 16, sm: 24 }} />
                </Skeleton>
                <Flex alignItems="start" flexDir="column" flexGrow={1}>
                    <Skeleton minW="10rem" isLoaded={!loading}>
                        <Heading>{team?.name || 'Team'}</Heading>
                    </Skeleton>
                    <Box mt={0} color="whiteAlpha.500">
                        {team?.tags.join(' • ')}
                    </Box>
                </Flex>
                <Skeleton
                    isLoaded={!loading}
                    h={6}
                    minW={32}
                    flexGrow={{ base: 1, md: 0 }}
                >
                    {team ? (
                        <RequestButton
                            team={team}
                            currentRequestId={teamRequested?.id}
                            currentTeamId={teamIdOfUser}
                            onRequest={handleRequest}
                            onWithdraw={handleWithdraw}
                            isLoading={requestButtonLoading}
                            size="sm"
                            w="100%"
                        />
                    ) : undefined}
                </Skeleton>
            </Flex>

            <SkeletonText
                isLoaded={!loading}
                noOfLines={3}
                spacing="4"
                w="100%"
                skeletonHeight="4"
            />
            <TeamDescription description={team?.description} />
            <MemberList members={members || []} loading={membersLoading} />
        </VStack>
    );
};

TeamDetails.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
export default TeamDetails;
