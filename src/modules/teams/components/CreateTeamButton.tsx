import { Button, ButtonProps, useToast } from '@chakra-ui/react';
import { useProfile } from 'modules/profile/hooks';
import { useCreateTeam } from 'modules/teams/hooks';
import { useRouter } from 'next/router';

const CreateTeamButton = (props: ButtonProps) => {
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
        <Button onClick={onCreateTeam} variant="outline" {...props}>
            Create Team
        </Button>
    );
};

export default CreateTeamButton;
