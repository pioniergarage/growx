import { Flex, Text, VStack } from '@chakra-ui/react';
import { Profile } from 'model';
import UserAvatar from '../avatar/UserAvatar';

interface MemberListProps {
    members: Profile[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    return (
        <VStack alignItems="start">
            <Text fontSize="sm" color="gray.500">
                Members
            </Text>
            <Flex gap={2}>
                {members.map((member) => (
                    <UserAvatar key={member.userId} profile={member} />
                ))}
            </Flex>
        </VStack>
    );
};

export default MemberList;
