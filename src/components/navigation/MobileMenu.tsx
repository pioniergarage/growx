import { Flex } from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NavigationItem } from '../../modules/navigation/GrowNav';
import { MobileMenuButton } from './Nav';

const MobileMenu: React.FC<{
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

    if (!isOpen) {
        return <></>;
    }

    return (
        <Flex
            flexDir="column"
            bg="blackAlpha.900"
            position="fixed"
            top="0"
            bottom="0"
            h="100vh"
            mt="3.5rem"
            left="0"
            w="100%"
            zIndex={2000}
            overflowY="scroll"
        >
            {items.map(
                (item) =>
                    !(item.isHidden && item.isHidden(profile)) && (
                        <MobileMenuButton
                            key={item.label}
                            href={item.href}
                            icon={item.icon}
                        >
                            {item.label}
                        </MobileMenuButton>
                    )
            )}
        </Flex>
    );
};

export default MobileMenu;
