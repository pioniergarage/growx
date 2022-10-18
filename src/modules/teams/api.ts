
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'database/DatabaseDefition';
import { Profile } from 'modules/profile/types';

import resizeImage from 'utils/resize';
import {
    handleEmptyResponse,
    handleMaybeSingleResponse,
    handleResponse,
    handleSingleResponse
} from '../../database/utils';
import { Team } from './types';

interface TeamApi {
    createTeam: (supabaseClient: SupabaseClient<Database>, team: Partial<Team>) => Promise<Team>
    getTeams: (supabaseClient: SupabaseClient<Database>,) => Promise<Team[]>
    getTeam: (supabaseClient: SupabaseClient<Database>, id: number) => Promise<Team>
    updateTeam: (supabaseClient: SupabaseClient<Database>, team: Partial<Team>) => Promise<Team>
    leaveTeam: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<void>
    requestToJoinTeam: (supabaseClient: SupabaseClient<Database>, userId: string, teamId: number) => Promise<void>
    withdrawRequest: (supabaseClient: SupabaseClient<Database>, userId: string) => Promise<void>
    acceptRequestToJoinTeam: (supabaseClient: SupabaseClient<Database>, joiningUserId: string) => Promise<void>
    declineRequestToJoinTeam: (supabaseClient: SupabaseClient<Database>, joiningUserId: string) => Promise<void>
    getRequestsToTeam: (supabaseClient: SupabaseClient<Database>, team_id: number) => Promise<Profile[]>
    getTeamRequestedToJoin: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<Team | null>
    getTeamIdOfUser: (supabaseClient: SupabaseClient<Database>, user_id: string) => Promise<number | null>
    getTeamMembers: (supabaseClient: SupabaseClient<Database>, teamId: number) => Promise<Profile[]>
    uploadTeamLogo: (supabaseClient: SupabaseClient<Database>, team: Team, logo: File) => Promise<string>
    removeTeamLogo: (supabaseClient: SupabaseClient<Database>, team: Team) => Promise<Team>
}

const mapTeamDto = (dto: Database["public"]["Tables"]["teams"]["Row"]): Team => ({
    ...dto,
    tags: (dto.tags ?? []) as string[],
    requestSupport: (dto.requestSupport ?? []) as string[]
})

const teamApi: TeamApi = {
    async createTeam(supabaseClient: SupabaseClient<Database>, team: Partial<Team>) {
        return supabaseClient
            .from('teams')
            .insert(team)
            .select()
            .single()
            .then(handleSingleResponse)
            .then(mapTeamDto)
    },
    async getTeams(supabaseClient: SupabaseClient<Database>,) {
        return supabaseClient
            .from('teams')
            .select('*')
            .then(handleResponse)
            .then(dtos => dtos.map(mapTeamDto))
    },
    async getTeam(supabaseClient: SupabaseClient<Database>, id: number) {
        return supabaseClient
            .from('teams')
            .select('*')
            .match({ id })
            .single()
            .then(handleSingleResponse)
            .then(mapTeamDto)
    },
    async updateTeam(supabaseClient: SupabaseClient<Database>, team: Partial<Team>) {
        return supabaseClient
            .from('teams')
            .update(team)
            .eq('id', team.id)
            .select()
            .single()
            .then(handleSingleResponse)
            .then(mapTeamDto)
    },
    async leaveTeam(supabaseClient: SupabaseClient<Database>, user_id: string) {
        return supabaseClient
            .from('team_members')
            .delete()
            .eq('user_id', user_id)
            .then(handleEmptyResponse);
    },
    async requestToJoinTeam(supabaseClient: SupabaseClient<Database>, userId: string, teamId: number) {
        return supabaseClient
            .from('team_requests')
            .insert({ user_id: userId, team_id: teamId })
            .then(handleEmptyResponse);
    },
    async withdrawRequest(supabaseClient: SupabaseClient<Database>, userId: string) {
        return supabaseClient
            .from('team_requests')
            .delete()
            .match({ user_id: userId })
            .then(handleEmptyResponse);
    },
    async acceptRequestToJoinTeam(supabaseClient: SupabaseClient<Database>, joiningUserId: string) {
        // team id is determin , rpcthen(r => handleResponse(r))
        return supabaseClient
            .rpc('accept_request', {
                requesting_user_id: joiningUserId,
            })
            .then(handleEmptyResponse);
    },
    async declineRequestToJoinTeam(supabaseClient: SupabaseClient<Database>, joiningUserId: string) {
        return supabaseClient
            .from('team_requests')
            .delete()
            .match({ user_id: joiningUserId })
            .then(handleEmptyResponse);
    },
    async getRequestsToTeam(supabaseClient: SupabaseClient<Database>, team_id: number) {
        return supabaseClient
            .from('team_requests')
            .select('profiles (*)')
            .match({ team_id })
            .then(handleResponse)
            .then((dtos) => dtos.map((p) => p.profiles as Database['public']['Tables']['profile']['Row']));
    }
    ,
    async getTeamRequestedToJoin(supabaseClient: SupabaseClient<Database>, user_id: string) {
        return supabaseClient
            .from('team_requests')
            .select('teams (*)')
            .match({ user_id })
            .maybeSingle()
            .then(handleMaybeSingleResponse)
            .then((dto) => (dto ? mapTeamDto(dto.teams as Database['public']['Tables']['teams']['Row']) : null));
    },
    async getTeamIdOfUser(supabaseClient: SupabaseClient<Database>, user_id: string) {
        const teamResponse = await supabaseClient
            .from('team_members')
            .select('*')
            .match({ user_id });
        if (teamResponse.error) throw new Error(teamResponse.error.message);
        if (!teamResponse.data || teamResponse.data.length === 0) return null;
        return teamResponse.data[0].team_id;
    },
    async getTeamMembers(supabaseClient: SupabaseClient<Database>, teamId: number) {
        return supabaseClient
            .from('team_members')
            .select('profile (*)')
            .match({ team_id: teamId })
            .then(handleResponse)
            .then((dtos) => dtos.flatMap((d) => d.profile as Database['public']['Tables']['profile']['Row']));
    }
    ,
    async uploadTeamLogo(supabaseClient: SupabaseClient<Database>, team: Team, logo: File) {
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
    },
    async removeTeamLogo(supabaseClient: SupabaseClient<Database>, team: Team) {
        return this.updateTeam(supabaseClient, { ...team, logo: '' });
    }
}

export default teamApi;