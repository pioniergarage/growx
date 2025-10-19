import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Heading } from "@chakra-ui/react";
import { GrowEvent } from "modules/events/types";
import React from "react";

interface KickoffCTAProps {
    today: Date;
    kickoff: GrowEvent;
}

const KickoffCTA: React.FC<KickoffCTAProps> = ({ today, kickoff }) => {
    const kickoffDate = kickoff.date;
    const kickoffHref = kickoff.href;
    if (!(today < kickoffDate && kickoffHref && kickoffHref.length > 0)) {
        return null;
    }

    const handleClick = () => {
        if (kickoffHref) window.location.href = kickoffHref;
    };

    return (
        <Box paddingTop={2} paddingBottom={2}>
            <Button
                padding={6}
                paddingLeft={8}
                paddingRight={8}
                leftIcon={<ExternalLinkIcon />}
                onClick={handleClick}
            >
                <Heading size={{ base: "m", md: "l" }}>Sign Up for the Kickoff!</Heading>
            </Button>
        </Box>
    );
};

export default KickoffCTA;