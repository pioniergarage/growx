import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { availableSkills } from 'model';
import { useState } from 'react';
import TagSelect from '../TagSelect';

type DetailInformationFormProps = {
    onContinue: (skills: string[], bio: string) => void;
    isLoading: boolean;
};

const DetailInformation = ({ onContinue, isLoading }: DetailInformationFormProps) => {
    const [skills, setSkills] = useState<string[]>(['Social Entrepreneurship']);
    const [bio, setBio] = useState('')
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onContinue(skills, bio);
            }}
        >
            <VStack alignItems="center" gap={2}>
                <Box textAlign="center">
                    <Heading size="md">Some more information about you</Heading>
                    <Text color="gray.400">
                        You can adjust these later
                    </Text>
                </Box>
                <FormControl>
                    <FormLabel>Your skills</FormLabel>
                    <TagSelect
                        values={availableSkills}
                        selected={skills}
                        onDeselect={(v) => {
                            const newSkills = [...skills];
                            newSkills.splice(skills.indexOf(v), 1);
                            setSkills(newSkills);
                        }}
                        onSelect={(v) => {
                            setSkills([...skills, v]);
                        }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Describe yourself</FormLabel>
                    <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="I work at Dagobert Duck's firm and I am looking forward to helping you"/>
                </FormControl>
                <Button
                    type="submit"
                    variant="solid"
                    width="100%"
                    isLoading={isLoading}
                >
                    Continue
                </Button>
            </VStack>
        </form>
    );
};

export default DetailInformation;
