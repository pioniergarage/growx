import { Spinner, SpinnerProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

interface SpinnerWrapperProps extends PropsWithChildren, SpinnerProps {
    isLoading: boolean;
}

const SpinnerWrapper: React.FC<SpinnerWrapperProps> = ({
    isLoading,
    children,
    ...rest
}) => {
    if (isLoading) return <Spinner {...rest} />;

    return <>{children}</>;
};

export default SpinnerWrapper;
