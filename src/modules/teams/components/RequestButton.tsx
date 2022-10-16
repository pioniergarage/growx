import { Button, ButtonProps } from '@chakra-ui/react';
import { Team } from '../types';

interface RequestButtonProps extends ButtonProps {
    team: Team;
    currentRequestId?: number | null;
    onRequest: () => void;
    onWithdraw: () => void;
}

const RequestButton: React.FC<RequestButtonProps> = ({
    team,
    currentRequestId,
    onRequest,
    onWithdraw,
    ...rest
}) => {
    if (currentRequestId && currentRequestId === team.id) {
        return (
            <Button onClick={onWithdraw} {...rest}>
                Withdraw Request
            </Button>
        );
    } else {
        return (
            <Button onClick={onRequest} {...rest} disabled={!!currentRequestId}>
                Request to Join
            </Button>
        );
    }
};

export default RequestButton;
