import { Flex, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
    return (
        <Flex direction="column" as="footer" alignItems="center" p={6}>
            <HStack>
                <NextLink href="/#faq">
                    <Link>FAQ</Link>
                </NextLink>
                <Link href="mailto:grow@pioniergarage.de">Contact</Link>
                <Link href="https://pioniergarage.de/impressum/">Impressum</Link>
            </HStack>
        </Flex>
    );
}
