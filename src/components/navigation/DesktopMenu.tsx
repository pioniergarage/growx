import { Show } from '@chakra-ui/react';
import { Profile } from 'modules/profile/types';
import { NavigationItem } from '../../modules/navigation/GrowNav';
import { DesktopMenuButton } from './Nav';
import NavAdminMenu from './NavAdminMenu';

export const DesktopMenu = (props: {
    profile?: Profile;
    items: NavigationItem[];
}) => {
    return (
        <Show above="lg">
            {props.items.map(
                (item) =>
                    !(item.isHidden && item.isHidden(props.profile)) && (
                        <DesktopMenuButton key={item.label} href={item.href}>
                            {item.label}
                        </DesktopMenuButton>
                    )
            )}
            {props.profile && props.profile.role === 'ORGA' && <NavAdminMenu />}
        </Show>
    );
};
