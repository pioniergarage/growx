import { GridItem, Heading, Image, Link, SimpleGrid } from '@chakra-ui/react';
import { Sponsor } from 'types/partner';

function PartnerItem({ link: href, logo, name }: Partial<Sponsor>) {
  return (
    <Link href={href} isExternal>
      <Image className="max-h-16 brightness-75" src={logo} alt={name} />
    </Link>
  );
}

export default function PartnerBlock({ sponsors }: { sponsors: Sponsor[] }) {
  if (!sponsors) return <></>;
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
              <PartnerItem key={sponsor.name} {...sponsor} />
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
              <PartnerItem key={sponsor.name} {...sponsor} />
            ))}
        </SimpleGrid>
      </GridItem>
    </SimpleGrid>
  );
}
