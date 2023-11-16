import { Center, useBreakpointValue } from '@chakra-ui/react';

const GrowVideo = () => {
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
    return (
        <Center>
            <iframe
                width={size?.width}
                height={size?.height}
                src="https://youtu.be/ScNQ2jE5UxA"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </Center>
    );
};

export default GrowVideo;
