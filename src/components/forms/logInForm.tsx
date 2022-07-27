import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

type LoginFormProps = {
    onSuccess: () => void;
};

const LogInForm = (props: LoginFormProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        console.log('loggin in with', email, password);

        // const response = await fetch('/api/login', {});
        const response = { ok: true };

        if (response.ok) {
            props.onSuccess();
            router.push('/connect/');
        } else {
            console.log('login failed');
            // TODO: add error message
        }
    };

    // const handleEmailChange = (e: HTMLInputElement) => setEmail(e.target.value);
    return (
        <>
            <FormControl>
                <FormLabel>Email adress</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button onClick={handleLogin}>Log in</Button>
        </>
    );
};
export default LogInForm;
