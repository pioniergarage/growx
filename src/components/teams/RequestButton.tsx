import { Button } from '@chakra-ui/react';
import { Team } from 'model';

export default function RequestButton(props: {
    team: Team;
    currentRequest?: Team;
    currentTeam?: Team;
    onRequest: () => void;
    onWithdraw: () => void;
    isLoading: boolean;
}) {
    if (props.currentTeam) return <></>;

    if (props.currentRequest) {
        if (props.currentRequest.id === props.team.id) {
            return (
                <Button
                    onClick={props.onWithdraw}
                    isLoading={props.isLoading}
                    size="sm"
                >
                    Withdraw Request
                </Button>
            );
        } else {
            return (
                <Button onClick={props.onRequest} size="sm" disabled>
                    Request to Join
                </Button>
            );
        }
    } else {
        return (
            <Button
                onClick={props.onRequest}
                isLoading={props.isLoading}
                size="sm"
            >
                Request to Join
            </Button>
        );
    }
}
