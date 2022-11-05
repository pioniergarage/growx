import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Link,
    Switch,
} from '@chakra-ui/react';
import { useUpdateProfile } from 'modules/profile/hooks';
import { useState } from 'react';

const SQSignup = ({
    userId,
    keyQualification,
}: {
    userId: string;
    keyQualification: boolean;
}) => {
    const { updateProfile } = useUpdateProfile();
    const [updated, setUpdated] = useState(false);
    async function setSQ(value: boolean) {
        await updateProfile({ keyQualification: value, userId });
        setUpdated(!updated);
    }
    return (
        <Box>
            <Heading mb={1} size="sm" color="gray.400" fontSize={12}>
                Key and interdisciplinary qualification
            </Heading>
            <Box>
                All KIT students have the opportunity to go through a special
                training format, the successful completion of which is rewarded
                with the &quot;Startup Diploma&quot; certificate. More info:
                &nbsp;
                <Link
                    href="https://www.hoc.kit.edu/startupdiploma.php"
                    isExternal
                >
                    HoC <ExternalLinkIcon mx="2px" />
                </Link>
                <FormControl as={HStack} mt={1}>
                    <Switch
                        onChange={(e) => setSQ(e.target.checked)}
                        isChecked={
                            keyQualification
                        }
                    />
                    <FormLabel>
                        Binding registration as key and interdisciplinary
                        qualifications
                    </FormLabel>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SQSignup;
