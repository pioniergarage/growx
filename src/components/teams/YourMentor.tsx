import { Text, VStack } from '@chakra-ui/react';
import { useTeamMentor } from 'hooks/team';
import { Team } from 'model';
import ProfileCard from '../profile/ProfileCard';

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
                key={mentor.userId}
                firstName={mentor.firstName}
                lastName={mentor.lastName}
                email={mentor.email}
                avatar={mentor.avatar}
                userId={mentor.userId}
                phone={mentor.phone}
                bio={mentor.bio}
            />
        </VStack>
    );
};

export default YourMentor;
