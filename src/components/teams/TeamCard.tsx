import {
    Box,
    Flex,
    Heading,
    HStack,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { Team } from 'model';
import dynamic from 'next/dynamic';

const TeamLogo = dynamic(() => import('./TeamLogo'), {
    ssr: false,
});

export default function TeamCard(team: Team) {
    return (
        <LinkBox>
            <HStack
                bg="whiteAlpha.50"
                _hover={{ filter: 'brightness(110%)', bg: 'whiteAlpha.100' }}
                _active={{ filter: 'brightness(110%)', bg: 'whiteAlpha.200' }}
                overflow="hidden"
                borderRadius={8}
                h={20}
                alignItems="stretch"
            >
                <TeamLogo {...team} size={20} />
                <Flex
                    flexDir="column"
                    p={4}
                    alignItems="start"
                    flexGrow={1}
                    gap={0}
                >
                    <LinkOverlay my="auto" href={`/connect/teams/${team.id}`}>
                        <Heading size="md">{team.name}</Heading>
                    </LinkOverlay>
                    <Box mt={0} fontSize="md" color="whiteAlpha.500">
                        {team.tags.join(' • ')}
                    </Box>
                </Flex>
            </HStack>
        </LinkBox>
    );
}
