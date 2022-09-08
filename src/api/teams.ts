import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Profile, Team } from 'model';
import resizeImage from 'utils/resize';
import { mapProfileDto } from './profile';
import { definitions } from './supabase';
import {
    handleMaybeSingleResponse,
    handleResponse,
    handleSingleResponse,
} from './utils';

const mapTeamDto = (teamDto: definitions['teams']): Team => ({
    ...teamDto,
    tags: teamDto.tags as string[],
    requestSupport: teamDto.requestSupport as string[],
});

export async function createTeam(team: Partial<Team>) {
    return supabaseClient
        .from<definitions['teams']>('teams')
        .insert(team, { returning: 'representation' })
        .single()
        .then((response) => handleSingleResponse(response));
}

export async function getTeams() {
    return supabaseClient
        .from<definitions['teams']>('teams')
        .select('*')
        .then((r) => handleResponse(r, 'Could not load teams'))
        .then((dtos) => dtos.map(mapTeamDto));
}

export async function getTeam(id: number) {
    return supabaseClient
        .from<definitions['teams']>('teams')
        .select('*')
        .match({ id })
        .single()
        .then((r) => handleSingleResponse(r, 'Team not found'))
        .then(mapTeamDto);
}

export async function updateTeam(team: Partial<Team>) {
    return supabaseClient
        .from<definitions['teams']>('teams')
        .update(team, { returning: 'representation' })
        .eq('id', team.id)
        .single()
        .then((r) => handleSingleResponse(r))
        .then(mapTeamDto);
}

export async function leaveTeam(user_id: string) {
    return supabaseClient
        .from<definitions['team_members']>('team_members')
        .delete()
        .eq('user_id', user_id)
        .single()
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function requestToJoinTeam(userId: string, teamId: number) {
    return supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .insert({ user_id: userId, team_id: teamId })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function withdrawRequest(userId: string) {
    return supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .delete({ returning: 'minimal' })
        .match({ user_id: userId })
        .single()
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function acceptRequestToJoinTeam(joiningUserId: string) {
    // team id is determined by rpc functionthen(r => handleResponse(r))
    return supabaseClient
        .rpc('accept_request', {
            requesting_user_id: joiningUserId,
        })
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}

export async function declineRequestToJoinTeam(joiningUserId: string) {
    return supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .delete({ returning: 'minimal' })
        .match({ user_id: joiningUserId })
        .single()
        .then(({ error }) => {
            if (error) throw new Error(error.message);
        });
}
export async function getRequestsToTeam(team_id: number): Promise<Profile[]> {
    return supabaseClient
        .from<{ profiles: definitions['profiles'] }>('team_requests')
        .select('profiles (*)')
        .match({ team_id })
        .then((r) => handleResponse(r, 'Requests not found'))
        .then((dtos) => dtos.map((p) => p.profiles).map(mapProfileDto));
}

export async function getTeamRequestedToJoin(user_id: string) {
    return supabaseClient
        .from<{ teams: definitions['teams'] }>('team_requests')
        .select('teams (*)')
        .match({ user_id })
        .maybeSingle()
        .then((r) => handleMaybeSingleResponse(r))
        .then((dto) => (dto ? mapTeamDto(dto.teams) : null));
}

export async function getTeamIdOfUser(user_id: string) {
    const teamResponse = await supabaseClient
        .from<definitions['team_members']>('team_members')
        .select('*')
        .match({ user_id });
    if (teamResponse.error) throw new Error(teamResponse.error.message);
    if (!teamResponse.data || teamResponse.data.length === 0) return null;
    return teamResponse.data[0].team_id;
}

export async function getTeamMembers(teamId: number): Promise<Profile[]> {
    return supabaseClient
        .from<{ profiles: definitions['profiles'][] }>('team_members')
        .select('profiles (*)')
        .match({ team_id: teamId })
        .then((r) => handleResponse(r))
        .then((dtos) => dtos.flatMap((d) => d.profiles).map(mapProfileDto));
}

export const uploadTeamLogo = async (team: Team, logo: File) => {
    const fileName = `${team.id}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(logo, 200, 200);
    const response = await supabaseClient.storage
        .from('logos')
        .upload(filePath, resizedImage, { upsert: true });
    if (response.error) throw new Error(response.error.message);
    const { publicURL, error } = supabaseClient.storage
        .from('logos')
        .getPublicUrl(filePath);

    if (error || !publicURL) {
        throw new Error(error?.message || 'Could not find logo');
    }
    return publicURL;
};

export const removeTeamLogo = (team: Team) => {
    return updateTeam({ ...team, logo: '' });
};
