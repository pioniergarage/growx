import { PropsWithChildren } from 'react';
import ErrorAlert from './ErrorAlert';

export default function ErrorAlertWrapper({
    error,
    children,
}: { error?: string } & PropsWithChildren) {
    if (error) return <ErrorAlert message={error} />;

    return <>{children}</>;
}
