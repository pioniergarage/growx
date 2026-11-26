import {
    Box,
    BoxProps,
    Divider,
    Heading,
    Image,
    Link,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

type MarkdownTextProps = BoxProps & {
    children?: string | null;
};

/**
 * Renders Markdown (same format as the rich text on the Pioniergarage website)
 * with Chakra components. Raw HTML in the source is not rendered.
 */
export default function MarkdownText({ children, ...boxProps }: MarkdownTextProps) {
    return (
        <Box {...boxProps}>
            <ReactMarkdown
                components={{
                    p: ({ children }) => (
                        <Text
                            mb={3}
                            _last={{ mb: 0 }}
                            fontSize="inherit"
                            color="inherit"
                        >
                            {children}
                        </Text>
                    ),
                    a: ({ href, children }) => (
                        <Link
                            href={href}
                            isExternal
                            color="primary"
                            textDecoration="underline"
                        >
                            {children}
                        </Link>
                    ),
                    ul: ({ children }) => (
                        <UnorderedList pl={4} mb={3}>
                            {children}
                        </UnorderedList>
                    ),
                    ol: ({ children }) => (
                        <OrderedList pl={4} mb={3}>
                            {children}
                        </OrderedList>
                    ),
                    li: ({ children }) => <ListItem>{children}</ListItem>,
                    hr: () => <Divider my={3} />,
                    h1: ({ children }) => (
                        <Heading size="lg" mb={2}>
                            {children}
                        </Heading>
                    ),
                    h2: ({ children }) => (
                        <Heading size="md" mb={2}>
                            {children}
                        </Heading>
                    ),
                    h3: ({ children }) => (
                        <Heading size="sm" mb={2}>
                            {children}
                        </Heading>
                    ),
                    img: (props) => (
                        <Image src={props.src} alt={props.alt || ''} maxH="20rem" />
                    ),
                }}
            >
                {children ?? ''}
            </ReactMarkdown>
        </Box>
    );
}
