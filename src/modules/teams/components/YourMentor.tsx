import { Text, VStack } from '@chakra-ui/react';
import { useTeamMentor } from 'modules/mentor/hooks';

import ProfileCard from 'modules/profile/components/ProfileCard';
import { Team } from '../types';

type YourMentorProps = {
    team: Team;
};

const YourMentor: React.FC<YourMentorProps> = ({ team }) => {
    const { mentor } = useTeamMentor(team.id);

    if (!mentor) {
        return <></>;
    }
    return (
        <VStack alignItems="stretch">
            <Text fontSize="sm" color="gray.500">
                Your mentor
            </Text>
            <ProfileCard
                key={mentor.profile.userId}
                profile={mentor.profile}
                contact={mentor.contact}
            />
        </VStack>
    );
};

export default YourMentor;
