import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { handleSingleResponse } from 'database/utils';
import { FullProfile } from 'modules/profile/types';
import { downloadCSV } from 'utils/csv';

export function downloadProfiles(profiles: FullProfile[]) {
    downloadCSV(
        [
            'Forename',
            'Surename',
            'Email',
            'Phone',
            'Gender',
            'Country',
            'Studies',
            'Uni',
            'Country of uni',
            'SQ',
            'skills',
        ],
        profiles.map((p) =>
            [
                p.firstName,
                p.lastName,
                p.email,
                p.phone,
                p.gender,
                p.homeland,
                p.studies,
                p.university,
                p.universityCountry,
                p.keyQualification,
                p.skills.join(' - '),
            ].map((a) => (a ? a : ''))
        ),
        `profiles.csv`
    );
}

export const allowOrga = async (
    _: unknown,
    supabase: SupabaseClient<Database>
) => {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            throw error;
        }
        const { role } = await supabase
            .from('profiles')
            .select('role')
            .eq('user_id', data.session?.user.id)
            .single()
            .then(handleSingleResponse);

        if (role !== 'ORGA') {
            return {
                redirect: {
                    permanent: false,
                    destination: '/connect',
                },
            };
        } else {
            return { props: {} };
        }
    } catch (error) {
        console.error();
        throw error;
    }
};
