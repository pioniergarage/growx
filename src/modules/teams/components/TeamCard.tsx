import {
    Box,
    Flex,
    Heading,
    HStack,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Team } from '../types';

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
                    <Link href={`/connect/teams/${team.id}`} passHref>
                        <LinkOverlay my="auto">
                            <Heading size="md">{team.name}</Heading>
                        </LinkOverlay>
                    </Link>
                    <Box mt={0} fontSize="md" color="whiteAlpha.500">
                        {team.tags.join(' • ')}
                    </Box>
                </Flex>
            </HStack>
        </LinkBox>
    );
}
