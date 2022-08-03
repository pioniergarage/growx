import rules from '@/components/forms/rules';
import ConnectLayout from '@/components/layouts/ConnectLayout';
import {
    Box,
    Heading,
    SimpleGrid,
    VStack,
    Text,
    Grid,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Input,
    Radio,
    RadioGroup,
    useToast,
    Skeleton,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import useProfile from 'hooks/useProfile';
import { createContext, useContext, useMemo, useState } from 'react';
import { Consumer, NextPageWithLayout, Profile } from 'types';

const ProfileContext = createContext<Profile | null>(null);

function LazySpinner({
    property,
    name,
}: {
    property: keyof Profile;
    name: string;
}) {
    const profile = useContext(ProfileContext);
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

function ProfileView({ profile }: { profile: Profile | null }) {
    return (
        <ProfileContext.Provider value={profile}>
            <Grid
                templateColumns={{ base: '1fr', md: '10rem 1fr' }}
                gap={{ base: 0, md: 2 }}
                maxW="container.lg"
                bg="whiteAlpha.100"
                p={4}
                borderRadius={3}
            >
                <LazySpinner name="First name" property="firstName" />
                <LazySpinner name="Last name" property="lastName" />
                <LazySpinner name="Gender" property="gender" />
                <LazySpinner name="Email address" property="email" />
                <LazySpinner name="Phone number" property="phone" />
                <LazySpinner name="Studies" property="studies" />
                <LazySpinner name="Homeland" property="university" />
            </Grid>
        </ProfileContext.Provider>
    );
}

function ProfileEditing({
    onSave,
    loading,
    profile,
    onCancel,
}: {
    onSave: Consumer<Profile>;
    loading: boolean;
    profile: Profile;
    onCancel?: () => void;
}) {
    const formik = useFormik({
        initialValues: profile,
        onSubmit: (values) => onSave(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.firstName) errors.firstName = 'Required';
            if (!values.lastName) errors.lastName = 'Required';
            if (!values.email) errors.email = 'Required';
            const emailError = rules.email(values.email);
            if (emailError !== true) errors.email = emailError;
            return errors;
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={4} alignItems="stretch">
                <SimpleGrid columns={2} gap={4}>
                    <GridItem colSpan={2}>
                        <FormControl
                            isDisabled={loading}
                            isInvalid={!!formik.errors.email}
                        >
                            <FormLabel htmlFor="email">
                                Email address*
                            </FormLabel>
                            <Input
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <FormErrorMessage>
                                {formik.errors.email}
                            </FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <FormControl
                        isDisabled={loading}
                        isInvalid={!!formik.errors.firstName}
                    >
                        <FormLabel htmlFor="firstName">First name*</FormLabel>
                        <Input
                            name="firstName"
                            id="firstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        <FormErrorMessage>
                            {formik.errors.firstName}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        isDisabled={loading}
                        isInvalid={!!formik.errors.lastName}
                    >
                        <FormLabel htmlFor="lastName">Last name*</FormLabel>
                        <Input
                            name="lastName"
                            id="lastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        <FormErrorMessage>
                            {formik.errors.lastName}
                        </FormErrorMessage>
                    </FormControl>
                    <GridItem colSpan={2}>
                        <FormControl isDisabled={loading} as="fieldset">
                            <FormLabel as="legend">Gender</FormLabel>
                            <RadioGroup defaultValue={profile.gender}>
                                <HStack spacing="24px">
                                    <Radio
                                        value="male"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'male'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Male
                                    </Radio>
                                    <Radio
                                        value="female"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'female'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Female
                                    </Radio>
                                    <Radio
                                        value="other"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'other'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Other
                                    </Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                    </GridItem>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Phone number</FormLabel>
                        <Input
                            name="phone"
                            id="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Course of studies</FormLabel>
                        <Input
                            name="studies"
                            id="studies"
                            onChange={formik.handleChange}
                            value={formik.values.studies}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>University</FormLabel>
                        <Input
                            id="university"
                            name="university"
                            onChange={formik.handleChange}
                            value={formik.values.university}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Homeland</FormLabel>
                        <Input
                            name="homeland"
                            id="homeland"
                            onChange={formik.handleChange}
                            value={formik.values.homeland}
                        />
                    </FormControl>
                </SimpleGrid>

                <HStack>
                    <Button isLoading={loading} type="submit" width={28}>
                        Save
                    </Button>
                    <Button onClick={onCancel} width={28}>
                        Cancel
                    </Button>
                </HStack>
            </VStack>
        </form>
    );
}

function SkeletonLoader() {
    const rows = 6;
    const widths = useMemo(() => {
        const w = []
        for (let i = 0; i < rows; i++) {
            w.push(Math.random() * 5 + 4)
            w.push(Math.random() * 30 + 5)
        }
        return w
    }, [])
    return (
        <Grid templateColumns="10rem 1fr" gap={3} w="100%" maxW="50rem">
            {Array.from(Array(rows).keys()).map((i) => (
                <>
                    <Skeleton key={i} h={6} maxW={widths[2*i] + 'rem'} />
                    <Skeleton key={i} h={6} maxW={widths[2*i + 1] + 'rem'} />
                </>
            ))}
        </Grid>
    );
}

const ProfilePage: NextPageWithLayout = () => {
    const [isEditing, setEditing] = useState(false);
    const { profile, loading, update } = useProfile();
    const toast = useToast();

    async function handleSave(profile: Profile) {
        const { error } = await update(profile);
        if (error) {
            toast({
                title: 'Something went wrong. Could not update profile.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Profile updated.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setEditing(false);
        }
    }

    return (
        <VStack alignItems="stretch" gap={4}>
            <Box>
                <Heading lineHeight={1}>Profile</Heading>
                <Text color="whiteAlpha.700" lineHeight={1}>
                    Your personal information
                </Text>
            </Box>
            {!isEditing || !profile ? (
                profile ? (
                    <>
                        <ProfileView profile={profile} />
                        <Button onClick={() => setEditing(true)} width={20}>
                            Edit
                        </Button>
                    </>
                ) : (
                    <SkeletonLoader />
                )
            ) : (
                <ProfileEditing
                    profile={profile}
                    onSave={handleSave}
                    loading={loading}
                    onCancel={() => setEditing(false)}
                />
            )}
        </VStack>
    );
};

ProfilePage.getLayout = (page) => <ConnectLayout>{page}</ConnectLayout>;

export default ProfilePage;
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});
