import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Heading } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { GrowEvent } from 'modules/events/types';
import React from 'react';

interface EventCTAProps {
    today: Date;
    event?: GrowEvent;
    event_date?: Date;
    event_href?: string;
    text: string;
    start?: Date;
}

const EventCTA: React.FC<EventCTAProps> = ({
    today,
    event,
    text,
    start,
    event_date,
    event_href,
}) => {
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
    const eventDate = event ? event.date : event_date;
    const eventHref = event ? event.href : event_href;

    if (
        (eventDate &&
            (today >= eventDate || !eventHref || eventHref.length < 1)) ||
        (start && today < start)
    ) {
        return null;
    }

    if (!eventHref) {
        return null;
    }

    const handleClick = () => {
        if (eventHref) window.open(eventHref);
    };

    return (
        <Box>
            <Button
                padding={6}
                paddingLeft={8}
                paddingRight={8}
                leftIcon={<ExternalLinkIcon />}
                onClick={handleClick}
                shadow="0 0 20px 5px rgba(85,87,247,0.35)"
                bgColor={'rgba(85,100,250,0.35)'}
                animation={glowAnimation}
            >
                <Heading size={{ base: 'm', md: 'l' }}>{text}</Heading>
            </Button>
        </Box>
    );
};

export default EventCTA;
