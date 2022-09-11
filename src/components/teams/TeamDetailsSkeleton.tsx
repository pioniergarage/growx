import {
    Flex,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface TeamDetailsSekeltonProps extends PropsWithChildren {
    isLoading: boolean;
}

const TeamDetailsSkeleton: React.FC<TeamDetailsSekeltonProps> = ({
    isLoading,
    children,
}) => {
    if (!isLoading) return <>{children}</>;
    else
        return (
            <>
                <Flex alignItems="start" gap={4} wrap="wrap">
                    <Skeleton
                        w={{ base: 16, sm: 24 }}
                        h={{ base: 16, sm: 24 }}
                    />
                    <Flex alignItems="start" flexDir="column" flexGrow={1}>
                        <Skeleton w="16rem" h={10} />
                    </Flex>
                </Flex>
                <SkeletonText noOfLines={5} lineHeight={4} skeletonHeight={3} />
                <HStack>
                    <SkeletonCircle size="3rem" />{' '}
                    <SkeletonCircle size="3rem" />{' '}
                    <SkeletonCircle size="3rem" />
                </HStack>
            </>
        );
};

export default TeamDetailsSkeleton;
