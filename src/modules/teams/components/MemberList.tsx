import { SimpleGrid, Text, VStack } from '@chakra-ui/react';

import ProfileCard from 'modules/profile/components/ProfileCard';
import { Profile } from 'modules/profile/types';

type MemberListProps = {
    members: Profile[];
};

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    return (
        <VStack alignItems="stretch">
            <Text fontSize="sm" color="gray.500">
                Members
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                {members.map((member) => (
                    <ProfileCard key={member.userId} profile={member} />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default MemberList;
