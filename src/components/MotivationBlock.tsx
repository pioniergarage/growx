import { Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { FaRegComments, FaRocket, FaUserFriends } from 'react-icons/fa';

function MotivationItem({
    heading,
    icon: Icon,
    children,
}: PropsWithChildren & { heading: string; icon: IconType }) {
    return (
        <VStack gap={1} alignItems="flex-start">
            <Flex
                borderRadius={4}
                bgColor='whiteAlpha.200'
                width="2.5rem"
                height="2.5rem"
                justifyContent="center"
                alignItems="center"
            >
                <Icon />
            </Flex>
            <Heading size="md" color="primary">
                {heading}
            </Heading>
            <Text>{children}</Text>
        </VStack>
    );
}

export default function MotivationBlock() {
    return (
        <VStack alignItems='start'>
            <Heading size="lg">Why GROW?</Heading>
            <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap={8}
                w="full"
                alignItems='start'
                textAlign='left'
            >
                <MotivationItem icon={FaUserFriends} heading="Find Your Team">
                    You don&apos;t have a team yet? GROW is the perfect
                    opportunity to find team mates! At the kickoff event, you
                    can pitch your idea or just ask other teams whether they
                    still need Co-Founders.
                </MotivationItem>
                <MotivationItem
                    icon={FaRocket}
                    heading="Kickstart Your Business"
                >
                    Offering numerous workshops about multiple topics as well as
                    the opportunity to win funding, GROW is the perfect
                    opportunity to start your own company.
                </MotivationItem>
                <MotivationItem
                    icon={FaRegComments}
                    heading="Learn Through Mentorship"
                >
                    Each team will receive support by our competent Mentors and
                    Buddies. This will help your business to grow beyond its
                    limits.
                </MotivationItem>
            </SimpleGrid>
        </VStack>
    );
}
