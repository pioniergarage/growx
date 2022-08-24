import { VStack, Flex, SkeletonCircle, Text } from '@chakra-ui/react';
import { Profile } from 'model';
import UserAvatar from '../avatar/UserAvatar';

export default function MemberList({
    members,
    loading,
}: {
    members: Profile[];
    loading: boolean;
}) {
    return (
        <VStack alignItems="start">
            <Text fontSize="sm" color="gray.500">
                Members
            </Text>
            <Flex gap={2}>
                {members.map((member) => (
                    <UserAvatar key={member.userId} profile={member} />
                ))}
                {loading ? (
                    <>
                        <SkeletonCircle size="10" />
                        <SkeletonCircle size="10" />
                        <SkeletonCircle size="10" />
                    </>
                ) : undefined}
            </Flex>
        </VStack>
    );
}
