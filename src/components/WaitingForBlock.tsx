import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import ParticipateButton from './ParticipateButton';

export default function WaitingForBlock() {
  return (
    <VStack alignItems={{ base: 'center', md: 'start' }}>
      <Heading size="lg">What Are You Waiting For?</Heading>
      <VStack spacing={4} alignItems={{ base: 'center', md: 'start' }}>
        <p>
          If you are motivated to work with other students on new ideas and
          concepts and want to learn all about startups, then GROW is the place
          for you!
        </p>
        <ParticipateButton />
      </VStack>
    </VStack>
  );
}
