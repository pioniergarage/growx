import { Flex, SimpleGrid } from '@chakra-ui/react';
import ProfileCard from 'modules/profile/components/ProfileCard';
import { Profile } from 'modules/profile/types';

type MentorListProps = {
    mentors: Profile[];
};
const MentorList: React.FC<MentorListProps> = ({ mentors }) => {
    const halfWayIndex = Math.ceil(mentors.length / 2);

    const firstHalfMentors = mentors.slice(0, halfWayIndex);
    const secondHalfMentors = mentors.slice(halfWayIndex);
    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
            <Flex flexDir="column" gap={6}>
                {firstHalfMentors.map((mentor) => (
                    <ProfileCard key={mentor.userId} profile={mentor} />
                ))}
            </Flex>

            <Flex flexDir="column" gap={6}>
                {secondHalfMentors.map((mentor) => (
                    <ProfileCard key={mentor.userId} profile={mentor} />
                ))}
            </Flex>
        </SimpleGrid>
    );
};

export default MentorList;
