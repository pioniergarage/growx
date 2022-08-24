import {
    VStack,
    Text,
    Skeleton,
    Grid,
    GridItem,
    ButtonGroup,
    Button,
} from '@chakra-ui/react';
import { Profile } from 'model';
import UserAvatar from '../avatar/UserAvatar';

function RequestItem({
    profile,
    loading,
    onAccept,
    onDecline,
}: {
    profile: Profile;
    loading: boolean;
    onAccept: () => void;
    onDecline: () => void;
}) {
    return (
        <Grid
            templateColumns="4rem 10rem 1fr 1fr"
            alignItems="center"
            justifyItems="start"
            gap={1}
        >
            <GridItem>
                <UserAvatar profile={profile} />
            </GridItem>
            <GridItem>{profile.firstName + profile.lastName}</GridItem>
            <GridItem color="gray.500">{profile.email}</GridItem>
            <GridItem justifySelf="end">
                <ButtonGroup variant="outline" size="sm" isDisabled={loading}>
                    <Button onClick={onDecline}>Decline</Button>
                    <Button onClick={onAccept} colorScheme="green">
                        Accept
                    </Button>
                </ButtonGroup>
            </GridItem>
        </Grid>
    );
}

export default function RequestList({
    requests,
    loading,
    loadingRequests,
    onAccept,
    onDecline,
}: {
    requests: Profile[];
    loading: boolean;
    loadingRequests: string[];
    onDecline: (profile: Profile) => void;
    onAccept: (profile: Profile) => void;
}) {
    return (
        <VStack alignItems="stretch">
            <Skeleton isLoaded={!loading} minH={2} minW={20}>
                <Text fontSize="sm" color="gray.500" mb={2}>
                    {requests.length === 0 ? 'No requests' : 'Requests'}
                </Text>
                <VStack gap={2} alignItems="stretch">
                    {requests.map((member) => (
                        <RequestItem
                            onAccept={() => onAccept(member)}
                            onDecline={() => onDecline(member)}
                            profile={member}
                            key={member.userId}
                            loading={loadingRequests.includes(member.userId)}
                        />
                    ))}
                </VStack>
            </Skeleton>
        </VStack>
    );
}
