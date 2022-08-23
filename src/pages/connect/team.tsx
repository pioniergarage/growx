import ErrorAlert from '@/components/ErrorAlert';
import PageLink from '@/components/navigation/PageLink';
import { FocusableElement } from '@chakra-ui/utils';
import {
    Box,
    Center,
    Spinner,
    VStack,
    Text,
    Button,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { createTeam, leaveTeam } from 'api';
import { useProfile } from 'hooks/profile';
import { useTeamOfUser } from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { NextPageWithLayout } from 'utils/types';

function LeaveTeam({ onLeave }: { onLeave: () => void }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<FocusableElement & HTMLButtonElement>(null);

    return (
        <>
            <Button onClick={onOpen} colorScheme="red" variant="outline">
                Leave Team
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Leave Team
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onLeave} ml={3}>
                                Leave
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}

const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const toast = useToast();
    const { profile } = useProfile();
    const userId = profile?.userId;
    const { team, loading, error } = useTeamOfUser(userId);

    async function onCreateTeam() {
        const { data, error } = await createTeam({
            name: `${profile?.firstName}'s team`,
        });
        if (error || !data) {
            return toast({
                status: 'error',
                title: 'Something went wrong.',
            });
        }
        router.reload();
    }

    async function onLeaveTeam() {
        if (!userId) return;
        const { error } = await leaveTeam(userId);
        if (error) {
            return toast({
                status: 'error',
                title: 'Something went wrong.',
            });
        }
        router.push('/connect');
    }

    if (loading)
        return (
            <Center>
                <Spinner />
            </Center>
        );
    if (error.length > 0) return <ErrorAlert message={error} />;
    if (!team)
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

    return (
        <VStack>
            <Box>{JSON.stringify(team)}</Box>
            <LeaveTeam onLeave={onLeaveTeam} />
        </VStack>
    );
};

TeamPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamPage;
