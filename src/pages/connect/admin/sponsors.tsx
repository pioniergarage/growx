import AdminBreadcrumbs, {
    AdminBreadcrumbItem,
} from '@/components/navigation/AdminBreadcrumbs';
import {
    Button,
    Heading,
    IconButton,
    Link,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from '@chakra-ui/react';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { allowOrga } from 'modules/admin/utils';

import {
    useDeleteSponsor,
    useSponsors,
    useUpsertSponsor,
} from 'modules/sponsor/hooks';
import { Sponsor } from 'modules/sponsor/types';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import SponsorModal from '../../../modules/sponsor/components/SponsorModal';

export default function SponsorAdmin() {
    const { sponsors } = useSponsors();
    const { deleteSponsor } = useDeleteSponsor();
    const { upsertSponsor } = useUpsertSponsor();
    const [sponsorOnEdit, setSponsorOnEdit] = useState<
        Omit<Sponsor, 'id'> & { id?: number }
    >({
        name: '',
        link: '',
        logo: '',
        type: 'BRONZE',
    });
    const [modalOpen, setModalOpen] = useState(false);

    function createNewSponsor() {
        setSponsorOnEdit({ name: '', link: '', logo: '', type: 'BRONZE' });
        setModalOpen(true);
    }

    function adjustSponsor(sponsor: Sponsor) {
        setSponsorOnEdit(sponsor);
        setModalOpen(true);
    }

    async function onDeleteSponsor() {
        if (sponsorOnEdit.id) {
            deleteSponsor(sponsorOnEdit.id);
        }
        setModalOpen(false);
    }

    async function saveSponsor(sponsor: Sponsor) {
        await upsertSponsor(sponsor);
        setModalOpen(false);
    }

    const image = (sponsor: Sponsor) => (
        // eslint-disable-next-line @next/next/no-img-element
        (<img
            src={sponsor.logo}
            alt={sponsor.name}
            style={{ maxHeight: '2rem' }}
        />)
    );

    return (
        <VStack alignItems="start">
            <AdminBreadcrumbs>
                <AdminBreadcrumbItem href="/connect/admin/sponsors">
                    Sponsors
                </AdminBreadcrumbItem>
            </AdminBreadcrumbs>
            <Heading size="md" as="h3">
                Sponsors
            </Heading>

            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Name</Th>
                            <Th>Image</Th>
                            <Th>Type</Th>
                            <Th>Link</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {(sponsors ?? []).map((sponsor) => (
                            <Tr key={sponsor.name}>
                                <Td>
                                    <IconButton
                                        aria-label="Adjust sponsor"
                                        icon={<FaPen />}
                                        variant="ghost"
                                        size="xs"
                                        onClick={() => adjustSponsor(sponsor)}
                                    />
                                </Td>
                                <Td>{sponsor.name}</Td>
                                <Td>{image(sponsor)}</Td>
                                <Td>{sponsor.type}</Td>
                                <Td>
                                    <Link>{sponsor.link}</Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <SponsorModal
                isOpen={modalOpen}
                initialValue={sponsorOnEdit}
                onClose={() => setModalOpen(false)}
                onSave={(s) => saveSponsor(s as Sponsor)}
                onDelete={onDeleteSponsor}
            />
            <Button onClick={createNewSponsor}>New Sponsor</Button>
        </VStack>
    );
}

export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: allowOrga,
});
