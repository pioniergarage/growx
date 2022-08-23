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
    Flex,
    Heading,
    HStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import { useTeamOfUser } from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';
import TeamLogo from '@/components/teams/TeamLogo';
import TeamForm from '@/components/teams/TeamForm';
import { Team } from 'model';
import { createTeam, leaveTeam, updateTeam } from 'api/teams';

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

function NoTeam() {
    const router = useRouter();
    const { profile } = useProfile();
    const toast = useToast();
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
}

const TeamPage: NextPageWithLayout = () => {
    const router = useRouter();
    const toast = useToast();
    const { profile } = useProfile();
    const userId = profile?.userId;
    const { team, loading, error, setTeam } = useTeamOfUser(userId);
    const [editing, setEditing] = useState(false);

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

    async function onSaveTeam(team: Team) {
        if (!userId) return;
        const { error } = await updateTeam(team);
        if (error) {
            return toast({
                status: 'error',
                title: 'Something went wrong.',
            });
        }
        setTeam(team);
        setEditing(false);
    }

    if (loading)
        return (
            <Center>
                <Spinner />
            </Center>
        );
    if (error.length > 0) return <ErrorAlert message={error} />;
    if (!team) return <NoTeam />;
    if (editing)
        return (
            <TeamForm
                onSave={onSaveTeam}
                team={team}
                onCancel={() => setEditing(false)}
            />
        );
    return (
        <VStack alignItems="stretch">
            <HStack alignItems="start" gap={4}>
                <TeamLogo {...team} />
                <Flex alignItems="start" flexDir="column">
                    <Heading>{team?.name || 'Team'}</Heading>
                    <Box mt={0} color="whiteAlpha.500">
                        {team?.tags.join(' • ')}
                    </Box>
                </Flex>
            </HStack>
            <Flex gap={2}>
                <Button onClick={() => setEditing(true)} variant="outline">
                    Edit
                </Button>
                <LeaveTeam onLeave={onLeaveTeam} />
            </Flex>
        </VStack>
    );
};

TeamPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamPage;
