import { Image, Link } from '@chakra-ui/react';

type PartnerItemProps = {
    href: string;
    logo: string;
    name: string;
};
const PartnerItem = (props: PartnerItemProps) => {
    return (
        <Link href={props.href} isExternal>
            <Image
                className="max-h-16 brightness-75"
                src={props.logo}
                alt={props.name}
            />
        </Link>
    );
};
export default PartnerItem;
