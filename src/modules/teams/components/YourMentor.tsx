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
                key={mentor.user_id}
                forename={mentor.forename}
                surname={mentor.surname}
                avatar={mentor.avatar}
                user_id={mentor.user_id}
                bio={mentor.bio}
            />
        </VStack>
    );
};

export default YourMentor;
