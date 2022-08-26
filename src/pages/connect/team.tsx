import PageLink from '@/components/navigation/PageLink';
import SpinnerWrapper from '@/components/SpinnerWrapper';
import MemberList from '@/components/teams/MemberList';
import RequestList from '@/components/teams/RequestList';
import TeamDescription from '@/components/teams/TeamDescriptions';
import TeamForm from '@/components/teams/TeamForm';
import TeamLogoControl from '@/components/teams/TeamLogoControl';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Text,
    useDisclosure,
    useToast,
    VStack,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfile } from 'hooks/profile';
import {
    useAcceptRequest,
    useCreateTeam,
    useDeclineRequest,
    useLeaveTeam,
    useTeam,
    useTeamIdOfUser,
    useTeamMembers,
    useTeamRequests,
    useUpdateTeam,
} from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import { Profile, Team } from 'model';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    onClose();
                                    onLeave();
                                }}
                                ml={3}
                            >
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
                </PageLink>{' '}
                the existing teams or create a new one.
            </Text>
            <Button onClick={onCreateTeam} variant="outline">
                Create Team
            </Button>
        </VStack>
    );
}

function TeamDetails({ team, userId }: { team: Team; userId?: string }) {
    const toast = useToast();
    const router = useRouter();
    const { members, isLoading: membersLoading } = useTeamMembers(team.id);
    const { profiles: requests, isLoading: requestsLoading } = useTeamRequests(
        team.id
    );
    const { leaveTeam } = useLeaveTeam();
    const { updateTeam } = useUpdateTeam();
    const { acceptRequest } = useAcceptRequest();
    const { declineRequest } = useDeclineRequest();
    const [editing, setEditing] = useState(false);
    const [loadingIds, setLoadingIds] = useState<string[]>([]);

    async function onLeaveTeam() {
        if (!userId) return;
        await leaveTeam(userId, {
            onError: () => {
                toast({
                    status: 'error',
                    title: 'Something went wrong.',
                });
            },
            onSuccess: () => {
                router.reload();
            },
        });
    }

    async function onSaveTeam(team: Team) {
        if (!userId) return;
        await updateTeam(team, {
            onError: () => {
                toast({
                    status: 'error',
                    title: 'Something went wrong.',
                });
            },
        });
        setEditing(false);
    }

    async function onAcceptRequest(profile: Profile) {
        setLoadingIds([...loadingIds, profile.userId]);
        await acceptRequest(profile.userId, {
            onError: () => {
                toast({
                    status: 'error',
                    title: 'Something went wrong',
                });
            },
            onSuccess: () => {
                toast({
                    status: 'success',
                    title:
                        profile.firstName +
                        ' ' +
                        profile.lastName +
                        ' joined your team',
                });
            },
        });
        setLoadingIds(loadingIds.filter((i) => i != profile.userId));
    }

    async function onDeclineRequest(profile: Profile) {
        setLoadingIds([...loadingIds, profile.userId]);
        await declineRequest(profile.userId, {
            onError: () => {
                toast({
                    status: 'error',
                    title: 'Something went wrong',
                });
            },
        });
        setLoadingIds(loadingIds.filter((i) => i != profile.userId));
    }

    return editing ? (
        <TeamForm
            onSave={onSaveTeam}
            team={team}
            onCancel={() => setEditing(false)}
        />
    ) : (
        <VStack alignItems="stretch" gap={4}>
            <HStack alignItems="start" gap={4}>
                <TeamLogoControl team={team} />
                <Flex alignItems="start" flexDir="column">
                    <Heading>{team?.name || 'Team'}</Heading>
                    <Box mt={0} color="whiteAlpha.500">
                        {team?.tags.join(' • ')}
                    </Box>
                </Flex>
            </HStack>
            <TeamDescription description={team?.description} />
            <Flex gap={2}>
                <Button onClick={() => setEditing(true)} variant="outline">
                    Edit
                </Button>
                <LeaveTeam onLeave={onLeaveTeam} />
            </Flex>
            <MemberList members={members || []} loading={membersLoading} />
            <RequestList
                requests={requests || []}
                loading={requestsLoading || membersLoading}
                loadingRequests={loadingIds}
                onAccept={onAcceptRequest}
                onDecline={onDeclineRequest}
            />
        </VStack>
    );
}

const TeamPage: NextPageWithLayout = () => {
    const { profile } = useProfile();
    const userId = profile?.userId;
    const { teamId } = useTeamIdOfUser();

    const { team, isLoading: loading } = useTeam(teamId || undefined);

    return (
        <SpinnerWrapper isLoading={loading}>
            {team ? <TeamDetails team={team} userId={userId} /> : <NoTeam />}
        </SpinnerWrapper>
    );
};

TeamPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamPage;
