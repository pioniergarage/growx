import TeamCard from '@/components/teams/TeamCard';
import {
    Alert,
    AlertIcon,
    Box,
    Heading,
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import { getTeams } from 'api';
import ConnectLayout from 'layouts/ConnectLayout';
import _ from 'lodash';
import { Team } from 'model';
import { useEffect, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

const ErrorAlert = ({ message = '' }) => {
    if (!message) return <></>;
    return (
        <Alert status="error">
            <AlertIcon />
            {message}
        </Alert>
    );
};

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
    const { user } = useUser();
    const userId = user?.id;
    const [loading, setLoading] = useState(false);
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
        <Box>
            <Heading mb={4}>Teams</Heading>
            <ErrorAlert message={alert} />
            <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
                {teams.map((team) => (
                    <TeamCard key={team.id} {...team} />
                ))}
            </SimpleGrid>
            <Skeletons loading={loading} />
        </Box>
    );
};

TeamsPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamsPage;