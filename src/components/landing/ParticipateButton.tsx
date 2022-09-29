import { Box, BoxProps } from '@chakra-ui/react';
import PageLink from '../navigation/PageLink';

type ParticipateButtonProps = BoxProps & {
    disabled: boolean;
};

const ParticipateButton: React.FC<ParticipateButtonProps> = ({
    disabled,
    ...props
}) => {
    if (disabled) {
        return (
            <Box
                as="button"
                disabled
                bgGradient="linear(to-r, secondary, primary)"
                filter="brightness(0.5)"
                px={4}
                py={3}
                borderRadius={4}
                minW={72}
                fontWeight="black"
                opacity={0.9}
                {...props}
            >
                Participate
            </Box>
        );
    }
    return (
        <PageLink href="/connect">
            <Box
                as="button"
                bgGradient="linear(to-r, secondary, primary)"
                px={4}
                py={3}
                borderRadius={4}
                minW={72}
                fontWeight="black"
                opacity={0.9}
                _hover={{ opacity: '0.7' }}
                _active={{ opacity: '1', boxShadow: 'outline' }}
                _focus={{ opacity: '1', boxShadow: 'outline' }}
                transition="all .15s"
                {...props}
            >
                Participate
            </Box>
        </PageLink>
    );
};

export default ParticipateButton;
