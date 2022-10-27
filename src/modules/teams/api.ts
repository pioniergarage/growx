
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { Profile } from 'modules/profile/types';

import resizeImage from 'utils/resize';
import {
    handleMaybeSingleResponse,
    handleResponse,
    handleSingleResponse
} from '../../database/utils';
import { mapProfileDto } from '../profile/api';
import { Team } from './types';

export const mapTeamDto = (teamDto: Database['public']['Tables']['teams']['Row']): Team => ({
    ...teamDto,
    tags: teamDto.tags as string[],
    requestSupport: teamDto.requestSupport as string[],
    logo: teamDto.logo
});

export async function createTeam(supabaseClient: SupabaseClient<Database>, team: Partial<Team>) {
    return supabaseClient
        .from('teams')
        .insert(team)
        .select()
        .single()
        .then(handleSingleResponse);
}

export async function getTeams(supabaseClient: SupabaseClient<Database>,) {
    return supabaseClient
        .from('teams')
        .select('*')
        .then(handleResponse)
        .then((dtos) => dtos.map(mapTeamDto));
}

export async function getTeam(supabaseClient: SupabaseClient<Database>, id: number) {
    return supabaseClient
        .from('teams')
        .select('*')
        .match({ id })
        .single()
        .then(handleSingleResponse)
        .then(mapTeamDto);
}

export async function updateTeam(supabaseClient: SupabaseClient<Database>, team: Partial<Team>) {
    return supabaseClient
        .from('teams')
        .update(team)
        .eq('id', team.id)
        .select()
        .single()
        .then(handleSingleResponse)
        .then(mapTeamDto);
}

export async function leaveTeam(supabaseClient: SupabaseClient<Database>, user_id: string) {
    return supabaseClient
        .from('team_members')
        .delete()
        .eq('user_id', user_id)
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function requestToJoinTeam(supabaseClient: SupabaseClient<Database>, userId: string, teamId: number) {
    return supabaseClient
        .from('team_requests')
        .insert({ user_id: userId, team_id: teamId })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function withdrawRequest(supabaseClient: SupabaseClient<Database>, userId: string) {
    return supabaseClient
        .from('team_requests')
        .delete()
        .match({ user_id: userId })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function acceptRequestToJoinTeam(supabaseClient: SupabaseClient<Database>, joiningUserId: string) {
    // team id is determined by rpc functionthen(r => handleResponse(r))
    return supabaseClient
        .rpc('accept_request', {
            requesting_user_id: joiningUserId,
        })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function declineRequestToJoinTeam(supabaseClient: SupabaseClient<Database>, joiningUserId: string) {
    return supabaseClient
        .from('team_requests')
        .delete()
        .match({ user_id: joiningUserId })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function getRequestsToTeam(supabaseClient: SupabaseClient<Database>, team_id: number): Promise<Profile[]> {
    return supabaseClient
        .from('team_requests')
        .select('profiles (*)')
        .match({ team_id })
        .then(handleResponse)
        .then((dtos) => dtos.map((p) => p.profiles as Database['public']['Tables']['profiles']['Row']).map(mapProfileDto));
}

export async function getTeamRequestedToJoin(supabaseClient: SupabaseClient<Database>, user_id: string) {
    return supabaseClient
        .from('team_requests')
        .select('teams (*)')
        .match({ user_id })
        .maybeSingle()
        .then(handleMaybeSingleResponse)
        .then((dto) => (dto ? mapTeamDto(dto.teams as Database['public']['Tables']['teams']['Row']) : null));
}

export async function getTeamIdOfUser(supabaseClient: SupabaseClient<Database>, user_id: string) {
    const teamResponse = await supabaseClient
        .from('team_members')
        .select('*')
        .match({ user_id });
    if (teamResponse.error) throw new Error(teamResponse.error.message);
    if (!teamResponse.data || teamResponse.data.length === 0) return null;
    return teamResponse.data[0].team_id;
}

export async function getTeamMembers(supabaseClient: SupabaseClient<Database>, teamId: number): Promise<Profile[]> {
    return supabaseClient
        .from('team_members')
        .select('profiles (*)')
        .match({ team_id: teamId })
        .then(handleResponse)
        .then((dtos) => dtos.flatMap((d) => d.profiles as Database['public']['Tables']['profiles']['Row']).map(mapProfileDto));
}

export const uploadTeamLogo = async (supabaseClient: SupabaseClient<Database>, team: Team, logo: File) => {
    const fileName = `${team.id}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(logo, 200, 200);
    const response = await supabaseClient.storage
        .from('logos')
        .upload(filePath, resizedImage, { upsert: true });
    if (response.error) throw new Error(response.error.message);
    const { data: { publicUrl } } = supabaseClient.storage
        .from('logos')
        .getPublicUrl(filePath);

    if (!publicUrl) {
        throw new Error('Could not find logo');
    }
    return publicUrl;
};

export const removeTeamLogo = (supabaseClient: SupabaseClient<Database>, team: Team) => {
    return updateTeam(supabaseClient, { ...team, logo: '' });
};
