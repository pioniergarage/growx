import type { NextPage } from "next";
import MainInfoBlock from "components/MainInfoBlock";
import Timeline from "components/Timeline";
import MotivationBlock from "components/MotivationBlock";
import WaitingForBlock from "WaitingForBlock";
import PartnerBlock from "@/components/PartnerBlock";

const Home: NextPage = () => {
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
                <PartnerBlock />
            </section>
        </>
    );
};

export default Home;
