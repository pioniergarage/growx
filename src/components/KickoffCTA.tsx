import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { GrowEvent } from "modules/events/types";
import React from "react";

interface KickoffCTAProps {
    today: Date;
    kickoff: GrowEvent;
    midterm: GrowEvent;
}

const KickoffCTA: React.FC<KickoffCTAProps> = ({ today, kickoff, midterm }) => {
    const glow = keyframes`
  0% {
    box-shadow: 0 0 20px 5px rgba(85,87,247,0.3);
  }
  50% {
    box-shadow: 0 0 20px 5px rgba(85,87,247,0.5);
  }
  100% {
    box-shadow: 0 0 20px 5px rgba(85,87,247,0.3);
  }
`;

    const glowAnimation = `${glow} 6s ease-in-out infinite`;
    const kickoffDate = kickoff.date;
    const kickoffHref = kickoff.href;
    const midtermDate = midterm.date;
    const toast = useToast();
    let isInvite = false;

    if (!((today < midtermDate || today < kickoffDate) && kickoffHref && kickoffHref.length > 0)) {
        return null;
    } else if (today < midtermDate && kickoffDate < today) {
        isInvite = true;
    }

    const handleInvite = () => {
        if (!kickoffHref || kickoffHref.length == 0) {
            return;
        }

        navigator.clipboard.writeText(kickoffHref).then(function () {
            console.log('Async: Copying to clipboard was successful!');
        });

        toast({
            title: `Copied ${kickoffHref} to Clipboard`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleClick = () => {
        if (kickoffHref) window.location.href = kickoffHref;
    };

    return (
        <Box>
            <Button
                padding={6}
                paddingLeft={8}
                paddingRight={8}
                leftIcon={<ExternalLinkIcon />}
                onClick={isInvite ? handleInvite : handleClick}
                shadow='0 0 20px 5px rgba(85,87,247,0.35)'
                animation={glowAnimation}
            >
                <Heading size={{ base: "m", md: "l" }}>{isInvite ? 'Invite Your Teammates!' : 'Sign Up for the Kickoff!'}</Heading>
            </Button>

        </Box>
    );
};

export default KickoffCTA;