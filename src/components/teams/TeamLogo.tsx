import { Center, Image } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';

export default function TeamLogo({ logo = '', name = '', size = 24 }) {
    if (!logo)
        return (
            <Center w={size} h={size} bgColor="whiteAlpha.200">
                <FaUsers size={50} />
            </Center>
        );

    return <Image src={logo} alt={name} w={size} h={size} objectFit="cover" />;
}
