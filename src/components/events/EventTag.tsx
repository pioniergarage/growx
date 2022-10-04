import { Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { IconType } from "react-icons";

const EventTag = ({
    children,
    icon,
}: PropsWithChildren & { icon: IconType }) => {
    return (
        <Tag size="sm">
            <TagLeftIcon as={icon} />
            <TagLabel>{children}</TagLabel>
        </Tag>
    );
};

export default EventTag;
