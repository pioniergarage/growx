import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Input,
    Radio,
    RadioGroup,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { availableSkills, Profile } from 'model';

interface ProflieFormProps {
    onSave: (profile: Profile) => void;
    loading: boolean;
    profile: Profile;
    onCancel?: () => void;
}

const ProfileForm: React.FC<ProflieFormProps> = ({
    onSave,
    loading,
    profile,
    onCancel,
}) => {
    const formik = useFormik({
        initialValues: profile,
        onSubmit: (values) => onSave(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.firstName) errors.firstName = 'Required';
            if (!values.lastName) errors.lastName = 'Required';
            return errors;
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={4} alignItems="stretch">
                <SimpleGrid columns={2} gap={4}>
                    <GridItem colSpan={2}>
                        <FormControl isDisabled>
                            <FormLabel htmlFor="email">
                                Email address*
                            </FormLabel>
                            <Input
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
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
                            <RadioGroup
                                defaultValue={profile.gender || 'OTHER'}
                            >
                                <HStack spacing="24px">
                                    <Radio
                                        value="MALE"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'MALE'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Male
                                    </Radio>
                                    <Radio
                                        value="FEMALE"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'FEMALE'
                                        }
                                        onChange={formik.handleChange}
                                    >
                                        Female
                                    </Radio>
                                    <Radio
                                        value="OTHER"
                                        name="gender"
                                        isChecked={
                                            formik.values.gender === 'OTHER'
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
                            value={formik.values.phone || ''}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Course of studies</FormLabel>
                        <Input
                            name="studies"
                            id="studies"
                            onChange={formik.handleChange}
                            value={formik.values.studies || ''}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>University</FormLabel>
                        <Input
                            id="university"
                            name="university"
                            onChange={formik.handleChange}
                            value={formik.values.university || ''}
                        />
                    </FormControl>
                    <FormControl isDisabled={loading}>
                        <FormLabel>Homeland</FormLabel>
                        <Input
                            name="homeland"
                            id="homeland"
                            onChange={formik.handleChange}
                            value={formik.values.homeland || ''}
                        />
                    </FormControl>
                    {['MENTOR', 'EXPERT', 'ORGA'].includes(profile.role) ? (
                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel htmlFor="skills">Skills</FormLabel>
                                <Flex wrap="wrap" gap={2}>
                                    {availableSkills.map((skill, i) => (
                                        <Checkbox
                                            key={skill + i}
                                            isChecked={formik.values.skills.includes(
                                                skill
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    formik.setFieldValue(
                                                        'skills',
                                                        [
                                                            ...formik.values
                                                                .skills,
                                                            skill,
                                                        ]
                                                    );
                                                } else {
                                                    formik.setFieldValue(
                                                        'skills',
                                                        formik.values.skills.filter(
                                                            (s) => s != skill
                                                        )
                                                    );
                                                }
                                            }}
                                        >
                                            {skill}
                                        </Checkbox>
                                    ))}
                                </Flex>
                            </FormControl>
                        </GridItem>
                    ) : undefined}
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
};

export default ProfileForm;
