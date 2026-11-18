import { externalMediaConsent } from '@/components/CookieBanner';
import { AspectRatio, Button, Center, Link, Stack, Text } from '@chakra-ui/react';
import { GrowEvent } from 'modules/events/types';
import { useContext } from 'react';

type GrowEventProps = {
    event: GrowEvent;
};

function getVideoLinks(url: string) {
    try {
        const video = new URL(url);
        if (video.protocol !== 'https:' || video.username || video.password) return null;

        const youtube = /^(www\.|m\.)?youtube(?:-nocookie)?\.com$/.test(video.host);
        const id = video.host === 'youtu.be'
            ? video.pathname.slice(1)
            : youtube && (video.searchParams.get('v') ?? video.pathname.match(/^\/embed\/([^/]+)$/)?.[1]);

        if (typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id)) {
            return {
                watch: `https://www.youtube.com/watch?v=${id}`,
                embed: `https://www.youtube-nocookie.com/embed/${id}`,
            };
        }

        return { watch: video.href, embed: null };
    } catch {
        return null;
    }
}

export function ExternalVideo({ url }: { url: string }) {
    const allowed = useContext(externalMediaConsent);
    const video = getVideoLinks(url);
    if (!video) return null;

    return (
        <Center>
            {allowed && video.embed ? (
                <AspectRatio ratio={16 / 9} w="full" maxW="840px">
                    <iframe
                        src={video.embed}
                        title="YouTube video player"
                        referrerPolicy="no-referrer"
                        allow="encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    />
                </AspectRatio>
            ) : (
                <Stack align="center" textAlign="center" spacing={3} py={6}>
                    {video.embed && (
                        <>
                            <Text>Allow external media to play this YouTube video here.</Text>
                            <Button
                                size="sm"
                                onClick={() => window.dispatchEvent(new Event('showCookieBanner'))}
                            >
                                Cookie settings
                            </Button>
                        </>
                    )}
                    <Link href={video.watch} isExternal textDecoration="underline">
                        {video.embed ? 'Watch on YouTube' : 'Open external video'}
                    </Link>
                </Stack>
            )}
        </Center>
    );
}

export default function GrowEventVideo({ event }: GrowEventProps) {
    return event.videoUrl ? <ExternalVideo url={event.videoUrl} /> : null;
}
