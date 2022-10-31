import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import UserAvatar from 'modules/avatar/components/UserAvatar';

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
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} columnGap={8} rowGap={2}>
                {members.map((member) => (
                    <Flex key={member.userId} alignItems="center" gap={4}>
                        <UserAvatar profile={member} />
                        <Box fontWeight="semibold" fontSize={18}>
                            {member.firstName + ' ' + member.lastName}
                        </Box>
                    </Flex>
                ))}
            </SimpleGrid>
        </VStack>
    );
};

export default MemberList;
