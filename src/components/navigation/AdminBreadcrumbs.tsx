import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import Link from 'next/link';
import PageLink from './PageLink';

const AdminBreadcrumbs = ({ route }: { route: string[][] }) => {
    return (
        <Breadcrumb
            color="gray.500"
            separator={<ChevronRightIcon color="gray.500" />}
        >
            <BreadcrumbItem>
                <Text as="span">Admin</Text>
            </BreadcrumbItem>
            {route.map((item) => (
                <BreadcrumbItem key={`breadcrum-${item[0]}`}>
                    <BreadcrumbLink href={item[1]} as={PageLink}>{item[0]}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};
export default AdminBreadcrumbs;
