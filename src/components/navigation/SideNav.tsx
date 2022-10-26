import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
} from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NavigationItem } from './GrowNav';
import { GrowLogo, MenuToggle, MobileMenuButton } from './Nav';

const SideNav: React.FC<{
    profile?: Profile;
    isOpen: boolean;
    onClose: () => void;
    items: NavigationItem[];
}> = ({ profile, isOpen, onClose, items }) => {
    const router = useRouter();

    useEffect(() => {
        if (onClose) {
            router.events.on('routeChangeComplete', onClose);

            return () => {
                router.events.off('routeChangeComplete', onClose);
            };
        }
    }, [router, onClose]);

    return (
        <>
            <Drawer
                onClose={onClose}
                isOpen={isOpen}
                placement="left"
                size="xs"
            >
                <DrawerOverlay />
                <DrawerContent bg="gray.900">
                    <DrawerHeader as={Flex} alignItems="center" pl={4} pt={5}>
                        <MenuToggle onClick={onClose} variant="ghost" mr={4} />
                        <GrowLogo />
                    </DrawerHeader>
                    <DrawerBody p={0} mt={1} zIndex={20}>
                        {items.map(
                            (item) =>
                                !(item.isHidden && item.isHidden(profile)) && (
                                    <MobileMenuButton
                                        key={item.label}
                                        href={item.href}
                                    >
                                        {item.label}
                                    </MobileMenuButton>
                                )
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideNav;
