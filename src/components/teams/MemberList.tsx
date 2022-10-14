import { SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { Profile } from 'model';
import ProfileCard from '../profile/ProfileCard';

type MemberListProps = {
    members: Profile[];
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
    return (
        <VStack alignItems="stretch">
            <Text fontSize="sm" color="gray.500">
                Members
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} gap={4}>
                {members.map((member) => (
                    <ProfileCard
                        key={member.userId}
                        firstName={member.firstName}
                        lastName={member.lastName}
                        email={member.email}
                        avatar={member.avatar}
                        userId={member.userId}
                        phone={member.phone}
                    />
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default MemberList;
