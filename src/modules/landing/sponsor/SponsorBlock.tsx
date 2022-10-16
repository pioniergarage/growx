import { GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'modules/sponsor/types';

import SponsorItem from './SponsorItem';

type SponsorBlockProps = {
    sponsors: Sponsor[];
};

const SponsorBlock = ({ sponsors }: SponsorBlockProps) => {
    if (!sponsors) return null;

    return (
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} alignItems="start">
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Flagship Sponsors
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={4}
                    placeItems="center"
                >
                    {sponsors
                        .filter((s) => s.type === 'FLAGSHIP')
                        .map((sponsor) => (
                            <SponsorItem
                                key={sponsor.name}
                                href={sponsor.link}
                                logo={sponsor.logo}
                                name={sponsor.name}
                            />
                        ))}
                </SimpleGrid>
            </GridItem>

            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Gold Sponsors
                </Heading>
                <SimpleGrid
                    columns={{ base: 2, md: 3 }}
                    gap={4}
                    placeItems="center"
                >
                    {sponsors
                        .filter((s) => s.type === 'GOLD')
                        .map((sponsor) => (
                            <SponsorItem
                                key={sponsor.name}
                                href={sponsor.link}
                                logo={sponsor.logo}
                                name={sponsor.name}
                            />
                        ))}
                </SimpleGrid>
            </GridItem>
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Silver Sponsors
                </Heading>
                <SimpleGrid columns={3} gap={4} placeItems="center">
                    {sponsors
                        .filter((s) => s.type === 'SILVER')
                        .map((sponsor) => (
                            <SponsorItem
                                key={sponsor.name}
                                href={sponsor.link}
                                logo={sponsor.logo}
                                name={sponsor.name}
                            />
                        ))}
                </SimpleGrid>
            </GridItem>
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Bronze Sponsors
                </Heading>
                <SimpleGrid columns={3} gap={4} placeItems="center">
                    {sponsors
                        .filter((s) => s.type === 'BRONZE')
                        .map((sponsor) => (
                            <SponsorItem
                                key={sponsor.name}
                                href={sponsor.link}
                                logo={sponsor.logo}
                                name={sponsor.name}
                            />
                        ))}
                </SimpleGrid>
            </GridItem>
        </SimpleGrid>
    );
};

export default SponsorBlock;
