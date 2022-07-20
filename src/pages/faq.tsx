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
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

interface FaqType {
  question: string;
  answer: string;
}

export async function getStaticProps() {
  const { data: faqs, error } = await supabase.from('faqs').select('*');
  if (error) {
    throw Error(error.message);
  }
  return { props: { faqs } };
}

export default function Faqs({ faqs }: { faqs: FaqType[] }) {
  return (
    <Box maxW="container.xl" mx="auto" mt={8} px={4}>
      <Heading size={{ base: 'lg', md: 'xl' }} mb={4}>
        Frequently Asked Questions
      </Heading>
      <Accordion allowMultiple>
        {faqs.map((faq, i) => (
          <AccordionItem key={i}>
            <AccordionButton>
              <Box flex={1} textAlign="left">
                <Text fontWeight="semibold">{faq.question}</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>{faq.answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
