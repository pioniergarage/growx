import { Partner } from "types/partner";

function PartnerItem({ href, logo, name }: Partial<Partner>) {
    return (
        <a href={href}>
            <img className="max-h-16" src={logo} alt={name} />
        </a>
    )
}

export default function PartnerBlock() {
    return (
        <div className="max-w-7xl p-8 mx-auto">
            <div className="max-w-5xl md:max-w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:text-left">
                <div>
                    <h2>Gold Partner</h2>
                    <div className="mt-2 grid grid-cols-2 gap-4 place-items-center md:place-items-start">
                        <PartnerItem name="KIT Gründerschmiede" logo="https://grow.pioniergarage.de/media/partner_logos/KIT_Gr%C3%BCnderschmiede_white.png" />
                        <PartnerItem name="GründerMotor" logo="https://grow.pioniergarage.de/media/partner_logos/gr%C3%BCndermotor.png" />
                        <PartnerItem name="Ionos" logo="https://grow.pioniergarage.de/media/partner_logos/Logo_IONOS_by_white.png" />
                    </div>
                </div>

                <div>
                    <h2>Silver Partner</h2>
                    <div className="mt-2 grid grid-cols-4 gap-4 place-items-center md:place-items-start">
                        <PartnerItem name="Allianz" logo="https://grow.pioniergarage.de/media/partner_logos/Allianz_BRW_white.png" />
                        <PartnerItem name="GründerMotor" logo="https://grow.pioniergarage.de/media/partner_logos/gr%C3%BCndermotor.png" />
                        <PartnerItem name="ZEISS" logo="https://grow.pioniergarage.de/media/partner_logos/zeiss-logo-rgb_klein.png" />
                        <PartnerItem name="Gründerallianz Karlsruhe" logo="https://grow.pioniergarage.de/media/partner_logos/Logo_GAKA_white.png" />
                        <PartnerItem name="Ionos" logo="https://grow.pioniergarage.de/media/partner_logos/Logo_IONOS_by_white.png" />
                    </div>
                </div>

            </div>
        </div>
    )
}