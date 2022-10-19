import { Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react';

import UserAvatar, {
    UserAvatarProps,
} from 'modules/avatar/components/UserAvatar';
import { getFullName, Profile } from '../types';

type ProfileCardProps = UserAvatarProps &
    Partial<Profile> & {
        size?: 'lg' | 'md' | 'sm';
    };

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
    const size = props.size || 'md';
    return (
        <HStack gap={1}>
            <UserAvatar size={size} {...props} />
            <Flex flexDir="column">
                <HStack>
                    <Heading size={size}>{getFullName(props)}</Heading>
                    {props.role ? <Tag>{props.role}</Tag> : undefined}
                </HStack>
                <Flex flexDir="column">
                    {props.bio ? (
                        <Text lineHeight={1.2}>{props.bio}</Text>
                    ) : undefined}
                </Flex>
            </Flex>
        </HStack>
    );
};
export default ProfileCard;
