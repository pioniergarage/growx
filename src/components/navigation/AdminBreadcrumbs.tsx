import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import PageLink from './PageLink';

export const AdminBreadcrumbItem: React.FC<
    {
        href: string;
    } & PropsWithChildren
> = ({ href, children }) => {
    return (
        <BreadcrumbItem>
            <BreadcrumbLink href={href} as={PageLink}>
                {children}
            </BreadcrumbLink>
        </BreadcrumbItem>
    );
};

const AdminBreadcrumbs: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Breadcrumb
            color="gray.500"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            <BreadcrumbItem>
                <BreadcrumbLink href="/connect/admin" as={PageLink}>
                    Admin
                </BreadcrumbLink>
            </BreadcrumbItem>
            {children}
        </Breadcrumb>
    );
};
export default AdminBreadcrumbs;
