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
            <div className="px-4">
                <AnimatedLogo />
                <h1 className="text-3xl font-black">
                    Germany&amp;s Largest Student Contest
                </h1>
                <h4>
                    Become an entrepreneur and advance your idea over 11 weeks.
                    Get support, build your prototype and test your market.
                </h4>
            </div>
            <Link href="/">
                <a className="btn btn-primary btn-wide my-4">Participate</a>
            </Link>
            <div className="flex justify-around w-full">
                {facts.map(fact => (
                    <Fact key={fact.title} {...fact} />
                ))}
            </div>
        </>
    )
}