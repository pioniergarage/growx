import {
    Button,
    Divider,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import LogInForm from '../forms/logInForm';

const LogInWrapper = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const size = useBreakpointValue({ base: 'sm', lg: 'xl' });

    return (
        <>
            <Button onClick={onOpen}>Log In</Button>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size={size}
                closeOnOverlayClick={false}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Log in</ModalHeader>
                    <ModalBody>
                        <Stack
                            paddingTop={'20px'}
                            paddingBottom={'20px'}
                            direction="column"
                        >
                            <Heading>Log In</Heading>
                            {/* TODO limit size of Buttons */}
                            <Button
                                colorScheme="google"
                                leftIcon={<FaGoogle />}
                            >
                                Weiter mit Google
                            </Button>
                            <Button
                                colorScheme="twitter"
                                leftIcon={<FaTwitter />}
                            >
                                Weiter mit Twitter
                            </Button>
                            <Stack direction="row" alignContent="center">
                                <Divider />
                                <Text>Or</Text>
                                <Divider />
                            </Stack>
                            <LogInForm onSuccess={onClose} />
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default LogInWrapper;
