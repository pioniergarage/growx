import {
    VStack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Button,
    Tag,
    TagCloseButton,
    TagLabel,
    Flex,
    GridItem,
    Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { Team } from 'model';

export default function TeamForm({
    onSave,
    team,
    onCancel,
}: {
    onSave: (profile: Team) => void;
    team: Team;
    onCancel?: () => void;
}) {
    const formik = useFormik({
        initialValues: team,
        onSubmit: (values) => onSave(values),
        validate: () => {
            const errors: Record<string, string> = {};
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
                    <FormControl isDisabled={formik.values.tags.length >= 3}>
                        <FormLabel htmlFor="name">Tags</FormLabel>
                        <Input
                            mb={2}
                            placeholder="Add Tag"
                            onKeyDown={(e) => {
                                if (e.key == 'Enter') {
                                    formik.setFieldValue(
                                        'tags',
                                        formik.values.tags.concat(
                                            e.target.value
                                        )
                                    );
                                    e.target.value = '';
                                    e.preventDefault();
                                }
                            }}
                        />
                        <Flex gap={2}>
                            {formik.values.tags.map((tag, i) => (
                                <Tag key={i} borderRadius="full">
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton
                                        onClick={() => {
                                            const tags = formik.values.tags;
                                            tags.splice(i, 1);
                                            formik.setFieldValue('tags', tags);
                                        }}
                                    />
                                </Tag>
                            ))}
                        </Flex>
                    </FormControl>
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
}
