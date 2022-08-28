import { PropsWithChildren } from 'react';
import ErrorAlert from './ErrorAlert';

interface ErrorAlertWrapperProps extends PropsWithChildren {
    error?: string;
}

const ErrorAlertWrapper: React.FC<ErrorAlertWrapperProps> = ({
    error,
    children,
}) => {
    if (error) return <ErrorAlert message={error} />;

    return <>{children}</>;
};

export default ErrorAlertWrapper;
