import {
    Center,
    Image as NuxtImage,
    ResponsiveValue,
    Skeleton,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { FaUsers } from 'react-icons/fa';

interface TeamLogoProps {
    logo?: string | null;
    name?: string;
    loading?: boolean;
    size?: ResponsiveValue<number | string>;
}

const TeamLogo: React.FC<TeamLogoProps> = ({
    logo = '',
    name = '',
    size = 24,
    loading = false,
}) => {
    const hash = useMemo(() => Date.now().toString() + loading, [loading]);
    const [imageLoaded, setImageLoaded] = useState(false);
    useEffect(() => {
        if (imageLoaded && loading) {
            setImageLoaded(false);
        }
    }, [loading, imageLoaded]);
    return (
        <>
            <Skeleton
                isLoaded={(imageLoaded || !logo) && !loading}
                w={size}
                h={size}
            >
                {logo ? (
                    <NuxtImage
                        src={logo + '?' + hash}
                        alt={name}
                        w={size}
                        h={size}
                        objectFit="cover"
                        onLoad={() => setImageLoaded(true)}
                    />
                ) : (
                    <Center w={size} h={size} bgColor="whiteAlpha.200">
                        <FaUsers size={25} />
                    </Center>
                )}
            </Skeleton>
        </>
    );
};

export default TeamLogo;
