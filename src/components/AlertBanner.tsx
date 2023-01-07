import { Box, Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type AlertBannerProps = PropsWithChildren;

const AlertBanner: React.FC<AlertBannerProps> = ({ children }) => {
    return (
        <Flex
            bgGradient="linear-gradient(270deg, #5557f744 8.06%, #d34dbcAA 50% , #5557f744 92.26%)"
            justifyContent="center"
            zIndex={100}
        >
            <Box
                maxW="container.xl"
                flexGrow={1}
                px={{ base: undefined, lg: 6 }}
                py={3}
                fontWeight="semibold"
                textAlign="center"
                fontSize="sm"
            >
                {children}
            </Box>
        </Flex>
    );
};

export default AlertBanner;
