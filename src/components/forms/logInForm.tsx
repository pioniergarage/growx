import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import PageLink from '../nav/link';

type LoginFormProps = {
    onSubmit: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => void;
};

const LogInForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        props.onSubmit({ email, password });
    }

    return (
        <form onSubmit={handleSubmit}>
            <VStack alignItems="stretch" gap={2}>
                <FormControl>
                    <FormLabel htmlFor="email">Email adress</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <Button type="submit">Log in</Button>
                <PageLink color='primary' textAlign='center' href='/connect/signup'>Click here to sign up</PageLink>
            </VStack>
        </form>
    );
};
export default LogInForm;
