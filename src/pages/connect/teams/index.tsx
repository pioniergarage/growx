import ErrorAlert from '@/components/ErrorAlert';
import TeamCard from '@/components/teams/TeamCard';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
    Flex,
    SimpleGrid,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { createTeam, getTeams } from 'api';
import { useProfile } from 'hooks/profile';
import ConnectLayout from 'layouts/ConnectLayout';
import _ from 'lodash';
import { Team } from 'model';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
    const router = useRouter();
    const { profile } = useProfile();
    const userId = profile?.userId;
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState<Team[]>([]);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        (async () => {
            if (!userId) return;
            setLoading(true);
            const { data, error } = await getTeams();
            setLoading(false);
            if (error || !data) {
                setAlert(
                    'Could not load teams. Please contact an admin if this problem remains.'
                );
                return;
            }
            setTeams(data);
        })();
    }, [userId]);

    return (
        <VStack alignItems="stretch" gap={4}>
            <Flex justify="space-between" alignItems="center">
                <Breadcrumb
                    color="gray.500"
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="/connect/teams">
                            Teams
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                </Breadcrumb>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                        const { data } = await createTeam({
                            name: profile?.firstName + "'s Team",
                        });
                        if (data) router.push('/connect/teams/' + data.id);
                    }}
                >
                    Create Team
                </Button>
            </Flex>
            <ErrorAlert message={alert} />
            <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                {teams.map((team) => (
                    <TeamCard key={team.id} {...team} />
                ))}
            </SimpleGrid>
            <Skeletons loading={loading} />
        </VStack>
    );
};

TeamsPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamsPage;
