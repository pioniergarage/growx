import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

const EventTag = ({
    children,
    icon,
    colorScheme,
    transparent = false,
}: PropsWithChildren & {
    icon: IconType;
    colorScheme?: string;
    transparent?: boolean;
}) => {
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
