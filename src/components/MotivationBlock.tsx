import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export default function MotivationBlock() {
  const motivations = [
    {
      title: "Find Your Team",
      description:
        "You don’t have a team yet? GROW is the perfect opportunity to find team mates! At the kickoff event, you can pitch your idea or just ask other teams whether they still need Co-Founders.",
    },
    {
      title: "Kickstart Your Business",
      description:
        "Offering numerous workshops about multiple topics as well as the opportunity to win funding, GROW is the perfect opportunity to start your own company.",
    },
    {
      title: "Learn Through Mentorship",
      description:
        "Each team will receive support by our competent Mentors and Buddies. This will help your business to grow beyond its limits.",
    },
  ];

  return (
    <VStack alignItems={{ base: "center", md: "start" }}>
      <Heading size="lg">Why GROW?</Heading>
      <VStack spacing={4} w="full" alignItems={{ base: "center", md: "start" }}>
        {motivations.map((motivation) => (
          <Box key={motivation.title}>
            <Heading size="md" color="primary">
              {motivation.title}
            </Heading>
            <Text>{motivation.description}</Text>
          </Box>
        ))}
      </VStack>
    </VStack>
  );
}
