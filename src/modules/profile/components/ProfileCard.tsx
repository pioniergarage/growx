import PageLink from '@/components/navigation/PageLink';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';

import UserAvatar, {
    UserAvatarProps,
} from 'modules/avatar/components/UserAvatar';
import { ContactInformation } from 'modules/contactInformation/types';
import { Team } from 'modules/teams/types';
import { FaLightbulb, FaUsers } from 'react-icons/fa';
import { Profile } from '../types';

type ProfileCardProps = UserAvatarProps & {
    profile: Profile;
    contact?: ContactInformation;
    size?: 'sm' | 'md';
    team?: Team;
    showRole?: boolean;
    showSkills?: boolean;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
    profile,
    contact,
    size = 'md',
    team,
    showRole = false,
    showSkills = false,
}) => {
    const name = profile.firstName + ' ' + profile.lastName;
    return (
        <HStack gap={1}>
            <UserAvatar size={size} profile={profile} />
            <Flex flexDir="column">
                <HStack>
                    <Heading size={size}>{name}</Heading>
                    {profile.role && showRole ? (
                        <Tag>{profile.role}</Tag>
                    ) : undefined}
                </HStack>
                <Flex flexDir="column">
                    {profile.bio ? (
                        <Text lineHeight={1.2}>{profile.bio}</Text>
                    ) : undefined}
                    <Flex columnGap={4} color="gray.400" wrap="wrap">
                        {contact?.email ? (
                            <HStack>
                                <EmailIcon />
                                <Text>{contact.email}</Text>
                            </HStack>
                        ) : undefined}
                        {contact?.phone ? (
                            <HStack>
                                <PhoneIcon />
                                <Text>{contact.phone}</Text>
                            </HStack>
                        ) : undefined}
                        {team ? (
                            <HStack>
                                <FaUsers />
                                <PageLink href={'/connect/teams/' + team.id}>
                                    {team.name}
                                </PageLink>
                            </HStack>
                        ) : undefined}
                        {profile.skills.length > 0 && showSkills ? (
                            <HStack>
                                <FaLightbulb />
                                <Text>{profile.skills.join(', ')}</Text>
                            </HStack>
                        ) : undefined}
                    </Flex>
                </Flex>
            </Flex>
        </HStack>
    );
};
export default ProfileCard;
