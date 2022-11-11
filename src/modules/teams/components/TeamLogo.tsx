import {
    Center,
    Image as NuxtImage,
    ResponsiveValue,
    Skeleton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
                        src={logo}
                        alt={name}
                        w={size}
                        h={size}
                        objectFit="cover"
                        onLoad={() => setImageLoaded(true)}
                        onLoadStart={() => setImageLoaded(false)}
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
