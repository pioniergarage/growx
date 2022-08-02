import { Heading, VStack, Text, Flex } from '@chakra-ui/react';
import ParticipateButton from './ParticipateButton';

export default function WaitingForBlock() {
    return (
        <VStack mx={8}>
            <Heading size="lg">What Are You Waiting For?</Heading>
            <Flex maxW="xl" gap={6} alignItems="center" flexDirection='column'>
                <Text textAlign='center'>
                    If you are motivated to work with other students on new
                    ideas and concepts and want to learn all about startups,
                    then{' '}
                    <Text as="span" fontWeight="semibold">
                        GROW
                    </Text>{' '}
                    is the place for you!
                </Text>
                <ParticipateButton />
            </Flex>
        </VStack>
    );
}
