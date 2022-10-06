import { Button, HStack, Show } from '@chakra-ui/react';
import Link from 'next/link';
import GrowConnectWrapper from './GrowConnectWrapper';
import { Logo, NavBarContainer } from './Nav';

export default function GrowNav() {
    return (
        <NavBarContainer>
            <Logo />
            <HStack gap={{ base: 2, sm: 0, lg: 2 }}>
                <Show above="md">
                    <Link href="/#faqs">
                        <Button variant="ghost">FAQs</Button>
                    </Link>
                    <Link href="/#timeline">
                        <Button variant="ghost">Timeline</Button>
                    </Link>
                </Show>
                <GrowConnectWrapper />
            </HStack>
        </NavBarContainer>
    );
}
