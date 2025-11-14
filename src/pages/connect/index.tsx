import PageLink from '@/components/navigation/PageLink';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Heading,
    Spacer,
    Text,
    VStack
} from '@chakra-ui/react';
import { withPageAuth } from 'utils/supabase/withPageAuth';

import { useSupabaseClient, useUser } from '@/components/providers/SupabaseProvider';

import EventRegistration from 'modules/events/components/EventRegistration';
import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useGrowEvents, useRegistrationsOfUser } from 'modules/events/hooks';
import { addMinutes } from 'modules/events/utils';
import { useProfile } from 'modules/profile/hooks';
import CreateTeamButton from 'modules/teams/components/CreateTeamButton';
import TeamCard from 'modules/teams/components/TeamCard';
import { useTeam, useTeamIdOfUser, useTeamRequests } from 'modules/teams/hooks';
import { Team } from 'modules/teams/types';
import router from 'next/router';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';

const ConnectIndex: React.FC = () => {
    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const queryClient = useQueryClient();
    const { profile, isLoading } = useProfile(user?.id);
    const { events } = useGrowEvents();
    const upcomingEvents = useMemo(() => {
        if (events) {
            const now = new Date();
            return events
                .filter((e) => (addMinutes(e.date, e.duration)) > now)
                .slice(0, Math.min(events.length, 1));
        } else {
            return [];
        }
    }, [events]);

    const { registrations } = useRegistrationsOfUser(user?.id);

    if (!profile) { //how do I differentiate whether 'profile' is loading or if it truly doesn't exist?
        if (user && !isLoading) {
            return (
                <VStack>
                    <Text fontSize="lg">We couldn’t find your profile information.</Text>
                    <Text color="gray.500">
                        Please reset your login info and create a new profile.
                    </Text>
                    <Button
                        colorScheme="blue"
                        onClick={async () => {
                            const confirmed = window.confirm(
                                "Are you sure you want to reset your profile? This action cannot be undone."
                            );
                            if (!confirmed) return; // exit if user cancels

                            try {
                                await supabaseClient.rpc('delete_own_user');
                                await supabaseClient.auth.signOut();
                                queryClient.setQueryData('profile', null);
                                router.push('/connect/signup'); // include query param
                            } catch (error) {
                                console.error('Failed to reset profile:', error);
                            }
                        }}
                    >
                        Reset Profile
                    </Button>
                </VStack >
            );
        }
        else {
            return (<></>);
        }
    }

    return (

        <VStack flexGrow={1} alignItems="center">
            <VStack flexGrow={1} alignItems="stretch" gap={6}>
                <Heading size="md">
                    <Text as="span" color="gray.400">
                        Welcome back,
                    </Text>
                    &nbsp;
                    {profile.firstName}
                </Heading>
                {upcomingEvents.length > 0 && (
                    <Box>
                        <Heading
                            mb={2}
                            size="sm"
                            color="gray.400"
                            fontSize={12}
                        >
                            Next Event
                        </Heading>
                        <VStack gap={4} alignItems="stretch">
                            {upcomingEvents.map((event) => (
                                <VStack key={event.id}>
                                    <GrowEventCard
                                        event={event}
                                        registration={registrations?.find(
                                            (registration) =>
                                                registration.eventId === event.id
                                        )}
                                    />
                                    <EventRegistration event={event} />
                                </VStack>
                            ))}
                        </VStack>
                    </Box>
                )}

                {['PARTICIPANT', 'ORGA'].includes(profile.role) && (
                    <YourTeam userId={profile.userId} />
                )}
            </VStack>
        </VStack>
    );
};

const YourTeam = ({ userId }: { userId: string }) => {
    const { teamId, isLoading } = useTeamIdOfUser(userId);
    const { team } = useTeam(teamId);
    if (isLoading) {
        return <></>;
    }
    if (!isLoading && !teamId) {
        return (
            <Box>
                <Heading size="sm" color="gray.400" fontSize={12}>
                    Your Team
                </Heading>
                <Box>
                    You have not joined a team yet. You can{' '}
                    <PageLink href="/connect/teams" color="primary">
                        browse
                    </PageLink>{' '}
                    existing teams or you can create a new one.{' '}

                </Box>

                <VStack>
                    <Spacer mb={2} />
                    <CreateTeamButton size="sm" ml={2} />
                </VStack>
            </Box>
        );
    } else if (team) {
        return (
            <Box>
                <Heading mb={1} size="sm" color="gray.400" fontSize={12}>
                    Your Team
                </Heading>
                <TeamCard {...team} />
                <TeamRequestInfo team={team} />
            </Box>
        );
    } else {
        return <></>;
    }
};

const TeamRequestInfo = ({ team }: { team: Team }) => {
    const { profiles } = useTeamRequests(team.id);
    if (!profiles || profiles.length === 0) {
        return <></>;
    } else {
        return (
            <Alert mt={2} status="info" py={2} px={3}>
                <AlertIcon />
                Somebody sent a request to join your team
            </Alert>
        );
    }
};

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
