import { Sponsor } from "types/partner"


function PartnerItem({ link: href, logo, name }: Partial<Sponsor>) {
    return (
        <a href={href}>
            <img className="max-h-16" src={logo} alt={name} />
        </a>
    )
}

export default function PartnerBlock({ sponsors }: { sponsors: Sponsor[] }) {
    if (!sponsors) return <></>
    return (
        <div className="max-w-7xl p-8 mx-auto">
            <div className="max-w-5xl md:max-w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:text-left">
                <div>
                    <h2>Gold Partner</h2>
                    <div className="mt-2 grid grid-cols-2 gap-4 place-items-center md:place-items-start">
                        {sponsors.filter(s => s.type === 1).map(sponsor => (
                            <PartnerItem key={sponsor.name} {...sponsor} />
                        ))}
                    </div>
                </div>

                <div>
                    <h2>Silver Partner</h2>
                    <div className="mt-2 grid grid-cols-4 gap-4 place-items-center md:place-items-start">
                        {sponsors.filter(s => s.type === 2).map(sponsor => (
                            <PartnerItem key={sponsor.name} {...sponsor} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}