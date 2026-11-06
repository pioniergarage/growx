import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useGrowEvents } from "modules/events/hooks";
import React from "react";

interface InviteCTAProps {
    invite_token: string | null
}

const InviteCTA: React.FC<InviteCTAProps> = ({ invite_token }) => {
    const toast = useToast();
    const { events } = useGrowEvents();
    const kickoff = events.find((e) => e.ref == 'kickoff');
    const midterm = events.find((e) => e.ref == 'midterm');
    const today = new Date();
    // undefined check should run before properties are accessed
    if (!(midterm && kickoff && midterm.date && kickoff.date)) {
        return null;
    }

    const kickoffDate = kickoff.date;
    const midtermDate = midterm.date;
    const clipboardLink = invite_token
        ? `https://grow.pioniergarage.de/connect/signup?t=${encodeURIComponent(invite_token)}`
        : 'https://grow.pioniergarage.de/connect/signup';


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