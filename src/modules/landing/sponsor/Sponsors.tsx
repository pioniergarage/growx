import { GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'modules/sponsor/types';
import SponsorGrid from './SponsorGrid';

type SponsorsProps = {
    sponsors: Sponsor[];
};

//TODO Update "2023" to "2024" as soon as sponsors are available.

const Sponsors = ({ sponsors }: SponsorsProps) => {
    if (!sponsors) return null;

    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="start">
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Flagship Sponsors 2023
                </Heading>
                <SponsorGrid
                    sponsors={sponsors.filter((s) => s.type === 'FLAGSHIP')}
                    columns={{ base: 1, md: 2 }}
                />
            </GridItem>

            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Gold Sponsors 2023
                </Heading>
                <SponsorGrid
                    sponsors={sponsors.filter((s) => s.type === 'GOLD')}
                    columns={{ base: 2, md: 3 }}
                />
            </GridItem>
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Silver Sponsors 2023
                </Heading>
                <SponsorGrid
                    sponsors={sponsors.filter((s) => s.type === 'SILVER')}
                    columns={3}
                />
            </GridItem>
            {/* <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Bronze Sponsors
                </Heading>
                <SponsorGrid
                    sponsors={sponsors.filter((s) => s.type === 'BRONZE')}
                    columns={3}
                />
            </GridItem> */}
        </SimpleGrid>
    );
};

export default Sponsors;
