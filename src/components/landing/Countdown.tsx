import { Box, Text, TextProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Countdown({
    to = new Date('11/05/2022'),
    ...props
}: { to?: Date } & TextProps) {
    const calculateTimeLeft = (to: Date) => {
        const difference = +to - +new Date();

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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(to));
    // eslint-disable-next-line no-undef
    const [timer, setTimer] = useState<NodeJS.Timer>();

    useEffect(() => {
        if (!timer)
            setTimer(
                setInterval(() => setTimeLeft(calculateTimeLeft(to)), 1000)
            );
        return () => clearInterval(timer);
    }, [to, timer]);

    return (
        <Box p={6}>
            <Text fontWeight="bold" fontSize="2xl" {...props}>
                {timeLeft.days + 'd'}&nbsp;
                {timeLeft.hours + 'h'}&nbsp;
                {timeLeft.minutes + 'm'}&nbsp;
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
