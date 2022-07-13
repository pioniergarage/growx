import Link from "next/link";
import AnimatedLogo from "components/AnimatedLogo";

function Fact({ amount, title }: { amount: string, title: string }) {
    return (
        <p>
            <span className="block uppercase text-3xl font-bold leading-tight">{amount}</span>
            {title}
        </p>
    )
}

export default function MainInfoBlock() {
    const facts = [
        { amount: '50+', title: 'startups' },
        { amount: '50 000€', title: 'prizes' },
        { amount: '11', title: 'workshops' },
    ]

    return (
        <>
            <div className="px-4 grid grid-cols-1 place-items-center md:place-items-start md:grid-cols-2 md:mt-12 md:text-left md:gap-8">
                <div className="md:order-2 row-span-2 place-self-center"><AnimatedLogo /></div>
                <div className="md:order-1">
                    <h1 className="text-3xl md:text-5xl md:pb-3 font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                        Germany&apos;s Largest Student Founding Contest
                    </h1>
                    <h4>
                        Become an entrepreneur and advance your idea over 11 weeks.
                        Get support, build your prototype and test your market.
                    </h4>
                </div>
                <div className="md:order-4">
                    <Link href="/">
                        <a className="btn btn-primary btn-wide my-4">Participate</a>
                    </Link>
                </div>
                <div className="flex justify-around md:justify-between w-full md:order-3">
                    {facts.map(fact => (
                        <Fact key={fact.title} {...fact} />
                    ))}
                </div>
            </div>
        </>
    )
}