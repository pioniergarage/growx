import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Menu,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useUpdateProfile } from 'hooks/profile';
import { Profile, UserRole } from 'model';
import { PropsWithChildren, useRef, useState } from 'react';

const RoleChangeDialog = ({
    profile,
    newRole,
    isOpen,
    onClose,
    onSubmit,
}: {
    profile?: Profile;
    newRole?: UserRole;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}) => {
    const cancelRef = useRef(null);
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Change role
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure {profile?.firstName} ({profile?.role})
                        should be {newRole}?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={onSubmit} ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

const ChangeRoleMenu = (
    props: {
        isOpen: boolean;
        onClose: () => void;
        profile: Profile;
    } & PropsWithChildren
) => {
    const { updateProfile } = useUpdateProfile();
    const [roleChange, setRoleChange] = useState<{
        profile: Profile;
        newRole: UserRole;
    } | null>();

    function updateRole() {
        if (!roleChange) {
            return;
        }
        updateProfile({
            userId: roleChange.profile.userId,
            role: roleChange.newRole,
        });
        props.onClose();
        setRoleChange(null);
    }
    return (
        <Menu isOpen={props.isOpen}>
            <RoleChangeDialog
                isOpen={!!roleChange}
                onClose={() => {
                    setRoleChange(null);
                    props.onClose();
                }}
                onSubmit={() => {
                    updateRole();
                    props.onClose();
                }}
                profile={roleChange?.profile}
                newRole={roleChange?.newRole}
            />
            {props.children}
            <MenuList>
                <MenuItem
                    onClick={() =>
                        setRoleChange({
                            profile: props.profile,
                            newRole: 'PARTICIPANT',
                        })
                    }
                >
                    Participant
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        setRoleChange({
                            profile: props.profile,
                            newRole: 'MENTOR',
                        })
                    }
                >
                    Mentor
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        setRoleChange({
                            profile: props.profile,
                            newRole: 'BUDDY',
                        })
                    }
                >
                    Buddy
                </MenuItem>
                <MenuItem
                    onClick={() =>
                        setRoleChange({
                            profile: props.profile,
                            newRole: 'ORGA',
                        })
                    }
                >
                    Orga
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ChangeRoleMenu;
