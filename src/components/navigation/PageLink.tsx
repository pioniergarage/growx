import { Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

type PageLinkProps = LinkProps & {
    href: string;
    children: ReactNode;
};

const PageLink = ({href, children, ...rest}: PageLinkProps) => {
    return (
        <NextLink href={href} passHref>
            <Link {...rest}>{children}</Link>
        </NextLink>
    );
};

export default PageLink;
