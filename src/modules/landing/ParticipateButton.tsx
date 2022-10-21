import PageLink from '@/components/navigation/PageLink';
import { Box } from '@chakra-ui/react';
import { isSignUpEnabled } from 'utils/dates';

const ParticipateButton = () => {
    if (!isSignUpEnabled) {
        return (
            <Box
                as="button"
                disabled
                bgGradient="linear(to-r, secondary, primary)"
                filter="brightness(0.5)"
                px={4}
                py={3}
                borderRadius={4}
                minW="16rem"
                fontWeight="black"
                opacity={0.9}
            >
                Participate
            </Box>
        );
    }
    return (
        <PageLink href="/connect/signup">
            <Box
                as="button"
                bgGradient="linear(to-r, secondary, primary)"
                px={4}
                py={3}
                borderRadius={4}
                minW="16rem"
                fontWeight="black"
                opacity={0.9}
                _hover={{ opacity: '0.7' }}
                _active={{ opacity: '1', boxShadow: 'outline' }}
                _focus={{ opacity: '1', boxShadow: 'outline' }}
                transition="all .15s"
            >
                Participate
            </Box>
        </PageLink>
    );
};

export default ParticipateButton;