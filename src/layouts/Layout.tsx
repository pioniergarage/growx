import Head from 'next/head';
import Footer from '@/components/landing/Footer';
import { PropsWithChildren, useState } from 'react';
import {
    NavBarContainer,
    Logo,
    MenuToggle,
    MenuLinksContainer,
    NavItem,
} from '@/components/navigation/Nav';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';

function GrowNav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer>
            <Logo>GROW X</Logo>
            <MenuToggle onClick={toggle} isOpen={isOpen} />
            <MenuLinksContainer isOpen={isOpen}>
                <NavItem onClick={toggle} to="#faqs">
                    FAQ
                </NavItem>
                <NavItem onClick={toggle} to="#timeline">
                    Timeline
                </NavItem>
                <Link href="/connect/">
                    <Button>GROWconnect</Button>
                </Link>
            </MenuLinksContainer>
        </NavBarContainer>
    );
}

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <title>
                    GROW X - Germany&apos;s Largest Student Founding Contest
                </title>
                <meta
                    name="description"
                    content="GrowX - Founding Contest. Become an entrepreneur and advance your idea over 11 weeks. Get support, build your prototype and test your market."
                />
            </Head>
            <GrowNav />
            <main className="pt-14">{children}</main>
            <Footer />
        </>
    );
}
