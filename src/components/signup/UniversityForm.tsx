import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

export const kitName = 'Karlsruhe Institute of Technology';
const kitCountry = 'Germany';

type UniversityFormProps = {
    onNext: (info: {
        university: string;
        country: string;
        isSQ: boolean;
    }) => void;
};

const UniversityForm = ({ onNext }: UniversityFormProps) => {
    const [atKIT, setAtKIT] = useState(false);
    const [university, setUniversity] = useState('');
    const [country, setCountry] = useState('');
    const [isSQ, setSQ] = useState(false)

    return (
        <VStack alignItems="stretch" gap={2}>
            <Heading size="sm">Where do you study?</Heading>
            <VStack alignItems="stretch">
                <Checkbox
                    id="atKIT"
                    isChecked={atKIT}
                    onChange={(e) => {
                        setAtKIT(e.target.checked);
                        if (e.target.checked) {
                            setUniversity(kitName);
                            setCountry(kitCountry);
                        } 
                    }}
                >
                    {kitName}
                </Checkbox>
                <FormControl>
                    <FormLabel>University</FormLabel>
                    <Input
                        value={atKIT ? kitName : university}
                        onChange={e => setUniversity(e.target.value)}
                        disabled={atKIT}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input
                        value={atKIT ? kitCountry : country}
                        onChange={e => setCountry(e.target.value)}
                        disabled={atKIT}
                    />
                </FormControl>
                {atKIT ? (
                    <FormControl >
                        <FormLabel mt={4}>KIT students only</FormLabel>
                        <Checkbox
                            onChange={e => setSQ(e.target.checked)}
                            isChecked={isSQ}
                        >
                            Binding registration as key and interdisciplinary
                            qualifications. <br /> More info: &nbsp;
                            <Link
                                href="https://www.hoc.kit.edu/startupdiploma.php"
                                isExternal
                            >
                                HoC <ExternalLinkIcon mx="2px" />
                            </Link>
                        </Checkbox>
                    </FormControl>
                ) : undefined}
            </VStack>
            <Button onClick={() => onNext({ university, country, isSQ: atKIT && isSQ })}>
                Next
            </Button>
        </VStack>
    );
};
export default UniversityForm;
