import { Heading, VStack } from '@chakra-ui/react';

interface Props {
    season: string
}

/**
 * Component to display when three or less events are in the events database (i.e. only kickoff, midterms and finals)
 * @returns The placeholder
 */
const TimelinePlaceholder: React.FC<Props> = ({ season }) => {
    return (
        <VStack gap={4}>
            <Heading>{season}</Heading>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                <Heading size={{ base: 'xs', sm: 'md' }}>
                    Coming soon!
                </Heading>
            </VStack>
        </VStack>
    );
};

export default TimelinePlaceholder;
