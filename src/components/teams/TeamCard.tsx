import {
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { Team } from 'model';

export default function TeamCard(team: Team) {
    return (
        <LinkBox>
            <HStack
                bg="whiteAlpha.50"
                _hover={{ filter: 'brightness(120%)', bg: 'whiteAlpha.100' }}
                _active={{ filter: 'brightness(130%)', bg: 'whiteAlpha.300' }}
                overflow="hidden"
                borderRadius={8}
                h={20}
                alignItems="stretch"
            >
                <Image
                    src="https://grow-legacy.pioniergarage.de/media/startup_logos/Logo.jpeg"
                    alt={team.name}
                    w={20}
                    h={20}
                    objectFit="cover"
                />
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
