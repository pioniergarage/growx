import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ButtonProps,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useLeaveTeam } from 'hooks/team';
import React from 'react';

interface LeaveTeamButtonProps extends ButtonProps {
    userId: string;
}

const LeaveTeamButton: React.FC<LeaveTeamButtonProps> = ({
    userId,
    ...rest
}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef<FocusableElement & HTMLButtonElement>(null);

    const { leaveTeam } = useLeaveTeam();

    function onLeaveTeam() {
        leaveTeam(userId, {
            onError: () => {
                toast({
                    status: 'error',
                    title: 'Something went wrong.',
                });
            },
        });
    }

    return (
        <>
            <Button
                onClick={onOpen}
                colorScheme="red"
                variant="outline"
                size="sm"
                {...rest}
            >
                Leave Team
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Leave Team
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    onClose();
                                    onLeaveTeam();
                                }}
                                ml={3}
                            >
                                Leave
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default LeaveTeamButton;
