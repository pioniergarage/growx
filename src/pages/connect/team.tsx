import PageLink from '@/components/navigation/PageLink';
import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { getUser, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { getTeamIdOfUser } from 'api/teams';
import { useProfile } from 'hooks/profile';
import { useCreateTeam } from 'hooks/team';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';

const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { profile } = useProfile();
    const toast = useToast();
    const { createTeam } = useCreateTeam();

    function onCreateTeam() {
        createTeam(
            {
                name: `${profile?.firstName}'s team`,
            },
            {
                onError: () => {
                    toast({
                        status: 'error',
                        title: 'Something went wrong.',
                    });
                },
                onSuccess: (created) =>
                    router.push('/connect/teams/' + created.id),
            }
        );
    }
    return (
        <VStack>
            <Text>
                You are not part of a team yet.{' '}
                <PageLink href="/connect/teams" color="primary">
                    Browse
                </PageLink>{' '}
                the existing teams or create a new one.
            </Text>
            <Button onClick={onCreateTeam} variant="outline">
                Create Team
            </Button>
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
