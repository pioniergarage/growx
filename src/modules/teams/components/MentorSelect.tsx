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
import { useProfiles } from 'modules/profile/hooks';
import { Profile } from 'modules/profile/types';
import { useMemo, useState } from 'react';

type MentorSelectProps = {
    mentor?: Profile;
    onSelect?: (mentor: Profile) => void;
    onHover?: (mentor?: Profile) => void;
    onUnselect?: () => void;
    isLoading?: boolean;
};
const MentorSelect = (props: MentorSelectProps) => {
    const { profiles } = useProfiles();
    const mentors = useMemo(
        () => (profiles ?? []).filter((p) => p.role === 'MENTOR'),
        [profiles]
    );
    const [input, setInput] = useState('');
    const filteredMentors = useMemo(
        () =>
            mentors.filter(
                (m) =>
                    m.firstName.toUpperCase().includes(input) ||
                    m.lastName.toUpperCase().includes(input)
            ),
        [input, mentors]
    );
    if (props.isLoading) {
        return <SkeletonCircle w={10} h={10} />;
    }
    return (
        <Popover>
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
                        <List
                            as={Flex}
                            flexDir="column"
                            maxH="20rem"
                            overflowY="scroll"
                        >
                            {filteredMentors.map((mentor) => (
                                <ListItem
                                    key={mentor.userId}
                                    cursor="pointer"
                                    _hover={{ bgColor: 'gray.600' }}
                                    p={1.5}
                                    as={HStack}
                                    onClick={() => {
                                        if (props.onSelect) {
                                            props.onSelect(mentor);
                                        }
                                    }}
                                    onMouseEnter={() => {
                                        if (props.onHover) {
                                            props.onHover(mentor);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (props.onHover) {
                                            props.onHover();
                                        }
                                    }}
                                >
                                    <UserAvatar
                                        size="sm"
                                        profile={mentor}
                                        bg="gray.500"
                                    />
                                    <Flex
                                        justify="space-around"
                                        flexDir="column"
                                    >
                                        <Text as="div" fontWeight="medium">
                                            {mentor.firstName +
                                                ' ' +
                                                mentor.lastName}
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
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default MentorSelect;
