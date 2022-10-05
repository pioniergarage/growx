import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

const EventTag = ({
    children,
    icon,
    colorScheme
}: PropsWithChildren & { icon: IconType, colorScheme?: string }) => {
    return (
        <Tag size="sm" colorScheme={colorScheme}>
            <TagLeftIcon as={icon} />
            <TagLabel>{children}</TagLabel>
        </Tag>
    );
};

export default EventTag;
