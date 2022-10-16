import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Stack,
} from '@chakra-ui/react';
import { useRef } from 'react';

type SignUpDialogProps = {
    onSubmit: (present: boolean) => void;
    isOpen: boolean;
    onCancel: () => void
};
const SignUpDialog = ({ onSubmit, isOpen, onCancel }: SignUpDialogProps) => {
    const cancelRef = useRef(null);
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                onClose={onCancel}
                leastDestructiveRef={cancelRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Sign up?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Will you participate online or you will be there in
                            person?
                            <Stack my={4}>
                                <Button onClick={() => onSubmit(false)}>
                                    Online
                                </Button>
                                <Button onClick={() => onSubmit(true)}>
                                    In Person
                                </Button>
                            </Stack>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default SignUpDialog;
