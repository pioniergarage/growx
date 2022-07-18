
import MainInfoBlock from "@/components/grow/MainInfoBlock";
import MotivationBlock from "@/components/grow/MotivationBlock";
import PartnerBlock from "@/components/grow/PartnerBlock";
import Timeline from "@/components/grow/Timeline";
import WaitingForBlock from "@/components/grow/WaitingForBlock";
import { supabaseClient as supabase } from "@supabase/auth-helpers-nextjs";
import { Sponsor } from "types/partner";

export async function getStaticProps() {
    const { data: sponsors, error } = await supabase.from('sponsors').select('*')
    if (error) {
        throw Error(error.message)
    }
    return { props: { sponsors } }
}


export default function Home({ sponsors }: { sponsors: Sponsor[] }) {
    return (
        <>
            <section className="max-w-7xl mx-auto p-4">
                <MainInfoBlock />
                <div className="divider"></div>
            </section>

            <section className="max-w-7xl mx-auto px-4">
                <Timeline />
                <div className="divider"></div>
            </section>

            <section className="max-w-7xl mx-auto px-4">
                <MotivationBlock />
                <div className="divider"></div>
            </section>

            <section className="max-w-7xl mx-auto px-4">
                <WaitingForBlock />
            </section>

            <section className="bg-neutral px-4 mt-8 text-center">
                <PartnerBlock sponsors={sponsors} />
            </section>
        </>
    );
};
