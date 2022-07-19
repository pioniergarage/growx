import MainInfoBlock from "components/MainInfoBlock";
import Timeline from "components/Timeline";
import MotivationBlock from "components/MotivationBlock";
import WaitingForBlock from "@/components/WaitingForBlock";
import PartnerBlock from "@/components/PartnerBlock";
import { supabaseClient as supabase } from "@supabase/auth-helpers-nextjs";
import { Sponsor } from "types/partner";
import { PropsWithChildren } from "react";
import { Box, BoxProps, Divider } from "@chakra-ui/react";

export async function getStaticProps() {
  const { data: sponsors, error } = await supabase.from("sponsors").select("*");
  if (error) {
    throw Error(error.message);
  }
  return { props: { sponsors } };
}

function Section({
  children,
  divider = false,
  ...rest
}: PropsWithChildren & { divider?: boolean } & BoxProps) {
  return (
    <Box as="section" px={{ base: 4, xl: 0 }} my={8} {...rest}>
      <Box mx="auto" maxW="container.xl">
        {children}
        {divider && <Divider my={8} />}
      </Box>
    </Box>
  );
}

export default function Home({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <>
      <Section divider>
        <MainInfoBlock />
      </Section>

      <Section divider>
        <Timeline />
      </Section>

      <Section divider>
        <MotivationBlock />
      </Section>

      <Section divider>
        <WaitingForBlock />
      </Section>

      <Section mt={6}>
        <PartnerBlock sponsors={sponsors} />
      </Section>
    </>
  );
}
