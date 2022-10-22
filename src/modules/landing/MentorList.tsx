import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { PublicMentorProfile } from 'modules/mentor/types';

import UserAvatar from '../../modules/avatar/components/UserAvatar';

type MentorListProps = {
    mentors: PublicMentorProfile[];
};
const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
    return (
        <VStack as="ul" alignItems="start" gap={2}>
            {mentors.map((mentor) => (
                <Flex as="li" key={mentor.userId} gap={4} alignItems="center">
                    <UserAvatar profile={mentor} alignSelf="start" />
                    <Flex flexDir="column">
                        <Heading size="sm">
                            {mentor.firstName + ' ' + mentor.lastName}
                        </Heading>
                        <Text color="gray.400" lineHeight={1.3}>
                            {mentor.bio}
                        </Text>
                    </Flex>
                </Flex>
            ))}
        </VStack>
    );
};

export default MentorList;
