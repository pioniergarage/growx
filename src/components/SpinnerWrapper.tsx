import { Spinner, SpinnerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function SpinnerWrapper({
    isLoading,
    children,
    ...rest
}: { isLoading: boolean } & PropsWithChildren & SpinnerProps) {
    if (isLoading) return <Spinner {...rest} />;

    return <>{children}</>;
}
