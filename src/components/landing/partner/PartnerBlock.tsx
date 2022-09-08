import { GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'model';
import PartnerItem from './PartnerItem';

type PartnerBlockProps = {
    sponsors: Sponsor[];
};

const PartnerBlock = ({ sponsors }: PartnerBlockProps) => {
    if (!sponsors) return null;

    return (
        <SimpleGrid columns={2}>
            <GridItem>
                <Heading size="lg" color="whiteAlpha.600" mb={2}>
                    Gold Partner
                </Heading>
                <SimpleGrid columns={2}>
                    {sponsors
                        .filter((s) => s.type === 1)
                        .map((sponsor) => (
                            <PartnerItem
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
                    Silver Partner
                </Heading>
                <SimpleGrid columns={3}>
                    {sponsors
                        .filter((s) => s.type === 2)
                        .map((sponsor) => (
                            <PartnerItem
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

export default PartnerBlock;
