import UserAvatar from '@/components/avatar/UserAvatar';
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
    SkeletonCircle,
    SkeletonText,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import useTeam from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';
import TeamLogo from '@/components/teams/TeamLogo';
const TeamDescription = dynamic(
    import('../../../components/teams/TeamDescriptions')
);

const TeamDetails: NextPageWithLayout = () => {
    const router = useRouter();
    const teamId = Number.parseInt(router.query.teamId as string);
    const { error, team, loading } = useTeam(teamId);

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
            <VStack alignItems="start">
                <Text fontSize="sm" color="gray.500">
                    Members
                </Text>
                <Flex gap={2}>
                    {team?.members.map((member) => (
                        <UserAvatar key={member.userId} profile={member} />
                    ))}
                    {loading ? (
                        <>
                            <SkeletonCircle size="10" />
                            <SkeletonCircle size="10" />
                            <SkeletonCircle size="10" />
                        </>
                    ) : undefined}
                </Flex>
            </VStack>
        </VStack>
    );
};

TeamDetails.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
export default TeamDetails;
