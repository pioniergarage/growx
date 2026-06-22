import { Box, Button, Center, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

enum LoadMode {
    Off,
    On,
    Auto
}

const GrowVideo = () => {
    const [canLoadVideo, setCanLoadVideo] = useState(LoadMode.Off);
    const [isClient, setIsClient] = useState(false);

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

    useEffect(() => {
        setIsClient(true);
        try {
            const stored = localStorage.getItem('cookieConsent');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.marketing) {
                    setCanLoadVideo(LoadMode.On);
                }
            }
            // eslint-disable-next-line no-empty
        } catch (e) { }

        // Listen for the specific marketing consent event
        const handleConsent = () => setCanLoadVideo(LoadMode.On);
        window.addEventListener('marketingConsentGranted', handleConsent);
        return () => window.removeEventListener('marketingConsentGranted', handleConsent);
    }, []);

    const handlePlayClick = () => {
        setCanLoadVideo(LoadMode.Auto);
    };

    const handleReviewSettings = () => {
        // Clear the storage
        localStorage.removeItem('localConsent');

        // Dispatch a custom event to wake up the CookieBanner
        window.dispatchEvent(new Event('showCookieBanner'));
    };

    if (!isClient) return null;

    return (
        <Center>
            {canLoadVideo != LoadMode.Off ? (
                <iframe
                    width={size?.width}
                    height={size?.height}
                    src={`https://www.youtube-nocookie.com/embed/ScNQ2jE5UxA?${canLoadVideo == LoadMode.Auto ? 'autoplay=1' : ''}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                ></iframe>
            ) : (
                <Box
                    width={size?.width}
                    height={size?.height}
                    bgImage="url('https://i.ytimg.com/vi/ScNQ2jE5UxA/maxresdefault.jpg')"
                    bgSize="cover"
                    bgPosition="center"
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="md"
                    overflow="hidden"
                >
                    <Box position="absolute" inset="0" bg="blackAlpha.800" />

                    <VStack position="relative" zIndex={1} spacing={4} p={6} textAlign="center">
                        <Text color="white" fontWeight="semibold" fontSize="md">
                            External Media: YouTube
                        </Text>
                        <Text color="whiteAlpha.900" fontSize="sm" maxW="md">
                            This video is hosted by YouTube. Playing it will load external content and may set cookies according to the YouTube privacy policy.
                        </Text>
                        <VStack spacing={2}>
                            <Button colorScheme="gray" onClick={handlePlayClick}>
                                Play Video
                            </Button>
                            <Button
                                variant="link"
                                color="whiteAlpha.700"
                                size="sm"
                                onClick={handleReviewSettings}
                            >
                                Review Cookie Settings
                            </Button>
                        </VStack>
                    </VStack>
                </Box>
            )}
        </Center>
    );
};

export default GrowVideo;