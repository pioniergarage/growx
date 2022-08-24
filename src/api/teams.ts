import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { Team, Profile } from 'model';
import resizeImage from 'utils/resize';
import { mapProfileDto } from './profile';
import { definitions } from './supabase';
import { mapResponse, SupabaseResponse, mapSingleResponse } from './utils';

const mapTeamDto = (teamDto: definitions['teams']) => ({
    ...teamDto,
    tags: teamDto.tags as string[],
});

export async function createTeam(team: Partial<Team>) {
    const response = await supabaseClient
        .from<definitions['teams']>('teams')
        .insert(team, { returning: 'representation' })
        .single();
    return mapSingleResponse(response, (t) => t);
}

export async function getTeams(): Promise<SupabaseResponse<Team[]>> {
    const response = await supabaseClient
        .from<definitions['teams']>('teams')
        .select('*');
    return mapResponse(response, mapTeamDto);
}

export async function getTeam(id: number): Promise<SupabaseResponse<Team>> {
    const response = await supabaseClient
        .from<definitions['teams']>('teams')
        .select('*')
        .match({ id })
        .single();
    return mapSingleResponse(response, mapTeamDto);
}

export async function updateTeam(team: Partial<Team>) {
    const response = await supabaseClient
        .from<definitions['teams']>('teams')
        .update(team, { returning: 'representation' })
        .eq('id', team.id)
        .single();
    return mapSingleResponse(response, mapTeamDto);
}

export async function leaveTeam(user_id: string) {
    return await supabaseClient
        .from<definitions['team_members']>('team_members')
        .delete()
        .eq('user_id', user_id)
        .single()
}

export async function requestToJoinTeam(userId: string, teamId: number) {
    return await supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .insert({ user_id: userId, team_id: teamId });
}

export async function withdrawRequest(userId: string) {
    return await supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .delete({ returning: 'minimal' })
        .match({ user_id: userId })
        .single();
}

export async function acceptRequestToJoinTeam(joiningUserId: string) {
    // team id is determined by rpc function
    return await supabaseClient.rpc('accept_request', {
        requesting_user_id: joiningUserId,
    });
}

export async function declineRequestToJoinTeam(joiningUserId: string) {
    return await supabaseClient
        .from<definitions['team_requests']>('team_requests')
        .delete({ returning: 'minimal' })
        .match({ user_id: joiningUserId })
        .single();
}
export async function getRequestsToTeam(
    team_id: number
): Promise<SupabaseResponse<Profile[]>> {
    const response = await supabaseClient
        .from<{ profiles: definitions['profiles'] }>('team_requests')
        .select('profiles (*)')
        .match({ team_id });
    return mapResponse(response, (r) => mapProfileDto(r.profiles));
}

export async function getTeamRequestedToJoin(user_id: string) {
    const response = await supabaseClient
        .from<{ teams: definitions['teams'] }>('team_requests')
        .select('teams (*)')
        .match({ user_id })
        .maybeSingle();
    return mapSingleResponse(response, (dto) =>
        dto ? mapTeamDto(dto.teams) : undefined
    );
}

export async function getTeamOfUser(
    user_id: string
): Promise<SupabaseResponse<Team>> {
    const teamResponse = await supabaseClient
        .from<definitions['team_members']>('team_members')
        .select('*')
        .match({ user_id });
    if (teamResponse.error) return { error: teamResponse.error };
    if (!teamResponse.data || teamResponse.data.length === 0) return {};
    const teamId = teamResponse.data[0].team_id;
    return await getTeam(teamId);
}
export async function getTeamMembers(
    teamId: number
): Promise<SupabaseResponse<Profile[]>> {
    const response = await supabaseClient
        .from<{ profiles: definitions['profiles'][] }>('team_members')
        .select('profiles (*)')
        .match({ team_id: teamId });
    const { data, error } = response;
    if (!data) {
        return { error };
    }
    return { data: data.flatMap((d) => d.profiles).map(mapProfileDto) };
}

export const uploadTeamLogo = async (team: Team, logo: File) => {
    const fileName = `${team.id}.jpg`;
    const filePath = `${fileName}`;
    const resizedImage = await resizeImage(logo, 200, 200);
    const response = await supabaseClient.storage
        .from('logos')
        .upload(filePath, resizedImage, { upsert: true });
    if (response.error) return { error: response.error, logo: '' };
    const { publicURL, error } = supabaseClient.storage
        .from('logos')
        .getPublicUrl(filePath);
    if (response.error || !publicURL)
        return { error: error || 'Could not find team logo', logo: '' };
    const updateResponse = await updateTeam({ ...team, logo: publicURL });
    if (updateResponse.error) return { error: updateResponse.error, logo: '' };
    return {
        logo: updateResponse.data?.logo,
    };
};

export const removeTeamLogo = async (team: Team) => {
    return await updateTeam({ ...team, logo: '' });
};
