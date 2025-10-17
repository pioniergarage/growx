import { EventSkeleton } from '@/components/EventSkeleton';
import { Heading, VStack } from '@chakra-ui/react';

interface Props {
    season?: string
}

/**
 * Component to display when three or less events are in the events database (i.e. only kickoff, midterms and finals)
 * @returns The placeholder
 */
const TimelinePlaceholder: React.FC<Props> = ({ season }) => {
    return (
        <VStack gap={4}>
            <Heading>{season ?? "Loading"}</Heading>
            <VStack gap={4} alignItems="stretch" maxW="3xl">
                {season == undefined ?
                    <EventSkeleton /> //TODO why does this not work?
                    :
                    <Heading size={{ base: 'xs', sm: 'md' }}>
                        Coming soon!
                    </Heading>
                }
            </VStack>
        </VStack>
    );
};

export default TimelinePlaceholder;
