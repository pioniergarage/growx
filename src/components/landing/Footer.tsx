import { Flex, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
    return (
        <Flex
            direction="column"
            as="footer"
            alignItems="center"
            p={6}
            position="absolute"
            bottom={0}
            left={0}
            w="100%"
        >
            <HStack>
                <NextLink href="/#faqs">
                    <Link>FAQ</Link>
                </NextLink>
                <Link href="mailto:grow@pioniergarage.de">Contact</Link>
                <Link href="https://pioniergarage.de/impressum/">
                    Impressum
                </Link>
            </HStack>
        </Flex>
    );
}
