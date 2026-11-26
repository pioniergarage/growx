import MarkdownText from '@/components/MarkdownText';

export default function TeamDescription({ description = '' }) {
    return <MarkdownText>{description}</MarkdownText>;
}
