import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

type LoginFormProps = {
    onSubmit: ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => void;
    loading: boolean;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (values) => props.onSubmit(values),
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.email) errors.email = 'Required';
            if (!values.password) errors.password = 'Required';
            return errors;
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <VStack alignItems="stretch">
                <FormControl
                    isInvalid={!!formik.errors.email}
                    isDisabled={props.loading}
                >
                    <FormLabel htmlFor="email">Email adress</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                </FormControl>
                <FormControl
                    isInvalid={!!formik.errors.password}
                    isDisabled={props.loading}
                >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        id="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                </FormControl>
                <Button type="submit" isLoading={props.loading}>
                    Log in
                </Button>
            </VStack>
        </form>
    );
};
export default LoginForm;
