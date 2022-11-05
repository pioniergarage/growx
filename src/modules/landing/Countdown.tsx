import { Flex, Text, TextProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface CountdownProps extends TextProps {
    to?: Date;
}

const Countdown: React.FC<CountdownProps> = ({
    to = new Date('2022-11-11T16:00:00Z'),
    ...props
}) => {
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

        return Object.fromEntries(
            Object.entries(timeLeft).map(([key, value]) => [
                key,
                String(value).padStart(2, '0'),
            ])
        );
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(to));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(to));
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [to]);

    return (
        <Flex flexDir="column" p={2} alignItems="center">
            <Text fontWeight="bold" fontSize="2xl" {...props}>
                {timeLeft.days + 'd'}&nbsp;
                {timeLeft.hours + 'h'}&nbsp;
                {timeLeft.minutes + 'm'}&nbsp;
                {timeLeft.seconds + 's'}
            </Text>
            <Text variant="info" fontWeight="bold">
                Extended Sign-up Period
            </Text>
        </Flex>
    );
};

export default Countdown;
