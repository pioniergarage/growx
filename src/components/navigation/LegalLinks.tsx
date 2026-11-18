import { Button, Flex, Link } from '@chakra-ui/react';
import PageLink from './PageLink';

export default function LegalLinks({ stacked = false }: { stacked?: boolean }) {
    return (
        <Flex direction={stacked ? 'column' : 'row'} wrap="wrap" gap={stacked ? 1 : 4}>
            <Link href="https://pioniergarage.de/en/imprint" isExternal>
                Imprint
            </Link>
            <PageLink href="/privacy">Privacy</PageLink>
            <Button
                variant="link"
                fontSize="inherit"
                fontWeight="normal"
                color="inherit"
                alignSelf="flex-start"
                onClick={() => window.dispatchEvent(new Event('showCookieBanner'))}
            >
                Cookie settings
            </Button>
        </Flex>
    );
}
