import UserAvatar from '@/components/avatar/UserAvatar';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import ProfileCard from '@/components/profile/ProfileCard';
import {
    Box,
    CloseButton,
    Flex,
    Heading,
    HStack,
    Input,
    List,
    ListItem,
    Spinner,
    Tag,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfiles } from 'hooks/profile';
import { useAllTeams } from 'hooks/team';
import { Profile } from 'model';
import { useMemo, useState } from 'react';

type MentorSelectProps = {
    mentors: Profile[];
    onSelect: (mentor: Profile) => void;
    onHover: (mentor?: Profile) => void;
};
const MentorSelect = (props: MentorSelectProps) => {
    const [isHovering, setHovering] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [input, setInput] = useState('');
    const filteredMentors = useMemo(
        () =>
            props.mentors.filter(
                (m) =>
                    m.firstName.toUpperCase().includes(input) ||
                    m.lastName.toUpperCase().includes(input)
            ),
        [input, props.mentors]
    );
    return (
        <Box position="relative" width="40rem">
            <Input
                placeholder="Select mentor"
                onFocus={onOpen}
                onBlur={() => {
                    if (!isHovering) {
                        onClose();
                    }
                }}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
            />
            {isOpen ? (
                <List
                    position="absolute"
                    bottom={0}
                    top="2.8rem"
                    bg="gray.700"
                    zIndex={10}
                    as={Flex}
                    flexDir="column"
                    height="min-content"
                    maxH="10rem"
                    borderRadius={3}
                    overflowY="scroll"
                    w="100%"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                >
                    {filteredMentors.map((mentor) => (
                        <ListItem
                            key={mentor.userId}
                            cursor="pointer"
                            _hover={{ bgColor: 'gray.600' }}
                            p={1.5}
                            as={HStack}
                            w="100%"
                            onClick={() => {
                                props.onSelect(mentor);
                                onClose();
                            }}
                            onMouseEnter={() => props.onHover(mentor)}
                            onMouseLeave={() => props.onHover()}
                        >
                            <UserAvatar
                                size="sm"
                                userId={mentor.userId}
                                firstName={mentor.firstName}
                                lastName={mentor.lastName}
                                avatar={mentor.avatar}
                                bg="gray.500"
                            />
                            <Flex justify="space-around" flexDir="column">
                                <Text as="div" fontWeight="medium">
                                    {mentor.firstName + ' ' + mentor.lastName}
                                </Text>
                                <Text
                                    as="div"
                                    w="35rem"
                                    fontSize="0.8rem"
                                    fontWeight="light"
                                    lineHeight={1.1}
                                >
                                    {mentor.skills.join(', ')}
                                </Text>
                            </Flex>
                        </ListItem>
                    ))}
                </List>
            ) : undefined}
        </Box>
    );
};

const TeamAdmin = () => {
    const { teams } = useAllTeams([]);
    const { profiles } = useProfiles();
    const mentors = useMemo(
        () => (profiles || []).filter((p) => p.role === 'MENTOR'),
        [profiles]
    );
    const activeTeams = useMemo(
        () => (teams || []).filter((t) => !t.archived),
        [teams]
    );
    const [mentorAssignments, setMentorAssignments] = useState<
        Record<number, Profile>
    >({});
    return (
        <VStack alignItems="start">
            <AdminBreadcrumbs route={[['Teams', '/connect/admin/teams']]} />
            {teams === undefined ? (
                <Spinner />
            ) : activeTeams.length === 0 ? (
                <Box>No active teams</Box>
            ) : (
                <VStack alignItems="start" gap={6}>
                    {activeTeams.map((team) => (
                        <Flex key={team.id} alignItems="start" flexDir="column">
                            <Heading size="sm" as="h2">
                                {team.name}
                            </Heading>
                            <Flex gap={1} mb={1}>
                                {team.requestSupport.map((subject) => (
                                    <Tag
                                        key={subject}
                                        size="sm"
                                        colorScheme={
                                            mentorAssignments[
                                                team.id
                                            ]?.skills.includes(subject)
                                                ? 'green'
                                                : undefined
                                        }
                                    >
                                        {subject}
                                    </Tag>
                                ))}
                            </Flex>

                            <Box>
                                {mentorAssignments[team.id] ? (
                                    <Flex
                                        bgColor="whiteAlpha.200"
                                        p={3}
                                        borderRadius={4}
                                    >
                                        <ProfileCard
                                            size="sm"
                                            firstName={
                                                mentorAssignments[team.id]
                                                    .firstName
                                            }
                                            lastName={
                                                mentorAssignments[team.id]
                                                    .lastName
                                            }
                                            skills={
                                                mentorAssignments[team.id]
                                                    .skills
                                            }
                                            userId={
                                                mentorAssignments[team.id]
                                                    .userId
                                            }
                                            avatar={
                                                mentorAssignments[team.id]
                                                    .avatar
                                            }
                                            role={
                                                mentorAssignments[team.id].role
                                            }
                                        />

                                        <CloseButton
                                            size="sm"
                                            alignSelf="flex-start"
                                            position="relative"
                                            right={-1}
                                            top={-1}
                                            ml={2}
                                            onClick={() => {
                                                const newAssignments = {
                                                    ...mentorAssignments,
                                                };
                                                delete newAssignments[team.id];
                                                setMentorAssignments(
                                                    newAssignments
                                                );
                                            }}
                                        />
                                    </Flex>
                                ) : (
                                    <MentorSelect
                                        mentors={mentors}
                                        onHover={() => {}}
                                        onSelect={(mentor) => {
                                            const newAssignments = {
                                                ...mentorAssignments,
                                            };
                                            newAssignments[team.id] = mentor;

                                            setMentorAssignments(
                                                newAssignments
                                            );
                                        }}
                                    />
                                )}
                            </Box>
                        </Flex>
                    ))}
                </VStack>
            )}
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamAdmin;
