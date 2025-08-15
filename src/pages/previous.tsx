import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    SimpleGrid,
    VStack,
} from '@chakra-ui/react';
import { createClient } from '@supabase/supabase-js';
import LongTimeline from 'modules/landing/Timeline_previous';
import Link from 'next/link';

import { getEvents } from 'modules/events/api';
import { GrowEvent } from 'modules/events/types';
import FinalistCard from 'modules/teams/components/FinalistCard';
import { Finalist } from 'modules/teams/types';
import React from 'react';
const minutesToSeconds = (minutes: number) => minutes * 60;

export const getStaticProps = async () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );
    try {
        const events_previous = (await getEvents(supabase)).map((e) => ({
            ...e,
            date: e.date.toISOString(),
        }));
        return {
            props: { events_previous },
            revalidate: minutesToSeconds(30),
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
interface PrevProps {
    events: (Omit<GrowEvent, 'date'> & { date: string })[];
}

const Prev: React.FC<PrevProps> = ({ events: jsonEvents = [] }) => {
    const events = jsonEvents.map((e) => ({ ...e, date: new Date(e.date) }));
    const finalists: Finalist[] = [
        {
            name: 'Artjom & Eve',
            description:
                'A sustainable filler packaging for nail polish and other FMCGs with replaceable cartridges.',
            logo: '/images/teams/artjom-eve.png',
        },
        {
            name: 'Wehiculum',
            description:
                'Wehiculum is a carpooling app that connects people driving to work or university. Our goal is to create an easy and sustainable way of daily commuting.',
            logo: '/images/teams/wehiculum.svg',
            hideName: true,
        },
        {
            name: 'MaDeCa',
            description: 'Boosting the Circular Economy – with ALGAE at Sea',
            logo: '/images/teams/madeca.svg',
            hideName: true,
        },
        {
            name: 'MeinDein GmbH i.G.',
            description:
                'MeinDein is a sharing community platform that connects lenders and borrowers. For a fast, safe and local exchange of physical items. Because why waste money on items that are hardly ever used?',
            logo: '/images/teams/meindein.png',
        },
        {
            name: 'Mewz',
            description:
                'Mewz is an app that offers a wide variety of daily creative challenges. Challenges can be completed in under 10 minutes and results can easily be shared through our social media feed. ',
            logo: '/images/teams/mewz.png',
            hideName: true,
        },
        {
            name: 'Rement',
            description:
                'With our process concrete can be completely recycled. This will not only save a lot of resources but it will also reduce the material based CO2-emissions in the cementproduction process.',
            logo: '/images/teams/rement.png',
            hideName: true,
        },
        {
            name: 'StraightUp',
            description:
                'StraightUp is a novel medical system built to prevent backpain caused by unhealthy posture throughout the day. The smart wearable measures the exact posture and gives realtime feedback to the user. ',
            logo: '/images/teams/straight-up.svg',
        },
        {
            name: 'Cellgrid',
            description:
                "Our mission is to make the earth searchable. With Cellgrid we bundle all information about the Earth's surface and organize it in a unifiable way. This makes  complex geospatial search- and analysis queries achievable not only for experts anymore, but for everyone who benefits from additional insights about locations on Earth. Our software solution is designed as a B2B solution for stakeholders that want to make data-driven, efficient and well-informed decisions for their business.",
            logo: '/images/teams/cellgrid.png',
            hideName: true,
        },
        {
            name: 'SPH1NX',
            description: `SPH1NX is the ultimate play-to-earn online riddle game, where players can compete for real money while getting smarter along the way. 

        We provide our users with free daily riddles to improve their cognitive abilities on a daily basis. Additionally, we offer regular riddle solving contests where players pay a small entry fee to compete with the chance to win thousands of euros just by solving riddles. 
        
        SPH1NX is more than just a game, it's a chance for people to level the playing field and earn money based on their intelligence alone. 
        
        Our mission is “Empowerment and Equality through intellect”.`,
            logo: '/images/teams/sph1nx.svg',
        },
        {
            name: 'First Vision',
            description:
                "First Vision is not a company but an idea to bring all like-minded people together for the people. In the ever-changing time, we are committed to bring forward the best possible solutions that would not only minimize the safety risks of our front-line workers but also would help the people to make the world a more safer place with hassle-free technology. We are currently focusing on a way to upgrade firefighting technology. Our state-of-the-art Bird Eye surveillance drone have high-definition cameras, thermal imaging, and air quality monitoring sensors to provide firefighters a bird's-eye view of the fireground (city, forest). Not only that it also incorporates them with the capability to locate the victims even in remote and inaccessible areas.  even in inaccessible or isolated regions also. Our  Panzerwagen, on the other hand, is designed to swiftly and safely deploy essential equipment such as hoses and nozzles to the frontlines. These robots may be remotely operated by firefighters, allowing them to get rapid and safe access to the fireground despite the high temperatures and rough terrain. By supplying fire departments with the most cutting-edge and reliable equipment, we aim to improve public safety, save lives and minimize economic loss.",
            logo: '/images/teams/first-vision.png',
            hideName: true,
        },
    ];
    return (
        <>
            <div id="timeline" className="mt-4">
                <LongTimeline events_previous={events} />
            </div>
            <VStack alignItems="stretch" gap={4} mb={2}>
                <Breadcrumb
                    color="gray.500"
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    <BreadcrumbItem isCurrentPage>
                        <Link href="/mentor" passHref legacyBehavior>
                            <BreadcrumbLink>Previous Finalists</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {finalists.map((finalist) => (
                    <FinalistCard key={finalist.name} finalist={finalist} />
                ))}
            </SimpleGrid>
        </>
    );
};
export default Prev;
