import {
    Divider,
    Heading,
    Image,
    ListItem,
    OrderedList,
    UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

export default function TeamDescription({ description = '' }) {
    return (
        <ReactMarkdown
            components={{
                ul: ({ children }) => (
                    <UnorderedList pl={4}>{children}</UnorderedList>
                ),
                ol: ({ children }) => (
                    <OrderedList pl={4}>{children}</OrderedList>
                ),
                li: ({ children }) => <ListItem>{children}</ListItem>,
                hr: () => <Divider />,
                h1: (props) => <Heading size="lg" {...props} />,
                h2: (props) => <Heading size="md" {...props} />,
                h3: (props) => <Heading size="sm" {...props} />,
                img: (props) => (
                    <Image src={props.src} alt={props.alt || ''} maxH="20rem" />
                ),
            }}
        >
            {description}
        </ReactMarkdown>
    );
}
