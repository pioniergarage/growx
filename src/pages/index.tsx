import type { NextPage } from "next";
import Link from "next/link";
import MainInfoBlock from "components/MainInfoBlock";
import Timeline from "components/Timeline";
import MotivationBlock from "components/MotivationBlock";
import PartnerList from "components/PartnerList";

const Home: NextPage = () => {
    return (
        <>
            <div className="flex flex-col items-center text-center gap-4 p-4 pb-0">
                <MainInfoBlock />
                <div className="divider"></div>

                <h2 className="text-2xl font-bold w-4/5">From idea to prototype in 11 weeks</h2>
                <Timeline />
                <div className="divider"></div>

                <h2 className="text-2xl font-bold w-4/5">Why GROW?</h2>
                <MotivationBlock />
                <div className="divider"></div>

                <h2 className="text-2xl font-bold w-4/5">What Are You Waiting For?</h2>
                <div>
                    <p>Wenn du motiviert bist, mit anderen Studierenden zusammen an neuen Ideen und Konzepten zu arbeiten und dabei alles über Startups lernen möchtest, dann bist du bei GROW genau richtig!</p>
                    <Link href="/">
                        <a className="btn btn-primary btn-wide mt-4">Participate</a>
                    </Link>
                </div>
            </div>
            <div className="bg-neutral p-4 mt-8 text-center">
                <h2 className="text-2xl font-bold text-white">Gold Partner</h2>
                <PartnerList partners={[
                    { name: 'KIT Gründerschiede', logo: 'https://grow.pioniergarage.de/media/partner_logos/KIT_Gr%C3%BCnderschmiede_white.png', href: 'https://kit-gruenderschmiede.de/', id: 'gründerschiede' },
                    { name: 'GründerMotor', logo: 'https://grow.pioniergarage.de/media/partner_logos/gr%C3%BCndermotor.png', href: 'https://kit-gruenderschmiede.de/', id: 'GründerMotor' },
                    { name: 'Ionos', logo: 'https://grow.pioniergarage.de/media/partner_logos/Logo_IONOS_by_white.png', href: 'https://kit-gruenderschmiede.de/', id: 'ionos' },
                ]} />
            </div>
        </>
    );
};

export default Home;
