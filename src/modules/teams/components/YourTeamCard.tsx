import Card from '@/components/Card';
import { Center, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';

import Link from 'next/link';
import { FaUsersCog } from 'react-icons/fa';

export default function YourTeamCard() {
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
                <Center w={20} h={20} bgColor="whiteAlpha.200">
                    <FaUsersCog size={25} />
                </Center>
                <Flex
                    flexDir="column"
                    px={4}
                    alignItems="start"
                    justify="center"
                    flexGrow={1}
                    gap={0}
                >
                    <Link href={`/connect/`} passHref>
                        <LinkOverlay>
                            <Heading size="sm">Your Team</Heading>
                        </LinkOverlay>
                    </Link>
                </Flex>
            </Card>
        </LinkBox>
    );
}
