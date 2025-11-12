import { withPageAuth } from 'utils/supabase/withPageAuth';

import { getTeamIdOfUser } from 'modules/teams/api';
import CreateTeamButton from 'modules/teams/components/CreateTeamButton';
import { NextPageWithLayout } from 'utils/types';

import { Button, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RegistrationView: NextPageWithLayout = () => {
    const router = useRouter();
    const [registrations, setRegistrations] = useState<[string, string][]>([]);

    // Load registrations from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("registrations");
        const parsed = stored ? (JSON.parse(stored) as [string, string][]) : [];
        setRegistrations(parsed);

        const { user, event } = router.query;
        if (user && event) {
            const newEntry: [string, string] = [user as string, event as string];
            const exists = parsed.some(([u, e]) => u === newEntry[0] && e === newEntry[1]);

            if (!exists) {
                const updated = [...parsed, newEntry];
                localStorage.setItem("registrations", JSON.stringify(updated));
                setRegistrations(updated);
            }
        }
    }, [router.query]);

    const resetRegistrations = () => {
        localStorage.setItem("registrations", JSON.stringify([]));
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
                        {registrations.map(([user, event], index) => (
                            <Tr key={index}>
                                <Td>{user}</Td>
                                <Td>{event}</Td>
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

            <CreateTeamButton />
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
