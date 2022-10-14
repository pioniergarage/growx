import UserAvatar from '@/components/avatar/UserAvatar';
import AdminBreadcrumbs from '@/components/navigation/AdminBreadcrumbs';
import TeamLogo from '@/components/teams/TeamLogo';
import { CloseIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
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
    Spinner,
    Tag,
    Text,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useProfiles } from 'hooks/profile';
import {
    useAllTeams,
    useAssignMentor,
    useMentorAssignments,
    useTeamMembers,
    useUnassignMentor,
} from 'hooks/team';
import { Profile, Team } from 'model';
import { useMemo, useState } from 'react';

const AvatarList = (props: { team: Team }) => {
    const { members } = useTeamMembers(props.team.id);
    return (
        <Flex alignItems="center" gap={1}>
            {members?.map((m) => (
                <UserAvatar
                    key={m.userId}
                    firstName={m.firstName}
                    lastName={m.lastName}
                    avatar={m.avatar}
                    userId={m.userId}
                    size="sm"
                />
            ))}
        </Flex>
    );
};

type MentorSelectProps = {
    mentors: Profile[];
    onSelect?: (mentor: Profile) => void;
    onHover?: (mentor?: Profile) => void;
};
const MentorSelect = (props: MentorSelectProps) => {
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
        <Box>
            <Input
                placeholder="Select mentor"
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                mb={2}
            />
            <List as={Flex} flexDir="column" maxH="20rem" overflowY="scroll">
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
    );
};

type MentorAvatarProps = {
    mentor?: Profile;
    onSelect?: (mentor: Profile) => void;
    onHover?: (mentor?: Profile) => void;
    onUnselect?: () => void;
};
const MentorAvatar = (props: MentorAvatarProps) => {
    const { profiles } = useProfiles();
    const mentors = useMemo(
        () => (profiles ?? []).filter((p) => p.role === 'MENTOR'),
        [profiles]
    );
    return (
        <Popover>
            <PopoverTrigger>
                {props.mentor ? (
                    <IconButton
                        isRound
                        aria-label="Adjust mentor"
                        icon={
                            <UserAvatar
                                size="sm"
                                userId={props.mentor.userId}
                                avatar={props.mentor.avatar}
                                firstName={props.mentor.firstName}
                                lastName={props.mentor.lastName}
                            />
                        }
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
                    {props.mentor ? (
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
                    ) : undefined}
                    <MentorSelect
                        mentors={
                            props.mentor
                                ? mentors.filter(
                                      (m) => m.userId != props.mentor?.userId
                                  )
                                : mentors
                        }
                        onSelect={props.onSelect}
                        onHover={props.onHover}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

const TeamTable = (props: { teams: Team[] }) => {
    const activeTeams = useMemo(
        () => props.teams.filter((t) => !t.archived),
        [props.teams]
    );
    const { mentorAssignments } = useMentorAssignments();
    const { assignMentor } = useAssignMentor();
    const { unassignMentor } = useUnassignMentor();
    return (
        <Flex alignItems="stretch" flexDir="column">
            <Grid
                gridTemplateColumns="1fr 10rem 4rem"
                color="gray.400"
                px={4}
                py={3}
                fontSize={14}
            >
                <Box>{activeTeams.length} Teams</Box>
                <Box>Members</Box>
                <Box>Mentor</Box>
            </Grid>
            {activeTeams.map((team) => (
                <Grid
                    key={team.id}
                    gridTemplateColumns="1fr 10rem 4rem"
                    px={4}
                    borderTop="1px"
                    borderColor="whiteAlpha.300"
                    py={2}
                    justifyItems="start"
                    alignItems="center"
                >
                    <Flex fontWeight="semibold" alignItems="center" gap={2}>
                        <TeamLogo {...team} size={10} />
                        <Flex flexDir="column">
                            {team.name}
                            <Flex gap={1}>
                                {team.requestSupport.map((subject) => (
                                    <Tag key={subject} size="sm">
                                        {subject}
                                    </Tag>
                                ))}
                            </Flex>
                        </Flex>
                    </Flex>
                    <AvatarList team={team} />
                    <MentorAvatar
                        mentor={
                            mentorAssignments
                                ? mentorAssignments[team.id]
                                : undefined
                        }
                        onSelect={(mentor) =>
                            assignMentor({
                                teamId: team.id,
                                mentorId: mentor.userId,
                            })
                        }
                        onUnselect={() => {
                            unassignMentor({ teamId: team.id });
                        }}
                    />
                </Grid>
            ))}
        </Flex>
    );
};

const TeamAdmin = () => {
    const { teams } = useAllTeams([]);
    return (
        <VStack alignItems="stretch">
            <AdminBreadcrumbs route={[['Teams', '/connect/admin/teams']]} />
            {teams === undefined ? <Spinner /> : <TeamTable teams={teams} />}
        </VStack>
    );
};
export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
});

export default TeamAdmin;
