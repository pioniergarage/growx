import { Center } from '@chakra-ui/react';

const GrowVideo = () => {
    return (
        <Center>
            <iframe
                width="840"
                height="473"
                src="https://www.youtube.com/embed/rZ6Xj9aCsZk"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </Center>
    );
};

export default GrowVideo;
