import { Box, Text } from '@chakra-ui/react';
import { useProfile } from 'hooks/profile';
import { Profile } from 'model';
import React from 'react';

interface LazySpinnerProps {
    property: keyof Profile;
    name: string;
}

const LazySpinner: React.FC<LazySpinnerProps> = ({ property, name }) => {
    const { profile } = useProfile();
    return (
        <>
            <Box>
                <Text>{name}</Text>
            </Box>
            <Box mb={{ base: 4, md: 0 }}>
                {profile ? (
                    <Text fontWeight="semibold">
                        {profile[property] || '-'}
                    </Text>
                ) : undefined}
            </Box>
        </>
    );
};

export default LazySpinner;
