import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Show,
    Text,
} from '@chakra-ui/react';
import { growFormattedDate } from 'utils/formatters';
import AnimatedLogo from './AnimatedLogo';

type InfoBlockProps = {
    kickoff: Date;
    final: Date;
};

function Fact({ amount, title }: { amount: string; title: string }) {
    return (
        <Box>
            <Heading lineHeight="8" size={{ base: 'xl', md: '2xl' }}>
                {amount}
            </Heading>
            <Text variant="info">{title}</Text>
        </Box>
    );
}

const MainInfoBlock: React.FC<InfoBlockProps> = ({
    kickoff,
    final
}) => {
    return (
        <Grid
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
            placeItems={{ base: 'center', lg: 'start' }}
            textAlign={{ base: 'center', lg: 'left' }}
            mt={8}
            columnGap={6}
            rowGap={12}
        >
            <GridItem>
                <Flex
                    flexDir="column"
                    gap={4}
                    align={{ base: 'center', md: 'start' }}
                >
                    <Heading
                        className="neon-text"
                        lineHeight={1.0}
                        fontWeight="400"
                        fontSize={{ base: '6rem', md: '6.5rem' }}
                        mt={{
                            lg: '10%',
                        }}
                    >
                        Let it <span className="neon-text2">Grow</span>
                    </Heading>
                    <Box className=" mt-3">
                        <Heading size="lg">
                            Germany&apos;s Largest Student Founding Contest
                        </Heading>
                        <Text variant="info" fontSize="lg">
                            Become an entrepreneur and advance your idea over 11
                            weeks. <br></br> Get support, build your prototype
                            and test your market.
                        </Text>
                    </Box>
                    {/* <Flex
                        justifyContent={{
                            base: 'space-around',
                            lg: 'space-between',
                        }}
                        w="100%"
                        mt={10}
                    >
                        <Fact title="startups" amount="50+" />
                        <Fact title="prizes" amount="20 000€" />
                        <Fact title="workshops" amount="11" />
                    </Flex> */}
                    <Flex
                        justifyContent={{
                            base: 'space-around',
                            lg: 'space-between',
                        }}
                        w="100%"
                        mt={{
                            base: '6',
                            lg: '30%',
                        }}
                        flexFlow={{
                            base: 'column',
                            lg: 'row',
                        }}
                    >
                        <Fact title="Start Kick-Off" amount={growFormattedDate(kickoff)} />
                        <Fact
                            title="Finale in Karlsruhe"
                            amount={growFormattedDate(final)}
                        />
                    </Flex>
                </Flex>
            </GridItem>
            <Show above="md">
                <GridItem placeSelf="center" textAlign="center" rowSpan={2}>
                    <Flex className=" flex-col">
                        <AnimatedLogo boxSize={250} />
                    </Flex>
                </GridItem>
            </Show>
        </Grid>
    );
}


export default MainInfoBlock;