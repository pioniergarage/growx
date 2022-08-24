import PageLink from '@/components/navigation/PageLink';
import { FocusableElement } from '@chakra-ui/utils';
import {
    Box,
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
import { useTeamMembers, useTeamOfUser, useTeamRequests } from 'hooks/team';
import ConnectLayout from 'layouts/ConnectLayout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { NextPageWithLayout } from 'utils/types';
import TeamForm from '@/components/teams/TeamForm';
import { Profile, Team } from 'model';
import {
    acceptRequestToJoinTeam,
    createTeam,
    declineRequestToJoinTeam,
    leaveTeam,
    updateTeam,
} from 'api/teams';
import TeamDescription from '@/components/teams/TeamDescriptions';
import TeamLogoControl from '@/components/teams/TeamLogoControl';
import MemberList from '@/components/teams/MemberList';
import SpinnerWrapper from '@/components/SpinnerWrapper';
import ErrorAlertWrapper from '@/components/ErrorAlertWrapper';
import RequestList from '@/components/teams/RequestList';

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

function TeamDetails({
    team,
    setTeam,
    userId,
}: {
    team: Team;
    setTeam: (t: Team) => void;
    userId?: string;
}) {
    const toast = useToast();
    const router = useRouter();
    const {
        members,
        loading: membersLoading,
        setMembers,
    } = useTeamMembers(team.id);
    const {
        requests,
        loading: requestsLoading,
        setRequests,
    } = useTeamRequests(team.id);
    const [editing, setEditing] = useState(false);
    const [loadingIds, setLoadingIds] = useState<string[]>([]);

    async function onLeaveTeam() {
        if (!userId) return;
        const { error } = await leaveTeam(userId);
        if (error) {
            return toast({
                status: 'error',
                title: 'Something went wrong.',
            });
        }
        router.push('/connect/team');
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

    async function onAcceptRequest(profile: Profile) {
        setLoadingIds([...loadingIds, profile.userId]);
        const { error } = await acceptRequestToJoinTeam(profile.userId);
        if (error) {
            toast({
                status: 'error',
                title: error.message,
            });
        } else {
            toast({
                status: 'success',
                title:
                    profile.firstName +
                    ' ' +
                    profile.lastName +
                    ' joined your team',
            });
            setRequests(requests.filter((p) => p.userId != profile.userId));
            setMembers([...members, profile]);
        }
        setLoadingIds(loadingIds.filter((i) => i != profile.userId));
    }

    async function onDeclineRequest(profile: Profile) {
        setLoadingIds([...loadingIds, profile.userId]);
        const { error } = await declineRequestToJoinTeam(profile.userId);
        if (error) {
            toast({
                status: 'error',
                title: error.message,
            });
        } else {
            setRequests(requests.filter((p) => p.userId != profile.userId));
        }
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
            <MemberList members={members} loading={membersLoading} />
            <RequestList
                requests={requests}
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
    const { team, loading, error, setTeam } = useTeamOfUser(userId);

    return (
        <SpinnerWrapper isLoading={loading}>
            <ErrorAlertWrapper error={error}>
                {team ? (
                    <TeamDetails
                        team={team}
                        setTeam={setTeam}
                        userId={userId}
                    />
                ) : (
                    <NoTeam />
                )}
            </ErrorAlertWrapper>
        </SpinnerWrapper>
    );
};

TeamPage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamPage;
