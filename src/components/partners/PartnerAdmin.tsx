import {
    VStack,
    Heading,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Link,
    IconButton,
} from '@chakra-ui/react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { getSponsorType, Sponsor } from 'types';
import PartnerModal from './PartnerModal';

export default function PartnerAdmin() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [sponsorOnEdit, setSponsorOnEdit] = useState<
        Omit<Sponsor, 'id'> & { id?: number }
    >({
        name: '',
        link: '',
        logo: '',
        type: 1,
    });
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { data, error } = await supabaseClient
                .from<Sponsor>('sponsors')
                .select('*');
            if (error) {
                console.error(error.message);
            } else if (data) {
                setSponsors(data);
            }
        })();
    }, []);

    function createNewSponsor() {
        setSponsorOnEdit({ name: '', link: '', logo: '', type: 1 });
        setModalOpen(true);
    }

    function adjustSponsor(sponsor: Sponsor) {
        setSponsorOnEdit(sponsor);
        setModalOpen(true);
    }

    async function deleteSponsor() {
        if (sponsorOnEdit.id) {
            await supabaseClient
                .from('sponsors')
                .delete()
                .match({ id: sponsorOnEdit.id });
            setSponsors(sponsors.filter((s) => s.id !== sponsorOnEdit.id));
        }
        setModalOpen(false);
    }

    async function saveSponsor(sponsor: Sponsor) {
        const sponsorToUpdate = sponsors.find((s) => s.name === sponsor.name);
        const { data, error } = await supabaseClient
            .from<Sponsor>('sponsors')
            .upsert(sponsor)
            .match({ id: sponsorToUpdate?.id })
            .single();
        if (error) {
            console.error(error);
        } else if (data) {
            const index = sponsors.findIndex((s) => s.id === data.id);
            if (index >= 0) {
                sponsors.splice(index, 1, data);
                setSponsors(sponsors);
            } else {
                setSponsors(sponsors.concat(data));
            }
        }
        setModalOpen(false);
    }
    const image = (sponsor: Sponsor) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={sponsor.logo}
            alt={sponsor.name}
            style={{ maxHeight: '2rem' }}
        />
    );

    return (
        <VStack alignItems="start">
            <Heading size="md" as="h3">
                Partner
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
                        {sponsors.map((sponsor) => (
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
                                <Td>{getSponsorType(sponsor)}</Td>
                                <Td>
                                    <Link>{sponsor.link}</Link>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <PartnerModal
                isOpen={modalOpen}
                initialValue={sponsorOnEdit}
                onClose={() => setModalOpen(false)}
                onSave={saveSponsor}
                onDelete={deleteSponsor}
            />
            <Button onClick={createNewSponsor}>New Sponsor</Button>
        </VStack>
    );
}
