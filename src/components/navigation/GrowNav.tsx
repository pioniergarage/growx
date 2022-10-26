import { useDisclosure } from '@chakra-ui/react';
import { useProfile } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import {
    FaCalendarAlt,
    FaHandsHelping,
    FaHome,
    FaMedal,
    FaNewspaper,
    FaUserFriends,
} from 'react-icons/fa';
import { DesktopMenu } from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { GrowLogo, MenuToggle, TopNavBar } from './Nav';
import ProfileMenuWrapper from './ProfileMenuWrapper';

export type NavigationItem = {
    href: string;
    label: string;
    isHidden?: (profile?: Profile) => boolean;
    icon: JSX.Element;
};

const navigationItems: NavigationItem[] = [
    {
        href: '/',
        label: 'Home',
        icon: <FaHome />,
    },
    {
        href: '/startup_diploma',
        label: 'Startup Diploma',
        icon: <FaMedal />,
    },
    {
        href: '/mentor',
        label: 'Mentors',
        icon: <FaHandsHelping />,
    },
    {
        href: '/connect',
        label: 'News',
        isHidden: (profile) => !profile,
        icon: <FaNewspaper />,
    },
    {
        href: '/connect/teams',
        label: 'Teams',
        isHidden: (profile) => !profile,
        icon: <FaUserFriends />,
    },

    {
        href: '/connect/events',
        label: 'Events',
        isHidden: (profile) => !profile,
        icon: <FaCalendarAlt />,
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
