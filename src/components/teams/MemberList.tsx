import { Flex, SkeletonCircle, Text, VStack } from '@chakra-ui/react';
import { Profile } from 'model';
import UserAvatar from '../avatar/UserAvatar';

interface MemberListProps {
    members: Profile[];
    loading: boolean;
}

const MemberList: React.FC<MemberListProps> = ({ members, loading }) => {
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
};

export default MemberList;
