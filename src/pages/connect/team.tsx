import PageLink from '@/components/navigation/PageLink';
import CreateTeamButton from '@/components/teams/CreateTeamButton';
import { Text, VStack } from '@chakra-ui/react';
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { getTeamIdOfUser } from 'database/teams';
import { NextPageWithLayout } from 'utils/types';

const TeamPage: NextPageWithLayout = () => {

    
    return (
        <VStack>
            <Text>
                You are not part of a team yet.{' '}
                <PageLink href="/connect/teams" color="primary">
                    Browse
                </PageLink>{' '}
                the existing teams or create a new one.
            </Text>
            <CreateTeamButton />
        </VStack>
    );
};

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context) => {
        const { user } = await getUser(context);
        const teamId = await getTeamIdOfUser(user.id);
        if (teamId) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect/teams/' + teamId,
                },
            };
        } else {
            return { props: {} };
        }
    },
});

export default TeamPage;
