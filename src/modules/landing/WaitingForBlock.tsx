import { Flex, Heading, Text, VStack } from '@chakra-ui/react';

export default function WaitingForBlock() {
    return (
        <VStack mx={8}>
            <Heading size="lg" textAlign="center">
                What Are You Waiting For?
            </Heading>
            <Flex maxW="xl" gap={6} alignItems="center" flexDirection="column">
                <Text textAlign="center">
                    If you are motivated to work with other students on new
                    ideas and concepts and want to learn all about startups,
                    then{' '}
                    <Text as="span" fontWeight="semibold">
                        GROW
                    </Text>{' '}
                    is the place for you!
                </Text>
            </Flex>
        </VStack>
    );
}
