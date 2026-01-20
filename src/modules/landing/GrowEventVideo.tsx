import { Center, useBreakpointValue } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';

type GrowEventProps = {
    event: GrowEvent;
};

const GrowEventVideo: React.FC<GrowEventProps> = ({ event }) => {
    const size = useBreakpointValue({
        base: {
            width: 840 / 2,
            height: 473 / 2,
        },
        sm: {
            width: (840 * 2) / 3,
            height: (473 * 2) / 3,
        },
        md: {
            width: 840,
            height: 473,
        },
    });
    if (!event.videoUrl) {
        return null;
    }

    return (
        <Center>
            <iframe
                width={size?.width}
                height={size?.height}
                src={event.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </Center>
    );
};

export default GrowEventVideo;
