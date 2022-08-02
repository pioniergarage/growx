import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';

export interface FaqType {
    question: string;
    answer: string;
}

export default function Faqs({ faqs }: { faqs: FaqType[] }) {
    return (
        <VStack alignItems={{ base: 'center', md: 'stretch' }}>
            <Heading size="lg">FAQs</Heading>
            <Accordion>
                {faqs.map((faq, i) => (
                    <AccordionItem key={i}>
                        <AccordionButton>
                            <Box flex={1} textAlign="left">
                                <Text fontWeight="semibold">
                                    {faq.question}
                                </Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <Text>{faq.answer}</Text>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </VStack>
    );
}
