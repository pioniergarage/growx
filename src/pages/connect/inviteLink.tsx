import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Text,
    VStack,
} from '@chakra-ui/react';
import LoginLayout from 'layouts/LoginLayout';
import { useMemo, useState } from 'react';
import { NextPageWithLayout } from 'utils/types';

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    });
}

const InviteLinkCreator: NextPageWithLayout = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [forRole, setForRole] = useState('mentor');

    const link = useMemo(() => {
        const url = new URL('https://grow.pioniergarage.de/connect/' + forRole);

        url.searchParams.append('firstName', firstName);
        url.searchParams.append('lastName', lastName);
        url.searchParams.append('email', email);

        return url.href;
    }, [email, firstName, lastName, forRole]);

    return (
        <VStack gap={2} alignItems="center">
            <Box textAlign="center">
                <Heading size="md">Create Invite Link</Heading>
                <Text color="gray.400" mb={4}>
                    for {forRole}s
                </Text>
            </Box>
            <RadioGroup as={HStack}>
                <Radio
                    isChecked={forRole === 'mentor'}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setForRole('mentor');
                        }
                    }}
                >
                    Mentor
                </Radio>
                <Radio
                    isChecked={forRole === 'buddy'}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setForRole('buddy');
                        }
                    }}
                >
                    Buddy
                </Radio>
            </RadioGroup>
            <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="firstName">First name</FormLabel>
                <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    name="firstName"
                    id="firstName"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="lastName">Last name</FormLabel>
                <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    name="lastName"
                    id="lastName"
                />
            </FormControl>
            <Divider />
            <HStack
                borderRadius={4}
                border="1px"
                borderColor="whiteAlpha.200"
                p={2}
            >
                <Box color="whiteAlpha.600" as="span">
                    {link}
                </Box>
                <Button onClick={() => copyToClipboard(link)}>Copy</Button>
            </HStack>
        </VStack>
    );
};

InviteLinkCreator.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;
export default InviteLinkCreator;
