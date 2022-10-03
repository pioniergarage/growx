import { Box, Grid } from '@chakra-ui/react';
import { Profile } from 'model';

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
            <ProfilePropertyRow
                name="Name"
                value={profile.firstName + ' ' + profile.lastName}
            />
            <ProfilePropertyRow name="Email" value={profile.email} />
            <ProfilePropertyRow name="Phone" value={profile.phone} />
            <ProfilePropertyRow name="Gender" value={profile.gender} />
            <ProfilePropertyRow name="Homeland" value={profile.homeland} />
            <ProfilePropertyRow name="University" value={profile.university} />
            <ProfilePropertyRow name="Studies" value={profile.studies} />
            {['MENTOR', 'EXPERT', 'ORGA'].includes(profile.role) ? (
                <>
                    <ProfilePropertyRow
                        name="Skills"
                        value={profile.skills.join(', ')}
                    />
                    <ProfilePropertyRow name="Bio" value={profile.bio} />
                </>
            ) : undefined}
        </Grid>
    );
}
