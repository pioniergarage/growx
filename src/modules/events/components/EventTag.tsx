import { Button, HStack, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

const EventTag = ({
    children,
    icon,
    colorScheme,
    transparent = false,
    onClick,
}: PropsWithChildren & {
    icon: IconType;
    colorScheme?: string;
    transparent?: boolean;
    onClick?: () => void
}) => {
    if (onClick) {
        return (
            <Button
                padding={2}
                size="sm"
                onClick={onClick}
            >
                <HStack gap={0}>
                    <TagLeftIcon as={icon} />
                    <Text>{children}</Text>
                </HStack>
            </Button>
        )
    }
    return (
        <Tag
            size="md"
            colorScheme={colorScheme}
            backgroundColor={transparent ? 'transparent' : undefined}
        >
            <TagLeftIcon as={icon} />
            <TagLabel>{children}</TagLabel>
        </Tag>
    );
};

export default EventTag;
