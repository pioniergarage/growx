import MainInfoBlock from 'components/MainInfoBlock';
import Timeline from 'components/Timeline';
import MotivationBlock from 'components/MotivationBlock';
import WaitingForBlock from '@/components/WaitingForBlock';
import PartnerBlock from '@/components/PartnerBlock';
import { supabaseClient as supabase } from '@supabase/auth-helpers-nextjs';
import { Sponsor } from 'types/partner';
import { PropsWithChildren } from 'react';
import { Box, BoxProps, Divider } from '@chakra-ui/react';

export async function getStaticProps() {
    const { data: sponsors, error } = await supabase
        .from('sponsors')
        .select('*');
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
        <Box as="section" px={{ base: 4, md: 6, xl: 0 }} my={8} {...rest}>
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
            <Section divider position="relative">
                <Box
                    maxW="container.xl"
                    transform="translate(-1rem, -50%)"
                    top={0}
                    w="100%"
                    h={{ base: '40rem', md: '100%' }}
                    position="absolute"
                    zIndex={-10}
                >
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        bgGradient="linear-gradient(128.16deg, #5557f777 8.06%, #d34dbc80 45% , #d6265170 83.26%)"
                        borderRadius="50%"
                        filter={{ base: 'blur(20px)', md: 'blur(150px)' }}
                    />
                </Box>
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
