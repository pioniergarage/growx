import { withPageAuth } from 'utils/supabase/withPageAuth';

import { getTeamIdOfUser } from 'modules/teams/api';
import { NextPageWithLayout } from 'utils/types';

import { Button, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addRegistration, clearRegistrations, getAllRegistrations } from 'utils/registrationsDB';

const RegistrationView: NextPageWithLayout = () => {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<{ id: string, user: string, event: string }[]>([]);

    // Load registrations from indexed db on mount
    useEffect(() => {
        if (!router.isReady) return;

        async function load() {
            const all = await getAllRegistrations();
            setRegistrations(all);

            const { user, event } = router.query;

            if (user || event) {
                router.push('/connect/registration');
            }

            if (user && event) {
                const exists = all.some(r => r.user === user && r.event === event);

                if (!exists) {
                    await addRegistration(user as string, event as string);
                    const updated = await getAllRegistrations();
                    setRegistrations(updated);
                }
            }
        }

        load();
    }, [router.isReady, router.query, router]);

    const resetRegistrations = async () => {
        await clearRegistrations();
        setRegistrations([]);
    };

    return (
        <VStack spacing={4} align="stretch">
            <Text>Registrations Table:</Text>

            {registrations.length > 0 ? (
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>User</Th>
                            <Th>Event</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {registrations.map((r, index) => (
                            <Tr key={index}>
                                <Td>{r.user}</Td>
                                <Td>{r.event}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Text>No registrations yet.</Text>
            )}

            <Button colorScheme="red" onClick={resetRegistrations}>
                Reset Registrations
            </Button>
        </VStack>
    );
};


export const getServerSideProps = withPageAuth({
    redirectTo: '/connect/login',
    getServerSideProps: async (context, supabase) => {
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect/login',
                },
            };
        }
        const teamId = await getTeamIdOfUser(supabase, data.user.id);
        if (teamId) {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect/teams/' + teamId,
                },
            };
        } else {
            return { props: {} };
        }
    },
});

export default RegistrationView;
