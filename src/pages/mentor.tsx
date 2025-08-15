import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import MentorList from 'modules/landing/MentorList';
import { getPublicMentors } from 'modules/profile/api';
import { Profile } from 'modules/profile/types';
import Link from 'next/link';

export const getServerSideProps = withPageAuth({
    authRequired: false,
    async getServerSideProps(ctx, supabase) {
        try {
            const mentors = await getPublicMentors(supabase);
            return { props: { mentors } };
        } catch (error) {
            console.error();
            throw error;
        }
    },
});

interface MentorPageProps {
    mentors: Profile[];
}

const MentorPage = ({ mentors }: MentorPageProps) => {
    return (
        <VStack alignItems="stretch" gap={4}>
            <Breadcrumb
                color="gray.500"
                separator={<ChevronRightIcon color="gray.500" />}
            >
                <BreadcrumbItem isCurrentPage>
                    <Link href="/mentor" passHref legacyBehavior>
                        <BreadcrumbLink>Our mentors</BreadcrumbLink>
                    </Link>
                </BreadcrumbItem>
            </Breadcrumb>
            <MentorList mentors={mentors} />
        </VStack>
    );
};

export default MentorPage;
