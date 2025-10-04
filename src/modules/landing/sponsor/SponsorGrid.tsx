import { ResponsiveValue, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'modules/sponsor/types';
import SponsorItem from './SponsorItem';

interface SponsorGridProps {
    sponsors: Sponsor[];
    columns: ResponsiveValue<number>;
}

const SponsorGrid: React.FC<SponsorGridProps> = ({ sponsors, columns }) => {
    return (
        <SimpleGrid columns={columns} gap={4} placeItems="space-around">
            {sponsors.map((sponsor) => (
                <SponsorItem
                    key={sponsor.name}
                    href={sponsor.link}
                    logo={sponsor.logo}
                    name={sponsor.name}
                />
            ))}
        </SimpleGrid>
    );
};

export default SponsorGrid;
