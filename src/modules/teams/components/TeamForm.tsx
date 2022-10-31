import TagSelect from '@/components/TagSelect';
import {
    Button,
    FormControl,
    FormLabel,
    GridItem,
    HStack,
    Input,
    SimpleGrid,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { availableSkills } from 'modules/profile/types';

import { useState } from 'react';
import { Team } from '../types';

interface TeamFormProps {
    onSave: (profile: Team) => void;
    team: Team;
    onCancel?: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onSave, team, onCancel }) => {
    const { requestSupport: initialRequestSupport, ...initialTeam } = team;
    const [requestSupport, setRequestSupport] = useState(initialRequestSupport);
    const formik = useFormik({
        initialValues: initialTeam,
        onSubmit: (values) => onSave({ ...values, requestSupport }),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.name) errors['name'] = 'Required';
            return errors;
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack gap={4} alignItems="stretch">
                <SimpleGrid columns={2} gap={4}>
                    <FormControl>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </FormControl>
                    <GridItem>
                        <FormControl>
                            <FormLabel htmlFor="mentoring">
                                Require Mentoring
                            </FormLabel>
                            <TagSelect
                                selected={requestSupport}
                                values={availableSkills}
                                onSelect={(value) =>
                                    setRequestSupport([
                                        ...requestSupport,
                                        value,
                                    ])
                                }
                                onDeselect={(value) => {
                                    const newSupportRequests = [
                                        ...requestSupport,
                                    ];
                                    newSupportRequests.splice(
                                        newSupportRequests.indexOf(value),
                                        1
                                    );
                                    setRequestSupport(newSupportRequests);
                                }}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl>
                            <FormLabel htmlFor="description">
                                Description
                            </FormLabel>
                            <Textarea
                                name="description"
                                id="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                placeholder="Describe what the startup is about."
                            />
                        </FormControl>
                    </GridItem>
                </SimpleGrid>

                <HStack>
                    <Button type="submit" width={28}>
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

export default TeamForm;
