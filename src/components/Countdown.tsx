import { Box, Text, TextProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const calculateTimeLeft = (to: Date) => {
  let difference = +to - +new Date();

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Countdown({ to, ...props }: { to: Date } & TextProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(to));
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(to));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Box p={6}>
      <Text fontWeight="bold" fontSize="2xl" {...props}>
        {timeLeft.days > 0 ? timeLeft.days + 'd' : ''}&nbsp;
        {timeLeft.hours > 0 ? timeLeft.hours + 'h' : ''}&nbsp;
        {timeLeft.minutes > 0 ? timeLeft.minutes + 'm' : ''}&nbsp;
        {timeLeft.seconds + 's'}
      </Text>
      <Text variant="info">
        Until{' '}
        <Text as="span" color="secondary" fontWeight="semibold">
          Kickoff Event
        </Text>
      </Text>
    </Box>
  );
}
