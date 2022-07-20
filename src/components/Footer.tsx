import { Flex, Grid, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Footer() {
  return (
    <Flex direction="column" as="footer" alignItems="center" p={6}>
      <HStack>
        <NextLink href="faq">
          <Link>FAQ</Link>
        </NextLink>
        <NextLink href="">
          <Link>Contact</Link>
        </NextLink>
        <NextLink href="">
          <Link>Terms &amp; Conditions</Link>
        </NextLink>
      </HStack>
    </Flex>
  );
}
