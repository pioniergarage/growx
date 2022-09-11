import { Box, Text } from '@chakra-ui/react';
import { Team } from 'model';

interface SupportRequestInfoProps {
    team?: Team;
}
const SupportRequestInfo: React.FC<SupportRequestInfoProps> = ({ team }) => {
    if (!team || team.requestSupport.length === 0) return <></>;
    return (
        <Box>
            <Text>Looking for mentoring: {team.requestSupport.join(', ')}</Text>
        </Box>
    );
};

export default SupportRequestInfo;
