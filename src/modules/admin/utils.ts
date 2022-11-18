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
