import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';

type StudentFormProps = {
    onNext: (student: boolean) => void;
};

const StudentForm = ({ onNext }: StudentFormProps) => {
    return (
        <VStack alignItems="center">
            <Heading size="sm">Are you a student?</Heading>
            <ButtonGroup >
                <Button onClick={() => onNext(true)} minW="8rem">Yes</Button>
                <Button onClick={() => onNext(false)}  minW="8rem">No</Button>
            </ButtonGroup>
        </VStack>
    );
};
export default StudentForm;
