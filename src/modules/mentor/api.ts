
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { Profile } from 'modules/profile/types';
import { Team } from 'modules/teams/types';

import { handleResponse, handleSingleResponse } from '../../database/utils';
import { mapProfileDto } from '../profile/api';
import { MentorAssignments } from './types';

export async function getMentorAssignments(supabaseClient: SupabaseClient<Database>): Promise<MentorAssignments> {
    return supabaseClient
        .from(
            'mentor_assignment'
        )
        .select('mentor (*), team')
        .then(handleResponse)
        .then((dtos) =>
            Object.assign(
                {},
                ...dtos.map((dto) => ({
                    [dto.team]: mapProfileDto(dto.mentor as Database['public']['Tables']['profiles']['Row']),
                }))
            )
        );
}

export async function getTeamMentor(supabaseClient: SupabaseClient<Database>, teamId: number): Promise<Profile> {
    return supabaseClient
        .from(
            'mentor_assignment'
        )
        .select('mentor (*), team')
        .match({ team: teamId })
        .single()
        .then(handleSingleResponse)
        .then((dto) => mapProfileDto(dto.mentor as Database['public']['Tables']['profiles']['Row']));
}

export async function assignMentor(supabaseClient: SupabaseClient<Database>,
    teamId: Team['id'],
    mentorId: Profile['userId']
): Promise<{ mentor: Profile['userId']; team: Team['id'] }> {
    return supabaseClient
        .from('mentor_assignment')
        .upsert(
            { mentor: mentorId, team: teamId }
        )
        .match({ mentor: mentorId, team: teamId })
        .select()
        .single()
        .then(handleSingleResponse);
}

export async function unassignMentor(supabaseClient: SupabaseClient<Database>,
    teamId: Team['id']
): Promise<{ mentor: Profile['userId']; team: Team['id'] }> {
    return supabaseClient
        .from('mentor_assignment')
        .delete()
        .match({ team: teamId })
        .select()
        .single()
        .then(handleSingleResponse);
}
