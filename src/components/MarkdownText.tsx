import { externalMediaConsent } from '@/components/CookieBanner';
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
import { useContext } from 'react';

const growOrigin = 'https://grow.pioniergarage.de';

function webUrl(value?: string) {
    if (!value) return null;
    try {
        const url = new URL(value, growOrigin);
        return ['http:', 'https:'].includes(url.protocol) ? url : null;
    } catch {
        return null;
    }
}

type MarkdownTextProps = BoxProps & {
    children?: string | null;
};

/**
 * Renders Markdown with Chakra components. External images follow the shared
 * media preference.
 */
export default function MarkdownText({
    children,
    ...boxProps
}: MarkdownTextProps) {
    const mediaAllowed = useContext(externalMediaConsent);

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
                    a: ({ href, title, children }) => {
                        const url = webUrl(href);
                        return (
                            <Link
                                href={href}
                                title={title}
                                isExternal={Boolean(
                                    url && url.origin !== growOrigin
                                )}
                                color="primary"
                                textDecoration="underline"
                            >
                                {children}
                            </Link>
                        );
                    },
                    ul: ({ children }) => (
                        <UnorderedList pl={4} mb={3}>
                            {children}
                        </UnorderedList>
                    ),
                    ol: ({ children, start }) => (
                        <OrderedList start={start} pl={4} mb={3}>
                            {children}
                        </OrderedList>
                    ),
                    li: ({ children }) => <ListItem>{children}</ListItem>,
                    hr: () => <Divider my={3} />,
                    h1: ({ children }) => (
                        <Heading as="h1" size="lg" mb={2}>
                            {children}
                        </Heading>
                    ),
                    h2: ({ children }) => (
                        <Heading as="h2" size="md" mb={2}>
                            {children}
                        </Heading>
                    ),
                    h3: ({ children }) => (
                        <Heading as="h3" size="sm" mb={2}>
                            {children}
                        </Heading>
                    ),
                    img: ({ src, alt, title }) => {
                        const url = webUrl(src);
                        if (
                            !url ||
                            url.username ||
                            url.password ||
                            (url.origin !== growOrigin && !mediaAllowed)
                        ) {
                            const label = alt?.trim();
                            return label ? (
                                <Text as="span" role="img" aria-label={label}>
                                    {label}
                                </Text>
                            ) : null;
                        }
                        return (
                            <Image
                                src={src}
                                alt={alt || ''}
                                title={title}
                                maxH="20rem"
                                maxW="100%"
                            />
                        );
                    },
                }}
            >
                {children ?? ''}
            </ReactMarkdown>
        </Box>
    );
}
