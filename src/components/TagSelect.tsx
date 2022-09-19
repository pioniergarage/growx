import { PlusSquareIcon } from '@chakra-ui/icons';
import {
    Box,
    Checkbox,
    Flex,
    HStack,
    IconButton,
    List,
    ListItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Tag,
    TagCloseButton,
    TagLabel,
} from '@chakra-ui/react';
import { useRef } from 'react';

type TagSelectProps = {
    values: string[];
    selected: string[];
    onSelect: (value: string) => void;
    onDeselect: (value: string) => void;
};

const TagSelect = (props: TagSelectProps) => {
    const initialFocusRef = useRef(null);
    return (
        <>
            <Flex wrap="wrap" gap={2}>
                {props.selected.map((value) => (
                    <Tag key={`tag-${value}`}>
                        <TagLabel>{value}</TagLabel>
                        <TagCloseButton
                            onClick={() => props.onDeselect(value)}
                        />
                    </Tag>
                ))}
            </Flex>
            <Popover
                closeOnEsc
                initialFocusRef={initialFocusRef}
                placement="auto-end"
            >
                <PopoverTrigger>
                    <IconButton
                        mt={2}
                        size="sm"
                        icon={<PlusSquareIcon />}
                        aria-label="add-tag"
                        variant="ghost"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <List
                        bg="gray.700"
                        width="100%"
                        overflowY="scroll"
                        maxH="10rem"
                        ref={initialFocusRef}
                    >
                        {props.values.map((value) => (
                            <ListItem
                                key={`listitem-${value}`}
                                px={2}
                                py={1}
                                _hover={{ bg: 'gray.600' }}
                                cursor="pointer"
                                onClick={() => {
                                    if (props.selected.includes(value)) {
                                        props.onDeselect(value);
                                    } else {
                                        props.onSelect(value);
                                    }
                                }}
                                userSelect="none"
                            >
                                <HStack>
                                    <Checkbox
                                        size="sm"
                                        isChecked={props.selected.includes(
                                            value
                                        )}
                                    />
                                    <Box>{value}</Box>
                                </HStack>
                            </ListItem>
                        ))}
                    </List>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default TagSelect;
