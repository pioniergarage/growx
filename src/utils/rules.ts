const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const rules = {
    email: (value: string) => emailRegex.test(value) || 'Invalid email',
    password: (value: string) => {
        if (value.length < 8) {
            return 'too weak';
        } else {
            return true;
        }
    },
};

export default rules;
