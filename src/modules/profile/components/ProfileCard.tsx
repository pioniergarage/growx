import PageLink from '@/components/navigation/PageLink';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';

import UserAvatar, {
    UserAvatarProps,
} from 'modules/avatar/components/UserAvatar';
import { Team } from 'modules/teams/types';
import { FaLightbulb, FaUsers } from 'react-icons/fa';
import { Profile } from '../types';

type ProfileCardProps = UserAvatarProps &
    Partial<Pick<Profile, 'email' | 'phone' | 'bio'>> & {
        team?: Team;
        skills?: Profile['skills'];
        role?: Profile['role'];
        size?: 'lg' | 'md' | 'sm';
    };

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
    const name = props.firstName + ' ' + props.lastName;
    const size = props.size || 'md';
    return (
        <HStack gap={1}>
            <UserAvatar size={size} {...props} />
            <Flex flexDir="column">
                <HStack>
                    <Heading size={size}>{name}</Heading>
                    {props.role ? <Tag>{props.role}</Tag> : undefined}
                </HStack>
                <Flex flexDir="column">
                    {props.bio ? (
                        <Text lineHeight={1.2}>{props.bio}</Text>
                    ) : undefined}
                    <Flex columnGap={4} color="gray.400" wrap="wrap">
                        {props.email ? (
                            <HStack>
                                <EmailIcon />
                                <Text>{props.email}</Text>
                            </HStack>
                        ) : undefined}
                        {props.phone ? (
                            <HStack>
                                <PhoneIcon />
                                <Text>{props.phone}</Text>
                            </HStack>
                        ) : undefined}
                        {props.team ? (
                            <HStack>
                                <FaUsers />
                                <PageLink
                                    href={'/connect/teams/' + props.team.id}
                                >
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
            </Flex>
        </HStack>
    );
};
export default ProfileCard;
