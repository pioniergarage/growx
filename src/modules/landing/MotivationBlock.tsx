import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { FaRegComments, FaRocket, FaUserFriends } from 'react-icons/fa';

interface MotivationItemProps extends PropsWithChildren {
    heading: string;
    icon: IconType;
}

const MotivationItem: React.FC<MotivationItemProps> = ({
    heading,
    icon: Icon,
    children,
}) => {
    return (
        <VStack gap={2} alignItems="flex-start">
            <Flex alignItems="center" gap={3}>
                <Flex
                    borderRadius={4}
                    bg="transparent"
                    width="2.5rem"
                    height="2.5rem"
                    justifyContent="center"
                    alignItems="center"
                    border="2px solid var(--secondary)"
                    boxShadow="0px 0px 10px 2px var(--secondary), 0px 0px 6px 2px var(--secondary) inset"
                >
                    <Icon />
                </Flex>
                <Text as="h3" fontWeight="bold" fontSize="lg">
                    {heading}
                </Text>
            </Flex>
            <Text variant="info">{children}</Text>
        </VStack>
    );
};

export default function MotivationBlock() {
    return (
        <VStack alignItems="start" gap={4}>
            <Heading size="lg">Why GROW?</Heading>
            <SimpleGrid
                columns={{ base: 1, lg: 3 }}
                gap={8}
                w="full"
                alignItems="start"
                textAlign="left"
            >
                <MotivationItem icon={FaUserFriends} heading="Find Your Team">
                    Don&apos;t have a team yet? GROW is the perfect
                    opportunity to find teammates! At the kickoff event, you
                    can pitch your idea or just ask other teams whether they
                    still need Co-Founders.
                </MotivationItem>
                <MotivationItem
                    icon={FaRocket}
                    heading="Kickstart Your Business"
                >
                    With numerous workshops geared towards founders
                    as well as the opportunity to win funding, GROW is
                    your chance to turn your vision into reality.
                </MotivationItem>
                <MotivationItem
                    icon={FaRegComments}
                    heading="Learn Through Mentorship"
                >
                    Each team will receive support from our experienced mentors
                    and buddies, who will guide you along your journey as you
                    GROW your business to its full potential.
                </MotivationItem>
            </SimpleGrid>
        </VStack>
    );
}
