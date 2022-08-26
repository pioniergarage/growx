import PageLink from '@/components/navigation/PageLink';
import SpinnerWrapper from '@/components/SpinnerWrapper';
import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import { useCreateTeam, useTeam, useTeamIdOfUser } from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'utils/types';

function NoTeam() {
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
                onSuccess: () => router.reload(),
            }
        );
    }
    return (
        <VStack>
            <Text>
                You are not part of a team yet.{' '}
                <PageLink href="/connect/teams" color="primary">
                    Browse
                </PageLink>
                the existing teams or create a new one.
            </Text>
            <Button onClick={onCreateTeam} variant="outline">
                Create Team
            </Button>
        </VStack>
    );
}

const TeamPage: NextPageWithLayout = () => {
    const { profile } = useProfile();
    const { teamId } = useTeamIdOfUser(profile?.userId);

    const { team, isLoading: loading } = useTeam(teamId || undefined);

    return (
        <SpinnerWrapper isLoading={loading}>
            {team ? (
                <Box>
                    Go to{' '}
                    <PageLink
                        href={'/connect/teams/' + team.id}
                        color="primary"
                    >
                        your team
                    </PageLink>
                </Box>
            ) : (
                <NoTeam />
            )}
        </SpinnerWrapper>
    );
};

TeamPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamPage;
