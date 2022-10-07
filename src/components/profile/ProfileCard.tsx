import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';
import { Profile, Team } from 'model';
import { FaLightbulb, FaUsers } from 'react-icons/fa';
import UserAvatar, { UserAvatarProps } from '../avatar/UserAvatar';
import PageLink from '../navigation/PageLink';

type ProfileCardProps = UserAvatarProps &
    Pick<Profile, 'email' | 'phone'> & {
        team?: Team;
        skills?: Profile['skills'];
        role?: Profile['role'];
        size?: 'lg' | 'md';
    };

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
    const name = props.firstName + ' ' + props.lastName;
    const size = props.size || 'md';
    return (
        <HStack gap={2}>
            <UserAvatar size={size} {...props} />
            <Flex flexDir="column">
                <HStack>
                    <Heading size={size}>{name}</Heading>
                    {props.role ? <Tag>{props.role}</Tag> : undefined}
                </HStack>
                <Flex columnGap={4} color="gray.400" wrap="wrap">
                    <HStack>
                        <EmailIcon />
                        <Text>{props.email}</Text>
                    </HStack>
                    {props.phone ? (
                        <HStack>
                            <PhoneIcon />
                            <Text>{props.phone}</Text>
                        </HStack>
                    ) : undefined}
                    {props.team ? (
                        <HStack>
                            <FaUsers />
                            <PageLink href={'/connect/teams/' + props.team.id}>
                                {props.team.name}
                            </PageLink>
                        </HStack>
                    ) : undefined}
                    {props.skills ? (
                        <HStack>
                            <FaLightbulb />
                            <Text>{props.skills.join(', ')}</Text>
                        </HStack>
                    ) : undefined}
                </Flex>
            </Flex>
        </HStack>
    );
};
export default ProfileCard;
