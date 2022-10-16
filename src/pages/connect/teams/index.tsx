import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';

import { getTeams } from 'modules/teams/api';
import TeamCard from 'modules/teams/components/TeamCard';
import { useAllTeams } from 'modules/teams/hooks';
import { Team } from 'modules/teams/types';
import Link from 'next/link';

const TeamsPage = ({ teams: serversideTeams = [] }: { teams: Team[] }) => {
    const { teams } = useAllTeams(serversideTeams);
    return (
        <VStack alignItems="stretch" gap={4}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem isCurrentPage>
                    <Link href="/connect/teams" passHref>
                        <BreadcrumbLink>Teams</BreadcrumbLink>
                    </Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>
            <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                {(teams || serversideTeams)
                    .filter((t) => !t.archived)
                    .map((team) => (
                        <TeamCard key={team.id} {...team} />
                    ))}
            </SimpleGrid>
        </VStack>
    );
};

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async () => {
        const teams = await getTeams();
        return { props: { teams } };
    },
});

export default TeamsPage;
