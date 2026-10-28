import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { GrowEvent } from "modules/events/types";
import React from "react";

interface InviteCTAProps {
    today: Date;
    kickoff: GrowEvent;
    midterm: GrowEvent;
    invite_token: string | null
}

const InviteCTA: React.FC<InviteCTAProps> = ({ today, kickoff, midterm, invite_token }) => {
    const toast = useToast();
    // undefined check should run before properties are accessed
    if (!(midterm && kickoff && midterm.date && kickoff.date)) {
        return null;
    }

    const kickoffDate = kickoff.date;
    const midtermDate = midterm.date;
    const clipboardLink = `https://grow.pioniergarage.de/connect/signup?t=${invite_token}`; //how do I securely get the process.env.SIGNUP_SECRET_TOKEN here, without exposing it on the frontend (UNLESS the user is signed in)


    if (today > midtermDate && today > kickoffDate) {
        return null;
    }

    const handleInvite = () => {
        navigator.clipboard.writeText(clipboardLink).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        });

        toast({
            title: `Copied to Clipboard!`,
            description: (
                <Box wordBreak="break-all">
                    {clipboardLink}
                </Box>
            ),
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box>
            <Button
                padding={6}
                leftIcon={<LinkIcon />}
                onClick={handleInvite}
            >
                <Heading size={{ base: "m", md: "l" }}>{'Invite Your Teammates to GROW!'}</Heading>
            </Button>

        </Box>
    );
};

export default InviteCTA;