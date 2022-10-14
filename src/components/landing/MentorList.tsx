import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { PublicMentorProfile } from 'model';
import UserAvatar from '../avatar/UserAvatar';

type MentorListProps = {
    mentors: PublicMentorProfile[];
};
const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
    return (
        <VStack alignItems="start">
            <Heading size="lg">Our Mentors</Heading>
            <VStack as="ul" alignItems="start" gap={2}>
                {mentors.map((mentor) => (
                    <Flex
                        as="li"
                        key={mentor.userId}
                        gap={4}
                        alignItems="center"
                    >
                        <UserAvatar
                            firstName={mentor.firstName}
                            lastName={mentor.lastName}
                            userId={mentor.userId}
                            avatar={mentor.avatar}
                            alignSelf="start"
                        />
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
        </VStack>
    );
};

export default MentorList;
