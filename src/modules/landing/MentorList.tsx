import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { getFullName, Profile } from 'modules/profile/types';

import UserAvatar from '../../modules/avatar/components/UserAvatar';

type MentorListProps = {
    mentors: Profile[];
};
const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
    return (
        <VStack alignItems="start">
            <Heading size="lg">Our Mentors</Heading>
            <VStack as="ul" alignItems="start" gap={2}>
                {mentors.map((mentor) => (
                    <Flex
                        as="li"
                        key={mentor.user_id}
                        gap={4}
                        alignItems="center"
                    >
                        <UserAvatar profile={mentor} alignSelf="start" />
                        <Flex flexDir="column">
                            <Heading size="sm">{getFullName(mentor)}</Heading>
                            <Text color="gray.400" lineHeight={1.3}>
                                {mentor.bio}
                            </Text>
                        </Flex>
                    </Flex>
                ))}
            </VStack>
        </VStack>
    );
};

export default MentorList;
