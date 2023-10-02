import PageLink from '@/components/navigation/PageLink';
import { Box } from '@chakra-ui/react';

const ParticipateButton = (props: { isDisabled?: boolean }) => {
    if (props.isDisabled) {
        return (
            <Box
                as="button"
                disabled
                bgGradient="linear(to-r, primary, #472b87)"
                filter="brightness(0.5)"
                px={6}
                py={2}
                borderRadius={'md'}
                minW="10rem"
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
                bgGradient="linear(to-b, primary, #472b87)"
                px={6}
                py={2}
                borderRadius={'md'}
                boxShadow={'0rem 0rem 1.3rem rgba(255, 255, 255, 0.433)'}
                minW="10rem"
                fontWeight="black"
                //opacity={0.9}
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
