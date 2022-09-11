import { Alert, AlertIcon } from '@chakra-ui/react';

const ErrorAlert = ({ message = '' }) => {
    if (!message) return <></>;
    return (
        <Alert status="error">
            <AlertIcon />
            {message}
        </Alert>
    );
};

export default ErrorAlert;
