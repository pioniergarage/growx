import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    VStack,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    List,
    ListItem,
    SimpleGrid,
} from '@chakra-ui/react';
import MentorList from 'modules/landing/MentorList';
import FinalistCard from 'modules/teams/components/FinalistCard';
import { Finalist } from 'modules/teams/types';
import Link from 'next/link';

const Finalists: React.FC = () => {
    const finalists: Finalist[] = [
        {
            name: 'Artjom & Eve',
            description:
                'A sustainable filler packaging for nail polish and other FMCGs with replaceable cartridges.',
            logo: '/images/teams/artjom-eve.png',
        },
        {
            name: 'Cellgrid',
            description:
                "Our mission is to make the earth searchable. With Cellgrid we bundle all information about the Earth's surface and organize it in a unifiable way. This makes  complex geospatial search- and analysis queries achievable not only for experts anymore, but for everyone who benefits from additional insights about locations on Earth. Our software solution is designed as a B2B solution for stakeholders that want to make data-driven, efficient and well-informed decisions for their business.",
            logo: '/images/teams/cellgrid.png',
            hideName: true
        },
        {
            name: "First Vision",
            description: "Responding to an emergency is a probability game. We strive to improve our odds by providing our front line workers with cutting edge technology",
            logo: "/images/teams/first-vision.png",
            hideName: true
        },
        {
            name: "MaDeCa",
            description: "Boosting the Circular Economy – with ALGAE at Sea",
            logo: "/images/teams/madeca.svg",
            hideName: true
        },
        {
            name: "MeinDein GmbH i.G.",
            description: "MeinDein is a sharing community platform that connects lenders and borrowers. For a fast, safe and local exchange of physical items. Because why waste money on items that are hardly ever used?",
            logo: "/images/teams/meindein.png"
        },
        {
            name: "Mewz",
            description: "Mewz is an app that offers a wide variety of daily creative challenges. Challenges can be completed in under 10 minutes and results can easily be shared through our social media feed. ",
            logo: "/images/teams/mewz.png",
            hideName: true
        },
        {
            name: "Rement",
            description: "With our process concrete can be completely recycled. This will not only save a lot of resources but it will also reduce the material based CO2-emissions in the cementproduction process.",
            logo: "/images/teams/rement.png",
            hideName: true
        },
        {
            name: "SPH1NX",
            description: `SPH1NX is the first ever play-to-earn online riddle game, where players can compete for real money while getting smarter along the way. 

            We provide our users with free daily riddles to improve their cognitive abilities on a daily basis. Additionally, we offer regular riddle solving contests where players pay a small entry fee to compete with the chance to win thousands of euros just by solving riddles. 
            
            SPH1NX is more than just a game, it's a chance for people to level the playing field and earn money based on their intelligence alone. 
            
            Our mission is “Empowerment and Equality through intellect”.`,
            logo: "/images/teams/sph1nx.svg"
        },
        {
            name: "StraightUp",
            description: "StraightUp is a novel medical system built to prevent backpain caused by unhealthy posture throughout the day. The smart wearable measures the exact posture and gives realtime feedback to the user. ",
            logo: "/images/teams/straight-up.svg"
        },
        {
            name: "Wehiculum",
            description: "Wehiculum is a carpooling app that connects people driving to work or university. Our goal is to create an easy and sustainable way of daily commuting.",
            logo: "/images/teams/wehiculum.svg",
            hideName: true
        }
    ];

    return (
        <>
            <VStack alignItems="stretch" gap={4} mb={2}>
                <Breadcrumb
                    color="gray.500"
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    <BreadcrumbItem isCurrentPage>
                        <Link href="/mentor" passHref>
                            <BreadcrumbLink>Finalists</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </VStack>
            <SimpleGrid columns={{base: 1, md: 2}} spacing={8} >
                {finalists.map((finalist) => (
                        <FinalistCard key={finalist.name} finalist={finalist} />
                ))}
            </SimpleGrid>
        </>
    );
};

export default Finalists;
