import ErrorAlert from '@/components/ErrorAlert';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading,
    HStack,
    Skeleton,
    SkeletonText,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import ConnectLayout from 'layouts/ConnectLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';
import TeamLogo from '@/components/teams/TeamLogo';
import { useTeam, useTeamMembers } from 'hooks/team';
import MemberList from '@/components/teams/MemberList';
const TeamDescription = dynamic(
    import('../../../components/teams/TeamDescriptions')
);

const TeamDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const teamId = Number.parseInt(router.query.teamId as string);
    const { error, team, loading } = useTeam(teamId);
    const { members, loading: membersLoading } = useTeamMembers(teamId);

    return (
        <VStack alignItems="start" gap={4}>
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
            <HStack alignItems="start" gap={4}>
                <Skeleton isLoaded={!loading}>
                    <TeamLogo {...team} />
                </Skeleton>
                <Flex alignItems="start" flexDir="column">
                    <Skeleton minW="20rem" isLoaded={!loading}>
                        <Heading>{team?.name || 'Team'}</Heading>
                    </Skeleton>
                    <Box mt={0} color="whiteAlpha.500">
                        {team?.tags.join(' • ')}
                    </Box>
                </Flex>
            </HStack>
            <ErrorAlert message={error} />

            <SkeletonText
                isLoaded={!loading}
                noOfLines={3}
                spacing="4"
                w="100%"
                skeletonHeight="4"
            />
            <TeamDescription description={team?.description} />
            <MemberList members={members} loading={membersLoading} />
        </VStack>
    );
};

TeamDetails.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
export default TeamDetails;
