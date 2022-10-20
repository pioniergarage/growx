import {
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    LinkBox,
    LinkOverlay,
    Text,
    useToast,
    VStack,
} from '@chakra-ui/react';

import UserAvatar from 'modules/avatar/components/UserAvatar';
import { Profile } from 'modules/profile/types';
import {
    useAcceptRequest,
    useDeclineRequest,
    useTeamRequests,
} from 'modules/teams/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { Team } from '../types';

interface RequestItemProps {
    profile: Profile;
    loading: boolean;
    onAccept: () => void;
    onDecline: () => void;
}

const RequestItem: React.FC<RequestItemProps> = ({
    profile,
    loading,
    onAccept,
    onDecline,
}) => {
    return (
        <LinkBox>
            <Grid
                templateColumns={{ base: '4rem 1fr', sm: '4rem 1fr 1fr' }}
                alignItems="center"
                justifyItems="start"
                gap={1}
            >
                <GridItem rowSpan={{ base: 2, sm: 1 }}>
                    <UserAvatar {...profile} />
                </GridItem>
                <GridItem fontWeight="bold">
                    <Link href={'/connect/profiles/' + profile.userId} passHref>
                        <LinkOverlay>
                            {profile.firstName + profile.lastName}
                        </LinkOverlay>
                    </Link>
                </GridItem>
                <GridItem
                    justifySelf={{ base: 'start', sm: 'end' }}
                    colStart={{ base: 2, sm: 'auto' }}
                >
                    <ButtonGroup
                        variant="outline"
                        size="sm"
                        isDisabled={loading}
                    >
                        <Button onClick={onDecline}>Decline</Button>
                        <Button onClick={onAccept} colorScheme="green">
                            Accept
                        </Button>
                    </ButtonGroup>
                </GridItem>
            </Grid>
        </LinkBox>
    );
};

interface TeamRequestsProps {
    team: Team;
}

const TeamRequests: React.FC<TeamRequestsProps> = ({ team }) => {
    const toast = useToast();
    const { profiles } = useTeamRequests(team.id);
    const requests = profiles || [];

    const { acceptRequest } = useAcceptRequest();
    const { declineRequest } = useDeclineRequest();

    const [loadingIds, setLoadingIds] = useState<string[]>([]);

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

    if (requests.length === 0) {
        return <></>;
    }

    return (
        <VStack alignItems="stretch">
            <Text fontSize="sm" color="gray.500" mb={2}>
                Requests
            </Text>
            <VStack gap={2} alignItems="stretch">
                {requests.map((member) => (
                    <RequestItem
                        onAccept={() => onAcceptRequest(member)}
                        onDecline={() => onDeclineRequest(member)}
                        profile={member}
                        key={member.userId}
                        loading={loadingIds.includes(member.userId)}
                    />
                ))}
            </VStack>
        </VStack>
    );
};
export default TeamRequests;
