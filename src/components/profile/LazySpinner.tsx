import { Box, Text } from '@chakra-ui/react';
import { useProfile } from 'hooks/profile';
import { Profile } from 'types';

export default function LazySpinner({
    property,
    name,
}: {
    property: keyof Profile;
    name: string;
}) {
    const {profile} = useProfile()
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
}
