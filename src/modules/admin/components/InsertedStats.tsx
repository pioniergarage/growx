import {
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react';
import { PropsWithChildren, useMemo } from 'react';

type InsertedStatProps = PropsWithChildren & {
    data: { insertedAt: Date }[];
};
const SECOND_TO_MILLIS = 1000;
const MINUTE_TO_MILLIS = SECOND_TO_MILLIS * 60;
const HOUR_TO_MILLIS = MINUTE_TO_MILLIS * 60;
const DAY_TO_MILLIS = HOUR_TO_MILLIS * 24;

const InsertedStats: React.FC<InsertedStatProps> = ({ children, data }) => {
    const { profilesYesterday, profilesLastWeek } = useMemo(() => {
        const yesterday = Date.now() - DAY_TO_MILLIS;
        const weekago = Date.now() - DAY_TO_MILLIS * 7;
        const profilesYesterday = data.filter(
            (p) => p.insertedAt.getTime() < yesterday
        );
        const profilesLastWeek = data.filter(
            (p) => p.insertedAt.getTime() < weekago
        );
        return { profilesLastWeek, profilesYesterday };
    }, [data]);

    return (
        <Stat minW="7rem">
            <StatLabel>{children}</StatLabel>
            <StatNumber>{data.length}</StatNumber>
            <StatHelpText mb={0}>
                <StatArrow type="increase" />
                {data.length - profilesYesterday.length} today
            </StatHelpText>
            <StatHelpText>
                <StatArrow type="increase" />
                {data.length - profilesLastWeek.length} last week
            </StatHelpText>
        </Stat>
    );
};

export default InsertedStats;
