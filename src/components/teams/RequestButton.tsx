import { Button, ButtonProps } from '@chakra-ui/react';
import { Team } from 'model';

export default function RequestButton({
    team,
    currentRequest,
    currentTeam,
    onRequest,
    onWithdraw,
    ...rest
}: ButtonProps & {
    team: Team;
    currentRequest?: Team;
    currentTeam?: Team;
    onRequest: () => void;
    onWithdraw: () => void;
}) {
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
}
