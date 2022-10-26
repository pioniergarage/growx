import { useDisclosure } from '@chakra-ui/react';
import { useProfile } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import { DesktopMenu } from './DesktopMenu';
import { GrowLogo, MenuToggle, TopNavBar } from './Nav';
import ProfileMenuWrapper from './ProfileMenuWrapper';
import MobileMenu from './MobileMenu';

export type NavigationItem = {
    href: string;
    label: string;
    isHidden?: (profile?: Profile) => boolean;
};

const navigationItems: NavigationItem[] = [
    {
        href: '/',
        label: 'Home',
    },
    {
        href: '/startup_diploma',
        label: 'Startup Diploma',
    },
    {
        href: '/mentor',
        label: 'Mentors',
    },
    {
        href: '/connect',
        label: 'News',
        isHidden: (profile) => !profile,
    },
    {
        href: '/connect/teams',
        label: 'Teams',
        isHidden: (profile) => !profile,
    },

    {
        href: '/connect/events',
        label: 'Events',
        isHidden: (profile) => !profile,
    },
];

export default function GrowNav() {
    const { profile } = useProfile();

    const {
        isOpen: isSideNavOpen,
        onClose: onSideNavClose,
        onToggle: onSideNavToggle,
    } = useDisclosure();

    return (
        <>
            <TopNavBar>
                <MobileMenu
                    items={navigationItems}
                    profile={profile}
                    isOpen={isSideNavOpen}
                    onClose={onSideNavClose}
                />
                <MenuToggle onClick={onSideNavToggle} isOpen={isSideNavOpen} />
                <GrowLogo flexGrow={1} />
                <DesktopMenu items={navigationItems} profile={profile} />
                <ProfileMenuWrapper profile={profile} />
            </TopNavBar>
        </>
    );
}
