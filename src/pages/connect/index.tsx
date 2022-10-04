import PageLink from '@/components/navigation/PageLink';
import TeamCard from '@/components/teams/TeamCard';
import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    getUser,
    supabaseServerClient,
    withPageAuth,
} from '@supabase/auth-helpers-nextjs';
import { definitions } from 'database/supabase';
import { getTeam, getTeamIdOfUser } from 'database/teams';
import { Team } from 'model';

interface ConnectIndexProps {
    profile: definitions['profiles'];
    team?: Team;
}

const ConnectIndex: React.FC<ConnectIndexProps> = ({ profile, team }) => {
    return (
        <Flex wrap="wrap">
            <VStack flexGrow={1} alignItems="start">
                <Heading size="md">
                    <Text as="span" color="gray.400">
                        Welcome back,
                    </Text>{' '}
                    {profile.first_name}
                </Heading>
                <Box>
                    {!team ? (
                        <>
                            <Text>
                                You have not joined a team yet.{' '}
                                <PageLink href='/connect/temas' color="primary">Browse Teams</PageLink>
                                
                            </Text>
                        </>
                    ) : (
                        <TeamCard {...team} />
                    )}
                </Box>
            </VStack>
        </Flex>
    );
};

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context) => {
        const client = supabaseServerClient(context);
        const { user } = await getUser(context);
        const { data: profile, error } = await client
            .from<definitions['profiles']>('profiles')
            .select('*')
            .match({ user_id: user.id })
            .single();
        if (error) {
            throw new Error(error.message);
        }

        const teamId = await getTeamIdOfUser(user.id);
        const team = teamId ? await getTeam(teamId) : null;
        return { props: { profile, team } };
    },
});
