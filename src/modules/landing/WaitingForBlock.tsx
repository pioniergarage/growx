import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';

export default function WaitingForBlock() {
    return (
        <>
            <Box
                maxW="container.xl"
                top={0}
                w="100%"
                h="100%"
                position="absolute"
                zIndex={-10}
            >
                <Box
                    position="absolute"
                    width="100%"
                    height="50%"
                    bgGradient="linear-gradient(128.16deg, #5557f777 8.06% , #5557f777 83.26%)"
                    borderRadius="50%"
                    filter="blur(200px)"
                />
            </Box>
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
        </>

    );
}
