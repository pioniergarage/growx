import { Partner } from "../../types/partner";
import Image from 'next/image'

export default function PartnerList({ partners }: { partners: Partner[] }) {
    return (
        <div className="relative py-4">
            <div className="bg-neutral absolute top-0 -left-4 w-screen h-full -z-10"></div>
            <div className={`grid grid-cols-2 gap-4 relative`}>
                {partners.map(partner => (
                    <a href={partner.href}>
                        <img src={partner.logo} alt={partner.name} />
                    </a>
                ))}
            </div>
        </div>
    )
}