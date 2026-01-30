import { useProfile } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import {
    FaCalendarAlt,
    FaCogs,
    FaHome,
    FaUserFriends
} from 'react-icons/fa';
import { DesktopMenu } from '../../components/navigation/DesktopMenu';
import MobileMenu from '../../components/navigation/MobileMenu';
import {
    GrowLogo,
    MenuToggle,
    TopNavBar,
} from '../../components/navigation/Nav';
import ProfileMenuWrapper from '../../components/navigation/ProfileMenuWrapper';
import { useSideNav } from './hooks';

export type NavigationItem = {
    href: string;
    label: string;
    isHidden?: (profile?: Profile) => boolean;
    icon: JSX.Element;
};

const navigationItems: NavigationItem[] = [
    // {
    //     href: '/',
    //     label: 'Home',
    //     icon: <FaHome />,
    // },
    //TODO: Update this webpage!

    // {
    //     href: '/previous',
    //     label: 'Previous',
    //     icon: <FaCalendarAlt />,
    // },
    {
        href: '/events',
        label: 'Events',
        icon: <FaCalendarAlt />,
    },
    {
        href: '/connect',
        label: 'Dashboard',
        isHidden: (profile) => !profile,
        icon: < FaHome />,
    },
    {
        href: '/connect/teams',
        label: 'Teams',
        isHidden: (profile) => !profile,
        icon: <FaUserFriends />,
    },

    {
        href: '/connect/assigned_teams',
        label: 'Assigned',
        isHidden: (profile) => !profile || profile.role != 'MENTOR',
        icon: <FaUserFriends />,
    },
    {
        href: '/connect/admin',
        label: 'Admin',
        isHidden: (profile) => !profile || profile.role != 'ORGA',
        icon: <FaCogs />,
    }
];

export default function GrowNav() {
    const { profile } = useProfile();

    const {
        isOpen: isSideNavOpen,
        alpha: navAlpha,
        onClose: onSideNavClose,
        onToggle: onSideNavToggle,
    } = useSideNav();

    return (
        <TopNavBar alpha={navAlpha}>
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
    );
}
