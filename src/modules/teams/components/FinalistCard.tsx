import {
    Flex,
    Box,
    Heading,
    Text,
    Image,
} from '@chakra-ui/react';
import { Finalist } from '../types';

type FinalistProps = {
    finalist: Finalist;
};

const Finalist: React.FC<FinalistProps> = ({ finalist }) => {
    return (
        <Flex flexDir="column" gap={2} alignItems="center" bgColor="blackAlpha.400" p={4} rounded="md">
            <Image
                src={finalist.logo}
                alt={finalist.name}
                objectFit="contain"
                h="8rem"
                maxW="10rem"
            />
            <Box>
                {!finalist.hideName && (
                    <Heading as="h3" fontSize="md" textAlign="center" mt={4}>
                        {finalist.name}
                    </Heading>
                )}
                <Text lineHeight="1.2" textColor="gray.300" textAlign="center">
                    {finalist.description}
                </Text>
            </Box>
        </Flex>
    );
};

export default Finalist;
