import Card from '@/components/Card';
import { Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Team } from '../types';

const TeamLogo = dynamic(() => import('./TeamLogo'), {
    ssr: false,
});

export default function TeamCard(team: Team) {
    return (
        <LinkBox>
            <Card
                as={Flex}
                _hover={{ filter: 'brightness(110%)', bg: 'whiteAlpha.100' }}
                _active={{ filter: 'brightness(110%)', bg: 'whiteAlpha.200' }}
                overflow="hidden"
                h={20}
                alignItems="stretch"
            >
                <TeamLogo {...team} size={20} />
                <Flex
                    flexDir="column"
                    px={4}
                    alignItems="start"
                    justify="center"
                    flexGrow={1}
                    gap={0}
                >
                    <Link href={`/connect/teams/${team.id}`} passHref legacyBehavior>
                        <LinkOverlay>
                            <Heading size="sm">{team.name}</Heading>
                        </LinkOverlay>
                    </Link>
                </Flex>
            </Card>
        </LinkBox>
    );
}
