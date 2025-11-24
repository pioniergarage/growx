import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { GrowEvent } from "modules/events/types";
import React from "react";

interface KickoffCTAProps {
    today: Date;
    kickoff: GrowEvent;
}

const KickoffCTA: React.FC<KickoffCTAProps> = ({ today, kickoff }) => {
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

    if (!(today < kickoffDate && kickoffHref && kickoffHref.length > 0)) {
        return null;
    }

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
                onClick={handleClick}
                shadow='0 0 20px 5px rgba(85,87,247,0.35)'
                animation={glowAnimation}
            >
                <Heading size={{ base: "m", md: "l" }}>{'Sign Up for the Kickoff!'}</Heading>
            </Button>

        </Box>
    );
};

export default KickoffCTA;