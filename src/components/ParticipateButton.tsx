import { BoxProps, Box } from '@chakra-ui/react';
import PageLink from './nav/link';

export default function ParticipateButton(props: BoxProps) {
    return (
        <PageLink href='/participate'>
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
}
