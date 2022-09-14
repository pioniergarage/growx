import { Image, Link } from '@chakra-ui/react';

type SponsorItemProps = {
    href: string;
    logo: string;
    name: string;
};
const SponsorItem = (props: SponsorItemProps) => {
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
export default SponsorItem;
