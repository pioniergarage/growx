import { Button, ButtonProps } from '@chakra-ui/react';
import { Team } from 'model';

interface RequestButtonProps extends ButtonProps {
    team: Team;
    currentRequest?: Team;
    currentTeam?: Team;
    onRequest: () => void;
    onWithdraw: () => void;
}

const RequestButton: React.FC<RequestButtonProps> = ({
    team,
    currentRequest,
    currentTeam,
    onRequest,
    onWithdraw,
    ...rest
}) => {
    if (currentTeam) return <></>;

    if (currentRequest) {
        if (currentRequest.id === team.id) {
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
