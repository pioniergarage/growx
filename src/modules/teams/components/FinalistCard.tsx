import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    VStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Box,
    Heading,
    Text,
    Image,
} from '@chakra-ui/react';
import MentorList from 'modules/landing/MentorList';
import Link from 'next/link';
import { Finalist } from '../types';

type FinalistProps = {
    finalist: Finalist;
};

const Finalist: React.FC<FinalistProps> = ({ finalist }) => {
    return (
        <Flex flexDir="column" gap={2}>
            <Image
                src={finalist.logo}
                objectFit="contain"
                w="30%"
                maxW="10rem"
                alignSelf="self-start"
            />
            <Box>
                {!finalist.hideName && (
                    <Heading as="h3" fontSize="md">
                        {finalist.name}
                    </Heading>
                )}
                <Text lineHeight="1.2" textColor="gray.300">
                    {finalist.description}
                </Text>
            </Box>
        </Flex>
    );
};

export default Finalist;
