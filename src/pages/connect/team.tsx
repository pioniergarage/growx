import PageLink from '@/components/navigation/PageLink';
import { Text, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { getTeamIdOfUser } from 'modules/teams/api';
import CreateTeamButton from 'modules/teams/components/CreateTeamButton';
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
    getServerSideProps: async (context, supabase) => {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect/login',
                },
            };
        }
        const teamId = await getTeamIdOfUser(supabase, data.user.id);
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
