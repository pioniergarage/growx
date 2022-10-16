import PageLink from '@/components/navigation/PageLink';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Link,
    Switch,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

import GrowEventCard from 'modules/events/components/GrowEventCard';
import { useGrowEvents, useRegistrationsOfUser } from 'modules/events/hooks';
import { useProfile, useUpdateProfile } from 'modules/profile/hooks';
import { kitName } from 'modules/signup/components/UniversityForm';
import CreateTeamButton from 'modules/teams/components/CreateTeamButton';
import TeamCard from 'modules/teams/components/TeamCard';
import { useTeam, useTeamIdOfUser, useTeamRequests } from 'modules/teams/hooks';
import { Team } from 'modules/teams/types';
import { useMemo, useState } from 'react';

const ConnectIndex: React.FC = () => {
    const user = useUser();
    const { profile } = useProfile(user?.id);
    const { events } = useGrowEvents();
    const upcomingEvents = useMemo(() => {
        if (events) {
            const now = new Date();
            return events
                .filter((e) => e.date > now)
                .slice(0, Math.min(events.length, 1));
        } else {
            return [];
        }
    }, [events]);

    const { registrations } = useRegistrationsOfUser(user?.id);

    if (!profile) {
        return <></>;
    }

    return (
        <Flex wrap="wrap">
            <VStack flexGrow={1} alignItems="start" gap={6}>
                <Heading size="md">
                    <Text as="span" color="gray.400">
                        Welcome back,
                    </Text>
                    &nbsp;
                    {profile.firstName}
                </Heading>
                {upcomingEvents.length > 0 ? (
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
                                <GrowEventCard
                                    key={event.id}
                                    event={event}
                                    registration={registrations?.find(
                                        (registration) =>
                                            registration.eventId === event.id
                                    )}
                                />
                            ))}
                        </VStack>
                    </Box>
                ) : undefined}

                <YourTeam userId={profile.userId} />
                {profile.university === kitName && !SQRegistrationOver ? (
                    <SQInfo
                        userId={profile.userId}
                        keyQualification={profile.keyQualification}
                    />
                ) : undefined}
            </VStack>
        </Flex>
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
                    <CreateTeamButton size="sm" ml={2} />
                </Box>
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

const SQRegistrationEnd = new Date(2022, 10, 7); // month is zero indexed
const SQRegistrationOver = new Date() > SQRegistrationEnd;
const SQInfo = ({
    userId,
    keyQualification,
}: {
    userId: string;
    keyQualification: boolean;
}) => {
    const { updateProfile } = useUpdateProfile();
    const [updated, setUpdated] = useState(false);
    async function setSQ(value: boolean) {
        await updateProfile({ keyQualification: value, userId });
        setUpdated(!updated);
    }
    return (
        <Box>
            <Heading mb={1} size="sm" color="gray.400" fontSize={12}>
                Key and interdisciplinary qualification
            </Heading>
            <Box>
                All KIT students have the opportunity to go through a special
                training format, the successful completion of which is rewarded
                with the &quot;Startup Diploma&quot; certificate. More info:
                &nbsp;
                <Link
                    href="https://www.hoc.kit.edu/startupdiploma.php"
                    isExternal
                >
                    HoC <ExternalLinkIcon mx="2px" />
                </Link>
                <FormControl as={HStack} mt={1}>
                    <Switch
                        onChange={(e) => setSQ(e.target.checked)}
                        isChecked={
                            (updated && !keyQualification) ||
                            (keyQualification && !updated)
                        }
                    />
                    <FormLabel>
                        Binding registration as key and interdisciplinary
                        qualifications
                    </FormLabel>
                </FormControl>
            </Box>
        </Box>
    );
};

export default ConnectIndex;

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
