import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';


import TeamCard from 'modules/teams/components/TeamCard';
import { useAllTeams } from 'modules/teams/hooks';
import Link from 'next/link';

const TeamsPage = () => {
    const { teams } = useAllTeams();
    return (
        <VStack alignItems="stretch" gap={4}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem isCurrentPage>
                    <Link href="/connect" passHref legacyBehavior>
                        <BreadcrumbLink>Teams</BreadcrumbLink>
                    </Link>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
            </Breadcrumb>
            <SimpleGrid gap={4} columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
                {(teams ?? [])
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
});

export default TeamsPage;
