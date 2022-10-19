import { Box, Grid } from '@chakra-ui/react';
import { getFullName, Profile } from '../types';

const ProfilePropertyRow = ({
    name,
    value,
}: {
    name: string;
    value?: string | number;
}) => (
    <>
        <Box fontWeight="semibold">{name}</Box>
        <Box>{value}</Box>
    </>
);

export default function UsersProfileView({ profile }: { profile: Profile }) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '10rem 1fr' }}
            gap={{ base: 0, md: 2 }}
            maxW="container.lg"
        >
            <ProfilePropertyRow name="Name" value={getFullName(profile)} />
        </Grid>
    );
}
