import { Button, ButtonProps } from '@chakra-ui/react';
import { Team } from 'model';

interface RequestButtonProps extends ButtonProps {
    team: Team;
    currentRequestId?: number | null;
    currentTeamId?: number | null;
    onRequest: () => void;
    onWithdraw: () => void;
}

const RequestButton: React.FC<RequestButtonProps> = ({
    team,
    currentRequestId,
    currentTeamId,
    onRequest,
    onWithdraw,
    ...rest
}) => {
    if (currentTeamId) return <></>;

    if (currentRequestId) {
        if (currentTeamId === team.id) {
            return (
                <Button onClick={onWithdraw} {...rest}>
                    Withdraw Request
                </Button>
            );
        } else {
            return (
                <Button onClick={onRequest} {...rest} disabled>
                    Request to Join
                </Button>
            );
        }
    } else {
        return (
            <Button onClick={onRequest} {...rest}>
                Request to Join
            </Button>
        );
    }
};

export default RequestButton;
