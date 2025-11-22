import { LinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { GrowEvent } from "modules/events/types";
import React from "react";

interface InviteCTAProps {
    today: Date;
    kickoff: GrowEvent;
    midterm: GrowEvent;
}

const InviteCTA: React.FC<InviteCTAProps> = ({ today, kickoff, midterm }) => {
    // undefined check should run before properties are accessed
    if (!(midterm && kickoff && midterm.date && kickoff.date)) {
        return null;
    }

    const kickoffDate = kickoff.date;
    const midtermDate = midterm.date;
    const clipboardLink = 'https://grow.pioniergarage.de/connect/signup/';
    const toast = useToast();

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
                <Heading size={{ base: "m", md: "l" }}>{'Invite Your Teammates!'}</Heading>
            </Button>

        </Box>
    );
};

export default InviteCTA;