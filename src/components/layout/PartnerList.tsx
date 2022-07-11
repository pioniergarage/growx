import { Partner } from "../../types/partner";
import Image from 'next/image'

export default function PartnerList({ partners }: { partners: Partner[] }) {
    return (
        <div className={`grid grid-cols-2 gap-4 relative`}>
            {partners.map(partner => (
                <a href={partner.href}>
                    <img src={partner.logo} alt={partner.name} />
                </a>
            ))}
        </div>
    )
}