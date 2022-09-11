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
import { FAQ } from 'model';

interface FaqListProps {
    faqs: FAQ[];
}

const FaqList: React.FC<FaqListProps> = ({ faqs }) => {
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
};

export default FaqList;
