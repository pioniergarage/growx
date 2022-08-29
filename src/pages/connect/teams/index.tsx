import ErrorAlert from '@/components/ErrorAlert';
import TeamCard from '@/components/teams/TeamCard';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    SimpleGrid,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useAllTeams } from 'hooks/team';
import _ from 'lodash';
import { NextPageWithLayout } from 'utils/types';

const Skeletons = ({ number = 5, loading = true }) => {
    if (!loading) return <></>;
    return (
        <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
            {_.range(0, number).map((_, i) => (
                <Skeleton key={i} h={20} borderRadius={6} />
            ))}
        </SimpleGrid>
    );
};

const TeamsPage: NextPageWithLayout = () => {
    const {
        teams,
        isLoading: allTeamsLoading,
        error: allTeamsError,
    } = useAllTeams();

    return (
        <VStack alignItems="stretch" gap={4}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/connect/teams">Teams</BreadcrumbLink>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>
            <ErrorAlert message={allTeamsError || undefined} />
            {!allTeamsLoading ? (
                <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                    {!teams
                        ? undefined
                        : teams
                              .filter((t) => !t.archived)
                              .map((team) => (
                                  <TeamCard key={team.id} {...team} />
                              ))}
                </SimpleGrid>
            ) : undefined}
            <Skeletons loading={allTeamsLoading} />
        </VStack>
    );
};

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamsPage;
