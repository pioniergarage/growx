import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Profile } from 'modules/profile/types';
import { Team } from 'modules/teams/types';

import { definitions } from '../../database/supabase';
import { handleResponse, handleSingleResponse } from '../../database/utils';
import { mapProfileDto } from '../profile/api';
import { MentorAssignments } from './types';

export async function getMentorAssignments(): Promise<MentorAssignments> {
    return supabaseClient
        .from<{ mentor: definitions['profiles']; team: number }>(
            'mentor_assignment'
        )
        .select('mentor (*), team')
        .then((r) => handleResponse(r, 'assignments not found'))
        .then((dtos) =>
            Object.assign(
                {},
                ...dtos.map((dto) => ({
                    [dto.team]: mapProfileDto(dto.mentor),
                }))
            )
        );
}

export async function getTeamMentor(teamId: number): Promise<Profile> {
    return supabaseClient
        .from<{ mentor: definitions['profiles']; team: number }>(
            'mentor_assignment'
        )
        .select('mentor (*), team')
        .match({ team: teamId })
        .single()
        .then((r) => handleSingleResponse(r, 'assignments not found'))
        .then((dto) => mapProfileDto(dto.mentor));
}

export async function assignMentor(
    teamId: Team['id'],
    mentorId: Profile['userId']
): Promise<{ mentor: Profile['userId']; team: Team['id'] }> {
    return supabaseClient
        .from('mentor_assignment')
        .upsert(
            { mentor: mentorId, team: teamId },
            { returning: 'representation' }
        )
        .match({ mentor: mentorId, team: teamId })
        .single()
        .then((r) => handleSingleResponse(r));
}

export async function unassignMentor(
    teamId: Team['id']
): Promise<{ mentor: Profile['userId']; team: Team['id'] }> {
    return supabaseClient
        .from('mentor_assignment')
        .delete({ returning: 'representation' })
        .match({ team: teamId })
        .single()
        .then((r) => handleSingleResponse(r));
}
