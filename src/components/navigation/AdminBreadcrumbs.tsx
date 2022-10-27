import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import PageLink from './PageLink';

const AdminBreadcrumbs = ({ route }: { route: string[][] }) => {
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
            {route.map((item) => (
                <BreadcrumbItem key={`breadcrum-${item[0]}`}>
                    <BreadcrumbLink href={item[1]} as={PageLink}>
                        {item[0]}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
export default AdminBreadcrumbs;
