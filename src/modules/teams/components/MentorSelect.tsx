import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Divider,
    Flex,
    HStack,
    IconButton,
    Input,
    List,
    ListItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SkeletonCircle,
    Text,
} from '@chakra-ui/react';

import UserAvatar from 'modules/avatar/components/UserAvatar';
import { Profile } from 'modules/profile/types';
import { memo, useMemo, useState } from 'react';
import { useMentors } from '../hooks';

const UnmemorizedMentorListItem = ({ mentor }: { mentor: Profile }) => {
    return (
        <>
            <UserAvatar size="sm" profile={mentor} bg="gray.500" />
            <Flex justify="space-around" flexDir="column">
                <Text as="div" fontWeight="medium">
                    {mentor.firstName + ' ' + mentor.lastName}
                </Text>
                <Text
                    as="div"
                    fontSize="0.8rem"
                    fontWeight="light"
                    lineHeight={1.15}
                    color="gray.400"
                >
                    {mentor.skills.join(', ')}
                </Text>
            </Flex>
        </>
    );
};
const MentorListItem = memo(UnmemorizedMentorListItem);

type MentorListProps = {
    onSelect: (mentor: Profile) => void;
    onHover: (mentor?: Profile) => void;
    input: string;
    mentors: Profile[];
};

const MentorList: React.FC<MentorListProps> = (props) => {
    const filteredMentors = useMemo(
        () =>
            props.mentors.filter(
                (m) =>
                    m.firstName.toUpperCase().includes(props.input) ||
                    m.lastName.toUpperCase().includes(props.input)
            ),
        [props.input, props.mentors]
    );
    return (
        <List as={Flex} flexDir="column" maxH="20rem" overflowY="scroll">
            {filteredMentors.map((mentor) => (
                <ListItem
                    key={mentor.userId}
                    cursor="pointer"
                    _hover={{ bgColor: 'gray.600' }}
                    p={1.5}
                    as={HStack}
                    onClick={() => props.onSelect(mentor)}
                    onMouseEnter={() => props.onHover(mentor)}
                    onMouseLeave={() => props.onHover()}
                >
                    <MentorListItem mentor={mentor} />
                </ListItem>
            ))}
        </List>
    );
};

type MentorSelectProps = {
    mentor?: Profile;
    onSelect: (mentor: Profile) => void;
    onHover: (mentor?: Profile) => void;
    onUnselect: () => void;
    isLoading?: boolean;
};
const MentorSelect = (props: MentorSelectProps) => {
    const mentors = useMentors();
    const [input, setInput] = useState('');
    if (props.isLoading) {
        return <SkeletonCircle w={10} h={10} />;
    }
    return (
        <Popover isLazy>
            <PopoverTrigger>
                {props.mentor ? (
                    <IconButton
                        isRound
                        aria-label="Adjust mentor"
                        icon={<UserAvatar size="sm" profile={props.mentor} />}
                    />
                ) : (
                    <Box
                        w={9}
                        h={9}
                        as="button"
                        borderRadius="50%"
                        borderWidth={1}
                        borderColor="whiteAlpha.400"
                        borderStyle="dashed"
                        _hover={{ bgColor: 'whiteAlpha.50' }}
                    />
                )}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Select Mentor</PopoverHeader>
                <PopoverBody>
                    {props.mentor && (
                        <>
                            <Button
                                leftIcon={<CloseIcon w={2} h={2} />}
                                size="sm"
                                onClick={props.onUnselect}
                                variant="link"
                            >
                                Clear Mentor:{' '}
                                {props.mentor.firstName +
                                    ' ' +
                                    props.mentor.lastName}
                            </Button>
                            <Divider my={2} />
                        </>
                    )}
                    <Box>
                        <Input
                            placeholder="Select mentor"
                            onChange={(e) =>
                                setInput(e.target.value.toUpperCase())
                            }
                            mb={2}
                        />
                        <MentorList
                            mentors={mentors}
                            input={input}
                            onHover={props.onHover}
                            onSelect={props.onSelect}
                        />
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default MentorSelect;
