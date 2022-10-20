import TagSelect from '@/components/TagSelect';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    GridItem,
    HStack,
    Input,
    Radio,
    RadioGroup,
    SimpleGrid,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { ContactInformation } from 'modules/contactInformation/types';

import { useState } from 'react';
import { availableSkills, Profile } from '../types';
interface ProflieFormProps {
    onSave: (profile: Profile, contactInformation: ContactInformation) => void;
    loading: boolean;
    profile: Profile;
    contactInformation: ContactInformation;
    onCancel?: () => void;
}

const ProfileForm: React.FC<ProflieFormProps> = ({
    onSave,
    loading,
    profile,
    contactInformation,
    onCancel,
}) => {
    const { skills: initialSkills, ...restProfile } = profile;
    const [skills, setSkills] = useState(initialSkills);
    const formik = useFormik({
        initialValues: { ...restProfile, ...contactInformation },
        onSubmit: ({ email, phone, ...rest }) =>
            onSave({ ...rest, skills }, { email, phone }),
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
                        <FormControl isDisabled isRequired>
                            <FormLabel htmlFor="email">Email address</FormLabel>
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
                        isRequired
                    >
                        <FormLabel htmlFor="firstName">First name</FormLabel>
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
                        isRequired
                    >
                        <FormLabel htmlFor="lastName">Last name</FormLabel>
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
                        <>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel htmlFor="skills">
                                        Skills
                                    </FormLabel>
                                    <TagSelect
                                        values={availableSkills}
                                        selected={skills}
                                        onDeselect={(v) => {
                                            const newSkills = [...skills];
                                            newSkills.splice(
                                                skills.indexOf(v),
                                                1
                                            );
                                            setSkills(newSkills);
                                        }}
                                        onSelect={(v) => {
                                            setSkills([...skills, v]);
                                        }}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Describe yourself</FormLabel>
                                    <BioTextArea
                                        initialValue={formik.values.bio}
                                        onBlur={(v) =>
                                            formik.setFieldValue('bio', v)
                                        }
                                    />
                                </FormControl>
                            </GridItem>
                        </>
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

const BioTextArea = ({
    initialValue = '',
    onBlur,
}: {
    initialValue: string;
    onBlur: (value: string) => void;
}) => {
    const [value, setValue] = useState(initialValue);
    return (
        <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
            placeholder="Tell others something about you, e.g. your current job"
        />
    );
};

export default ProfileForm;
