import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type PageLinkProps = {
    href: string;
    children: ReactNode;
};

const PageLink = (props: PageLinkProps) => {
    return (
        <NextLink href={props.href} passHref>
            <Link>{props.children}</Link>
        </NextLink>
    );
};

export default PageLink;
