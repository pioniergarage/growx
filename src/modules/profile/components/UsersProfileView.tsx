import { Box, Grid } from '@chakra-ui/react';
import { ContactInformation } from 'modules/contactInformation/types';
import { Profile } from '../types';

const ProfilePropertyRow = ({
    name,
    value,
}: {
    name: string;
    value?: string | number | null;
}) => (
    <>
        <Box fontWeight="semibold">{name}</Box>
        <Box>{value}</Box>
    </>
);

export default function UsersProfileView(props: {
    profile: Profile;
    contact: ContactInformation;
}) {
    return (
        <Grid
            templateColumns={{ base: '1fr', md: '10rem 1fr' }}
            gap={{ base: 0, md: 2 }}
            maxW="container.lg"
        >
            <ProfilePropertyRow
                name="Name"
                value={props.profile.firstName + ' ' + props.profile.lastName}
            />
            <ProfilePropertyRow name="Email" value={props.contact.email} />
            <ProfilePropertyRow name="Phone" value={props.contact.phone} />
            <ProfilePropertyRow name="Gender" value={props.profile.gender} />
            <ProfilePropertyRow
                name="Homeland"
                value={props.profile.homeland}
            />
            <ProfilePropertyRow
                name="University"
                value={props.profile.university}
            />
            <ProfilePropertyRow name="Studies" value={props.profile.studies} />
            {['MENTOR', 'EXPERT', 'ORGA'].includes(props.profile.role) && (
                <>
                    <ProfilePropertyRow
                        name="Skills"
                        value={props.profile.skills.join(', ')}
                    />
                    <ProfilePropertyRow name="Bio" value={props.profile.bio} />
                </>
            )}
            {props.profile.role === 'PARTICIPANT' &&
                props.profile.keyQualification && (
                    <ProfilePropertyRow
                        name="Matriculation"
                    />
                )}
        </Grid>
    );
}
