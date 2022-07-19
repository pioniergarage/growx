import { Flex, Grid, GridItem, Heading, Text, VStack } from "@chakra-ui/react";

function Arrow() {
  return (
    <div className="flex flex-col items-center h-full">
      <div
        className="vertical-line h-full rounded"
        style={{ margin: "0 0 -2px 0" }}
      ></div>
      <i className="arrow-down"></i>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  description,
}: {
  date: string;
  title: string;
  description: string;
}) {
  return (
    <GridItem>
      <Text fontSize='sm'>{date}</Text>
      <Heading color='secondary' size='md'>{title}</Heading>
      <Text mt={2}>{description}</Text>
    </GridItem>
  );
}

export default function Timeline() {
  const events = [
    {
      date: "10. Nov 22",
      title: "Kickoff Event",
      description: `Pitch your idea, find a team or simply learn more about the contest. 
            The kickoff is where the fun starts, no matter whether you have already applied or you're up for a spontaneous adventure. `,
    },
    {
      date: "14. Dec 22",
      title: "Midterm Pitch",
      description: `Half time break! Teams pitch their first progress and fight about advancing to the final. 
            Pitch what you've done in the last 5 weeks in front of a small audience and the jury. `,
    },
    {
      date: "10. Jan 23",
      title: "Finale",
      description: `Pitch your results of the contest and win prizes. This is what you've been working for! 
            Pitch one last time in front of a huge audience and show what you've learned and how far you have come.... `,
    },
  ];
  return (
    <VStack alignItems={{ base: "center", md: "start" }} spacing={4}>
      <Heading size="lg" className="text-center">
        From idea to prototype in 11 weeks
      </Heading>
      <Flex w="full">
        <Grid
          flexGrow={1}
          templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
          gap={2}
        >
          {events.map((event) => (
            <TimelineItem {...event} key={event.title} />
          ))}
        </Grid>
      </Flex>
    </VStack>
  );
}
