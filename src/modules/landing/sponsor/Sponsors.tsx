import { Divider, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'modules/sponsor/types';
import SponsorGrid from './SponsorGrid';

type SponsorAndSupporterProps = {
    sponsors: Sponsor[];
};

const SponsorsAndSupporters = ({ sponsors }: SponsorAndSupporterProps) => {
    if (!sponsors) return null;

    const flagship_sponsors = sponsors.filter((s) => s.type === 'FLAGSHIP');
    const gold_sponsors = sponsors.filter((s) => s.type === 'GOLD');
    const silver_sponsors = sponsors.filter((s) => s.type === 'SILVER');
    const bronze_sponsors = sponsors.filter((s) => s.type === 'BRONZE');
    const patrons = sponsors.filter((s) => s.type === 'PATRON'); //TODO What is the exact legal translation for "Förderer?"
    const supporters = sponsors.filter((s) => s.type === 'SUPPORTER');

    return (
        <>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="start">
                {patrons.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Supported by
                        </Heading>
                        <SponsorGrid
                            sponsors={patrons}
                            columns={3}
                        />
                    </GridItem>
                }

            </SimpleGrid>

            <Divider my={12} />

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="start">
                {flagship_sponsors.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Flagship Sponsors
                        </Heading>
                        <SponsorGrid
                            sponsors={flagship_sponsors}
                            columns={{ base: 1, md: 2 }}
                        />
                    </GridItem>
                }
                {gold_sponsors.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Gold Sponsors
                        </Heading>
                        <SponsorGrid
                            sponsors={gold_sponsors}
                            columns={{ base: 2, md: 3 }}
                        />
                    </GridItem>
                }
                {silver_sponsors.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Silver Sponsors
                        </Heading>
                        <SponsorGrid
                            sponsors={silver_sponsors}
                            columns={3}
                        />
                    </GridItem>
                }
                {bronze_sponsors.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Bronze Sponsors
                        </Heading>
                        <SponsorGrid
                            sponsors={bronze_sponsors}
                            columns={3}
                        />
                    </GridItem>
                }
                {supporters.length > 0 &&
                    <GridItem>
                        <Heading size="lg" color="whiteAlpha.600" mb={2}>
                            Community Partners
                        </Heading>
                        <SponsorGrid
                            sponsors={supporters}
                            columns={3}
                        />
                    </GridItem>
                }
            </SimpleGrid>
        </>

    );
};

export default SponsorsAndSupporters;